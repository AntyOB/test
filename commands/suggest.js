const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  const channel = await message.client.channels.fetch("690390902145024030");

  let embed = new Discord.MessageEmbed()
    .setColor("0080ff")
    .setTitle("Suggestion")
    .setDescription(value)
    .setFooter(`Suggested by ${message.author.username}`);

  message.author.send("Suggestion Recorded!");
  await channel.send(embed);
  message.react("✅");

  //  `jdsaoijdioajdiojsad asdoias doas doasjddo jo ${message.author}`
};
