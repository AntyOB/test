const Discord = require("discord.js");
const ms = require("ms");

module.exports = () => async (message, value) => {
  let howtoEmbed = new Discord.MessageEmbed()
    .setTitle(`How to use ?giveaway`)
    .setColor(`BLUE`)
    .setDescription(
      `A command that creates a giveaway to a set prize and that other users can join`
    )
    .addField(`Example`, `;giveaway 1m #giveaways Nitro`)
    .addField(`Permissions Needed`, `MANAGE_MESSAGES`);

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      `You do not have permissions to run this command`,
      howtoEmbed
    );
  if (!args[0])
    return message.channel.send(`You did not specify your time`, howtoEmbed);
  if (
    !args[0].endsWith("d") &&
    !args[0].endsWith("h") &&
    !args[0].endsWith("m")
  )
    return message.channel.send(
      `You did not use the correct time format`,
      howtoEmbed
    );
  if (isNaN(args[0][0]))
    return message.channel.send(`That is not a number`, howtoEmbed);
  let channel = message.mentions.channels.first();
  if (!channel)
    return message.channel.send(`I could not find the channel`, howtoEmbed);
  let prize = args.slice(2).join(" ");
  if (!prize) return message.channel.send(`No prize specified`, howtoEmbed);
  message.channel.send(`Successfully created giveaway in ${channel}`);

  let GiveawayEmbed = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Giveaway`)
    .setDescription(`Giveaway for ${prize}`)
    .setFooter("Ends in")
    .setTimestamp(Date.now() + ms(args[0]));

  let m = await channel.send(GiveawayEmbed);
  m.react("🎉");
  setTimeout(() => {
    if (m.reactions.cache.size === 0)
      return message.channel.send(`No one reacted so I couldn't get a winner`);
    let winner = m.reactions.cache
      .get("🎉")
      .users.cache.filter((u) => !u.bot)
      .random();
    channel.send(`${winner} has won **${prize}**`);
  }, ms(args[0]));
};
