const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  let howtoEmbed = new Discord.MessageEmbed()
    .setTitle(`How to use ?purge`)
    .setColor(`BLUE`)
    .setDescription(
      `A command that deletes the number of messages specified and newer than 14 days`
    )
    .addField(`Example`, `;purge 10`)
    .addField(`Permissions Needed`, `MANAGE_MESSAGES`);

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if (message.deletable) {
    await message.delete();
  }

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(
      "You do not have enough permissions to run this command",
      howtoEmbed
    );
  }

  if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
    return message.channel
      .send("Please choose a valid number", howtoEmbed)
      .then((m) => setTimeout(() => !m.deleted && m.delete(), 3000));
  }

  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message
      .reply("I do not have enough permissions to execute that command")
      .then((m) => setTimeout(() => !m.deleted && m.delete(), 3000));
  }

  let deleteAmount;

  if (parseInt(args[0]) > 100) {
    deleteAmount = 100;
  } else {
    deleteAmount = parseInt(args[0]);
  }

  message.channel
    .bulkDelete(deleteAmount, true)
    .then((deleted) =>
      message.channel
        .send(`Successfully purged ${deleted.size} messages`)
        .then((m) => setTimeout(() => !m.deleted && m.delete(), 3000))
    )
    .catch((err) => message.reply(`Something went wrong ${err}`));

  //  `jdsaoijdioajdiojsad asdoias doas doasjddo jo ${message.author}`
};
