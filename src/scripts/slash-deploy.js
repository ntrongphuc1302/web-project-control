const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const botID = "1254855444803883170";
const token = process.env.token;

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
      ],
    });
    console.log("Slash command registered successfully.");
  } catch (error) {
    console.error("Error registering slash command:", error);
  }
};

slashRegister();
