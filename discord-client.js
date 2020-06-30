require("dotenv").config();

const Discord = require("discord.js");

const TOKEN = process.env.BOT_TOKEN;
const suggest = require("./commands/suggest");
const kick = require("./commands/kick");
const purge = require("./commands/purge");
const warn = require("./commands/warn");
const mute = require("./commands/mute");
const giveaway = require("./commands/giveaway");
const ball8 = require("./commands/8ball");
const help = require("./commands/help");
const ban = require("./commands/ban");

const PREFIX = ";";

module.exports = () => {
  const COMMANDS = {
    ping: (message) => {
      message.channel.send("pong");
    },
    suggest: suggest(),
    kick: kick(),
    purge: purge(),
    warn: warn(),
    mute: mute(),
    giveaway: giveaway(),
    "8ball": ball8(),
    help: help(),
    ban: ban(),
  };

  const client = new Discord.Client();
  let guildCount = 0;
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    guildCount = client.guilds.cache.size;
    updateActivity();
  });

  updateActivity = () => {
    client.user
      .setActivity(`over WestLink | ;help`, {
        type: "WATCHING",
      })
      .then((presence) =>
        console.log(`Activity set to ${presence.activities[0].name}`)
      )
      .catch(console.error);
  };

  //joined a server
  client.on("guildCreate", (guild) => {
    console.log("Joined a new guild: " + guild.name);
    guildCount++;
    updateActivity();
  });

  //removed from a server
  client.on("guildDelete", (guild) => {
    console.log("Left a guild: " + guild.name);
    guildCount--;
    updateActivity();
  });

  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(PREFIX)) return;
    // If message.member is uncached, cache it.
    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    //!claim welcomebot :  command = claim, param = welcomebot
    const [command, ...values] = message.content.split(PREFIX)[1].split(" ");
    const commandObj = COMMANDS[command];

    if (!commandObj) {
      return;
    }

    commandObj(message, values.join(" "));
  });

  client.on("guildMemberAdd", async (member) => {
    const channel = await client.channels.fetch("693662817320173629");
    const welcomeEmbed = new Discord.MessageEmbed()
      .setColor(`ORANGE`)
      .setTitle("Welcome to WestLink!")
      .setDescription(
        `Welcome to WestLink ${member}! We hope you enjoy your time here.`
      )
      .setTimestamp();

    channel.send(welcomeEmbed);

    member.send(`Welcome to WestLink ${member}!`);
  });

  client.login(TOKEN);

  return client;
};
