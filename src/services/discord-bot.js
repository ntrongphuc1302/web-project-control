require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const { statuses, summonGifs } = require("../data/discord-bot-data.js");

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const fs = require("fs");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Function to set a random status
function setRandomStatus() {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const randomStatus = statuses[randomIndex];
  client.user.setActivity(randomStatus); // Set the status
}

client.once("ready", () => {
  console.log("\x1b[1mBot\x1b[0m is now \x1b[32mOnline\x1b[0m!");
  setRandomStatus(); // Set initial random status

  // Set interval to change status every 10 minutes
  setInterval(() => {
    setRandomStatus();
  }, 10 * 60 * 1000);
});

// Handle reconnects by setting a new status
client.on("shardResume", () => {
  setRandomStatus();
});

// client.on("ready", () => {
//   console.log("\x1b[1mBot\x1b[0m is now \x1b[32mOnline\x1b[0m!");
// });

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;

    if (commandName === "ping") {
      const ping = client.ws.ping;
      await interaction.reply({
        content: `🏓 Pong! ${ping}ms`,
        ephemeral: true,
      });
      console.log(
        `\x1b[1mBot\x1b[0m: Command /ping used by ${interaction.user.tag} in ${interaction.guild.name}`
      );
    } else if (commandName === "avatar") {
      const user = interaction.options.getUser("user") || interaction.user;
      const member = await interaction.guild.members.fetch(user.id);
      const roleColor = member.displayHexColor;
      const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

      const embed = new EmbedBuilder()
        .setTitle(`${member.displayName}`)
        .setImage(avatarURL)
        .setColor(roleColor !== "#000000" ? roleColor : "#aa0000");

      await interaction.reply({
        embeds: [embed],
      });
      console.log(
        `\x1b[1mBot\x1b[0m: Command /avatar used by ${interaction.user.tag} in ${interaction.guild.name}`
      );
    } else if (commandName === "summon") {
      const user = interaction.options.getUser("user");
      if (!user) {
        await interaction.reply({
          content: "Please mention a user to summon!",
          ephemeral: true,
        });
        return;
      }

      const summonMessages = [
        `${interaction.user} has summoned ${user}!`,
        `${user}, you have been summoned by ${interaction.user}!`,
        `A wild ${user} appeared, summoned by ${interaction.user}!`,
        `${user} has been called upon by ${interaction.user}!`,
        `${interaction.user} has called forth ${user}!`,
        `Behold, ${user}! Summoned by ${interaction.user}!`,
        `${interaction.user} has invoked the presence of ${user}!`,
        `${user}, your presence is requested by ${interaction.user}!`,
        `The great summoning spell by ${interaction.user} brings forth ${user}!`,
        `${user} appears with a flash, summoned by ${interaction.user}!`,
        `${interaction.user} has conjured ${user} from the depths!`,
        `${user} is here, summoned by the mighty ${interaction.user}!`,
        `${user}, you are needed by ${interaction.user}!`,
        `${interaction.user} has called you from beyond, ${user}!`,
        `${user} has been beckoned by ${interaction.user}!`,
        `${interaction.user} has cast a spell to summon ${user}!`,
        `A portal opens and ${user} steps through, summoned by ${interaction.user}!`,
        `${interaction.user} has raised ${user} from the shadows!`,
        `${user}, your presence is required by ${interaction.user}!`,
        `An ancient ritual by ${interaction.user} brings forth ${user}!`,
        `${user} has been magically summoned by ${interaction.user}!`,
      ];
      const summonMessage =
        summonMessages[Math.floor(Math.random() * summonMessages.length)];

      const summonGif =
        summonGifs[Math.floor(Math.random() * summonGifs.length)];

      const dmMessages = [
        `You have been summoned by ${interaction.user} in ${interaction.guild.name}!`,
        `${interaction.user} is calling for you in ${interaction.guild.name}!`,
        `Guess what? ${interaction.user} has summoned you in ${interaction.guild.name}!`,
        `You are needed by ${interaction.user} in ${interaction.guild.name}!`,
        `${interaction.user} has requested your presence in ${interaction.guild.name}!`,
        `Alert! ${interaction.user} has summoned you in ${interaction.guild.name}!`,
        `${interaction.user} needs you in ${interaction.guild.name}!`,
        `${interaction.user} has beckoned you to ${interaction.guild.name}!`,
        `Heads up! ${interaction.user} is summoning you in ${interaction.guild.name}!`,
        `${interaction.user} wants you in ${interaction.guild.name}!`,
        `Prepare yourself, ${interaction.user} has summoned you in ${interaction.guild.name}!`,
        `Time to shine! ${interaction.user} is summoning you in ${interaction.guild.name}!`,
        `Attention! ${interaction.user} has called for you in ${interaction.guild.name}!`,
        `Your presence is needed by ${interaction.user} in ${interaction.guild.name}!`,
        `You've been summoned by ${interaction.user} in ${interaction.guild.name}!`,
        `${interaction.user} has invoked your presence in ${interaction.guild.name}!`,
        `Get ready! ${interaction.user} has summoned you in ${interaction.guild.name}!`,
        `A summoning by ${interaction.user} requires your presence in ${interaction.guild.name}!`,
        `It's time! ${interaction.user} has summoned you in ${interaction.guild.name}!`,
        `${interaction.user} has called you forth in ${interaction.guild.name}!`,
        `You are being summoned by ${interaction.user} in ${interaction.guild.name}!`,
      ];
      const dmMessage =
        dmMessages[Math.floor(Math.random() * dmMessages.length)];

      // Send DM to summoned user
      try {
        await user.send(dmMessage);
      } catch (error) {
        console.error(`Could not send DM to ${user.tag}.`);
      }

      // Create summon embed
      const embed = new EmbedBuilder()
        .setTitle("Summon Alert!")
        .setDescription(summonMessage)
        .setColor("#ff0000")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setImage(summonGif)
        .setFooter({
          text: `Summoned by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.reply({ content: summonMessage, embeds: [embed] });
      console.log(
        `\x1b[1mBot\x1b[0m: Command /summon used by ${interaction.user.tag} to summon ${user.tag} in ${interaction.guild.name}`
      );
    } else if (commandName === "dev") {
      if (interaction.user.id === process.env.discord_bot_owner_id) {
        await interaction.reply({
          content: "https://discord.com/developers/active-developer",
          ephemeral: true,
        });
        console.log(
          `\x1b[1mBot\x1b[0m: Command /dev used by ${interaction.user.tag} in ${interaction.guild.name}`
        );
      } else {
        await interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
        console.log(
          `\x1b[1mBot\x1b[0m: Unauthorized use of /dev command by ${interaction.user.tag} in ${interaction.guild.name}`
        );
      }
    } else if (commandName === "set-avatar") {
      if (interaction.user.id !== process.env.discord_bot_owner_id) {
        await interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
        console.log(
          `\x1b[1mBot\x1b[0m: Unauthorized use of /set-avatar command by ${interaction.user.tag} in ${interaction.guild.name}`
        );
        return;
      }

      const url = interaction.options.getString("url");
      const attachment = interaction.options.getAttachment("file");

      if (url) {
        try {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          const buffer = Buffer.from(response.data, "binary");
          await client.user.setAvatar(buffer);
          await interaction.reply({
            content: "Avatar updated successfully!",
            ephemeral: true,
          });
        } catch (error) {
          console.error("Error setting avatar from URL:", error);
          await interaction.reply({
            content: "Failed to set avatar from URL.",
            ephemeral: true,
          });
        }
      } else if (attachment) {
        try {
          const response = await axios.get(attachment.url, {
            responseType: "arraybuffer",
          });
          const buffer = Buffer.from(response.data, "binary");
          await client.user.setAvatar(buffer);
          await interaction.reply({
            content: "Avatar updated successfully!",
            ephemeral: true,
          });
        } catch (error) {
          console.error("Error setting avatar from attachment:", error);
          await interaction.reply({
            content: "Failed to set avatar from attachment.",
            ephemeral: true,
          });
        }
      } else {
        await interaction.reply({
          content: "Please provide a URL or attach a file.",
          ephemeral: true,
        });
      }

      console.log(
        `\x1b[1mBot\x1b[0m: Command /set-avatar used by ${interaction.user.tag} in ${interaction.guild.name}`
      );
    } else if (commandName === "set-name") {
      // Handle /set-name command
      if (interaction.user.id !== process.env.discord_bot_owner_id) {
        await interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
        console.log(
          `\x1b[1mBot\x1b[0m: Unauthorized use of /set-name command by ${interaction.user.tag} in ${interaction.guild.name}`
        );
        return;
      }

      const newName = interaction.options.getString("name");

      try {
        await client.user.setUsername(newName);
        await interaction.reply({
          content: `Bot name set to ${newName} successfully!`,
          ephemeral: true,
        });
      } catch (error) {
        console.error("Error setting bot name:", error);
        await interaction.reply("Failed to set bot name.");
      }

      console.log(
        `\x1b[1mBot\x1b[0m: Command /set-name used by ${interaction.user.tag} to set bot name to ${newName} in ${interaction.guild.name}`
      );
    }
  }
});

// Log in to Discord with the bot token
client.login(process.env.discord_bot_token);
