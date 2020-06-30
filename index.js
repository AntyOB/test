const express = require("express");
const discord = require("./discord-client");

//START DISCORD BOT
const discordClient = discord();

const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", async function (req, res) {
  res.send({ response: "Moderatrix-Bot is running" });
});

app.listen(PORT, function () {
  console.log("Listening on Port " + PORT);
});
