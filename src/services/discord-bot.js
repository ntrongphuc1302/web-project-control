// Load environment variables from .env file
require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

// Initialize the client with the correct intent flag
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Event handler for when the bot is ready
client.on("ready", () => {
  console.log("\x1b[1mBot\x1b[0m is now \x1b[32mOnline\x1b[0m!");
});

// Event handler for when an interaction is created
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
        ephemeral: true,
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

      // Summon message array
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
      ];
      const summonMessage =
        summonMessages[Math.floor(Math.random() * summonMessages.length)];

      // Summon GIF array
      const summonGifs = [
        "https://media1.tenor.com/m/XabkWMY86ZcAAAAC/naruto-summoning.gif",
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTU3d2kyazhhaWtxaHZkYnNzNmFlMDVobWZ6MWZ3ejlnMm5qNDM5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0wlOkICxril2UixAaf/giphy.gif",
        "https://media.giphy.com/media/AsfJT1vNXYyBWlPe4S/giphy.gif?cid=ecf05e47wz89igeh82hkjx10ga7ivc1juop9xgnq21zlc2ku&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        "https://media.giphy.com/media/l1KVawssBSgqhhD0s/giphy.gif?cid=ecf05e47a6n20xc6sc4vj9725v566b38des0b7a9i9nj0e4o&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        "https://media.giphy.com/media/aXmxDXlkvau72ocoiG/giphy.gif?cid=ecf05e47wa7w7ac2uqb7h2f62s1y8fax5iv110qldp401nom&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        "https://tenor.com/bDds5.gif",
        "https://giffiles.alphacoders.com/918/91854.gif",
        "https://tenor.com/bH8m8.gif",
        "https://static.wikia.nocookie.net/tensei-shitara-slime-datta-ken/images/8/86/Summoning_Demons_Animated.gif",
        "https://tenor.com/b12g2.gif",
      ];
      const summonGif =
        summonGifs[Math.floor(Math.random() * summonGifs.length)];

      // DM message array
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
    }
  }
});

// Log in to Discord with the bot token
client.login(process.env.discord_bot_token);
