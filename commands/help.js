const Discord = require("discord.js");

module.exports = () => async (message) => {
  let embed = new Discord.MessageEmbed()
    .setColor("0080ff")
    .addFields({
      name: "Help Links",
      value: `Commands: \n
        ;ban \n
        ;8ball \n
        ;giveaway \n
        ;kick \n
        ;mute \n
        ;purge \n
        ;suggest \n
        ;warn \n
        `,
    })
    .setFooter("API by imacodr")
    .setTimestamp()
    .setThumbnail(message.author.avatarURL());
  await message.channel.send("Here are some useful links!", embed);

  //  `jdsaoijdioajdiojsad asdoias doas doasjddo jo ${message.author}`
};
