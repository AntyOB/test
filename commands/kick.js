const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  let howtoEmbed = new Discord.MessageEmbed()
    .setTitle(`How to use ?kick`)
    .setColor(`BLUE`)
    .setDescription(`A command that kicks specific members`)
    .addField(`Example`, `;kick @imacodr#0930 Get out of here!`)
    .addField(`Permissions Needed`, `KICK_MEMBERS`);

  if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send("You do not have permissions.", howtoEmbed);

  let kickMember = message.mentions.members.first();
  if (!kickMember)
    return message.channel.send("Please provide a user to kick!", howtoEmbed);

  let reason = args.slice(1).join(" ");
  if (!reason)
    return message.channel.send("You did not state a reason.", howtoEmbed);

  if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send(
      "I can't run this command as I do not have permissions in this server."
    );

  kickMember
    .send(`You have been kicked from ${message.guild.name} for ${reason}`)
    .then(() => kickMember.kick())
    .catch((err) => console.log(err));
};
