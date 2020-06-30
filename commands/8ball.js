const Discord = require("discord.js");
const replies = [
  "Yes.",
  "No.",
  "No idea",
  "Maybe",
  "Probably yes",
  "Probably no",
];

module.exports = () => async (message, value) => {
  let howtoEmbed = new Discord.MessageEmbed()
    .setTitle(`How to use ?8ball`)
    .setColor(`BLUE`)
    .setDescription(`A command that generates random answers to a question`)
    .addField(`Example`, `;8ball Am I cool?`);

  if (!value) return message.channel.send(howtoEmbed);

  let result = Math.floor(Math.random() * replies.length);

  let ballembed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor(`BLUE`)
    .addField("Question", value)
    .addField("Answer", replies[result]);

  message.channel.send(ballembed);
};
