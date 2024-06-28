const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const botID = process.env.discord_bot_id;
const token = process.env.discord_bot_token;

if (!token) {
  console.error(
    "Uh-oh! It looks like the bot token is missing. Please set it in your .env file."
  );
  process.exit(1);
}

const rest = new REST().setToken(token);

const slashRegister = async () => {
  try {
    await rest.put(Routes.applicationCommands(botID), {
      body: [
        new SlashCommandBuilder()
          .setName("ping")
          .setDescription("Replies with Pong!"),
        new SlashCommandBuilder()
          .setName("avatar")
          .setDescription(
            "Replies with the avatar URL of the user or the mentioned user"
          )
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user to get the avatar of")
          ),
        new SlashCommandBuilder()
          .setName("dev")
          .setDescription("Takes you to the Discord Developer Portal"),
        new SlashCommandBuilder()
          .setName("summon")
          .setDescription("Summons someone on the server")
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user to summon")
              .setRequired(true)
          ),
      ],
    });
    console.log("🎉 Hooray! Slash commands have been registered successfully.");
  } catch (error) {
    console.error(
      "⚠️ Oops! There was an error registering the slash commands:",
      error
    );
  }
};

slashRegister();
