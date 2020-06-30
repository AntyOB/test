const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  let howtoEmbed = new Discord.MessageEmbed()
    .setTitle(`How to use ?warn`)
    .setColor(`BLUE`)
    .setDescription(`A command that warns a specific person`)
    .addField(`Example`, `;warn @imacodr#0930 Stop!`)
    .addField(`Permissions Needed`, `MANAGE_MESSAGES`);

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

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
    return message.reply("THis user is not in the server", howtoEmbed);

  var reason = args.splice(1).join(" ");

  var embed = new Discord.MessageEmbed()
    .setTitle("You were warned")
    .setDescription(reason);

  try {
    user.send(embed);
  } catch (err) {
    console.warn(err);
  }
};
