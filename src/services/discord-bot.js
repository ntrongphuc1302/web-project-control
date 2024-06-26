require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
}); // Load environment variables from .env file

const { Client, GatewayIntentBits } = require("discord.js"); // Import Client and GatewayIntentBits

// Initialize the client with the correct intent flag
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Event handler for when the bot is ready
client.on("ready", () => {
  console.log("\x1b[1mBot\x1b[0m is now \x1b[32mOnline\x1b[0m!"); // \x1b[1m sets text to bold, \x1b[0m resets text style
});

// Event handler for when an interaction is created
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand() && interaction.commandName === "ping") {
    const ping = client.ws.ping;
    await interaction.reply({ content: `🏓 Pong! ${ping}ms`, ephemeral: true });

    // Log interaction details to console
    console.log(
      `\x1b[1mBot\x1b[0m: Command /ping used by ${interaction.user.tag} in ${interaction.guild.name}`
    );
  }
});

// Log in to Discord with the bot token
client.login(process.env.discord_bot_token);
