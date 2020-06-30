const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  let howtoEmbed = new Discord.MessageEmbed()
    .setTitle(`How to use ?ban`)
    .setColor(`BLUE`)
    .setDescription(`A command that bans specific members`)
    .addField(`Example`, `;ban @imacodr#0930 Get out of here!`)
    .addField(`Permissions Needed`, `BAN_MEMBERS`);

  if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send("You do not have permissions.", howtoEmbed);

  let banMember = message.mentions.members.first();
  if (!banMember)
    return message.channel.send("Please provide a user to ban!", howtoEmbed);

  let reason = args.slice(1).join(" ");
  if (!reason)
    return message.channel.send("You did not state a reason.", howtoEmbed);

  if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    return message.reply(
      "I can't run this command as I do not have permissions in this server."
    );

  banMember
    .send(`You have been banned from ${message.guild.name} for ${reason}`)
    .then(() => banMember.ban())
    .catch((err) => console.log(err));
};
