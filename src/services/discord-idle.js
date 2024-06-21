const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const Eris = require("eris");

const bot = new Eris(process.env.discord_token);

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.username} (${bot.user.id})`);
});

bot.on("error", (err) => {
  console.error(err);
});

bot.connect();
