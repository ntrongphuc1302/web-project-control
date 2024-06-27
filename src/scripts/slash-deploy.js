const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const botID = process.env.discord_bot_id;
const token = process.env.discord_bot_token;

if (!token) {
  console.error("Token is not defined. Please set it in your .env file.");
  process.exit(1);
}

const rest = new REST({ version: "9" }).setToken(token);

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
      ],
    });
    console.log("Slash commands registered successfully.");
  } catch (error) {
    console.error("Error registering slash commands:", error);
  }
};

slashRegister();
