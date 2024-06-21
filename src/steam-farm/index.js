const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const SteamUser = require("steam-user");
const SteamTotp = require("steam-totp");

const user = new SteamUser();
const user2 = new SteamUser();

const status = 7; // 0 = offline, 1 = online, 2 = busy, 3 = away, 4 = snooze, 5 = looking to trade, 6 = looking to play 7 = invisible
const status2 = 1; // 0 = offline, 1 = online, 2 = busy, 3 = away, 4 = snooze, 5 = looking to trade, 6 = looking to play 7 = invisible

const games = [
  730, //Counter-Strike 2
  1623730, //Palworld
  230410, //Warframe
  275850, //No Man's Sky
  2399830, //ARK: Survival Ascended
  813780, //Age of Empires II: Definitive Edition
  945360, //Among Us
  346110, //ARK: Survival Evolved
  1086940, //Baldur's Gate 3
  1938090, //Call of Duty®
  1824220, //Chivalry 2
  // 774801, //Crab Champions
  570, //Dota 2
  673950, //Farm Together
  1551360, //Forza Horizon 5
  271590, //Grand Theft Auto V
  1966720, //Lethal Company
  1260320, //Party Animals
  386070, //Planetary Annihilation: TITANS
  108600, //Project Zomboid
  578080, //PUBG: BATTLEGROUNDS
  1174180, //Red Dead Redemption 2
  252490, //Rust
  1172620, //Sea of Thieves
  326460, //ShellShock Live
  1329500, //SpiderHeck
  1237950, //STAR WARS™ Battlefront™ II
  674940, //Stick Fight: The Game
  286160, //Tabletop Simulator
  2073850, //THE FINALS
  470220, //UNO
  236390, //War Thunder
  1449850, //Yu-Gi-Oh! Master Duel
];
const games2 = [
  673950, //Farm Together
  945360, //Among Us
  346110, //ARK: Survival Evolved
  578080, //PUBG: BATTLEGROUNDS
  230410, //Warframe
  674940, //Stick Fight: The Game
];

const gamecount = games.length;
const gamecount2 = games2.length;

const logOnOptions = {
  accountName: process.env.username,
  password: process.env.password,
  twoFactorCode: SteamTotp.generateAuthCode(process.env.shared),
};
const logOnOptions2 = {
  accountName: process.env.username2,
  password: process.env.password2,
  twoFactorCode: SteamTotp.generateAuthCode(process.env.shared2),
};

user.logOn(logOnOptions);
user2.logOn(logOnOptions2);

user.on("loggedOn", () => {
  console.log(
    "SteamID: " +
      logOnOptions.accountName +
      " - Idling: " +
      gamecount +
      " games. - Successfully logged into Steam."
  );
  user.setPersona(status);
  user.gamesPlayed(games);
});
user2.on("loggedOn", () => {
  console.log(
    "SteamID: " +
      logOnOptions2.accountName +
      " - Idling: " +
      gamecount2 +
      " game. - Successfully logged into Steam."
  );
  user2.setPersona(status2);
  user2.gamesPlayed(games2);
});
