const Discord = require("discord.js");
const ms = require("ms");

module.exports = () => async (message, value) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  let howtoEmbed = new Discord.MessageEmbed()
    .setTitle(`How to use ?mute`)
    .setColor(`BLUE`)
    .setDescription(`A command that mute specific members`)
    .addField(`Example`, `;mute @imacodr#0930 1m I don't want you to talk`)
    .addField(`Permissions Needed`, `MANAGE_MESSAGES`);

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply(
      "You do not have permissions to use this command",
      howtoEmbed
    );

  var user = message.mentions.users.first();

  if (!user) return message.reply("You did not mention a user", howtoEmbed);

  var member;

  try {
    member = await message.guild.members.fetch(user);
  } catch (err) {
    member = null;
  }
  if (!member)
    return message.reply("This user is not in the server", howtoEmbed);
  if (member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You cannot mute that person", howtoEmbed);

  var rawTime = args[1];
  var time = ms(rawTime);
  if (!time) return message.reply("You need to specify a time", howtoEmbed);

  var reason = args.splice(1).join(" ");
  if (!reason) return message.reply("You need a reason", howtoEmbed);

  // if (!channel) return message.guild.createChannel("mod-logs");

  var embed = new Discord.MessageEmbed()
    .setTitle("You were muted")
    .setColor(`BLUE`)
    .addField("Exprires:", rawTime, true)
    .addField("Reason:", reason, true);

  try {
    user.send(embed);
  } catch (err) {
    console.warn(err);
  }
  var role = message.guild.roles.cache.find((r) => r.name === "Muted");

  if (!role) return message.guild.roles.add(`Muted`);

  member.roles.add(role);

  setTimeout(() => {
    member.roles.remove(role);
  }, time);

  message.channel.send(
    `${user} has been muted by ${message.author} for ${rawTime}!`
  );
};
