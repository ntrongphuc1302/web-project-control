require("dotenv").config(); // Load environment variables from .env file
const { Client, GatewayIntentBits } = require("discord.js"); // Import Client and GatewayIntentBits
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const client = new Client({
  intents: [GatewayIntentBits.Guilds], // Correct intent flag
});

client.on("ready", () => {
  console.log(`\x1b[1mBot\x1b[0m is now \x1b[32mOnline\x1b[0m!`); // \x1b[1m sets text to bold, \x1b[0m resets text style
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "ping") {
      const ping = client.ws.ping;
      interaction.reply({ content: `🏓 Pong! ${ping}ms`, ephemeral: true });

      // Log interaction details to console
      console.log(
        `\x1b[1mBot\x1b[0m: Command /ping used by ${interaction.user.tag} in ${interaction.guild.name}`
      );
    }
  }
});

client.login(process.env.discord_bot_token);
