const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const router = express.Router();

let steamFarmProcess = null;
let discordIdleProcess = null;
let discordBotProcess = null;

router.post("/start/steam-farm", (req, res) => {
  console.log("Received request to start Steam Farm");
  if (!steamFarmProcess) {
    const steamFarmScript = path.join(
      __dirname,
      "../../src/services/steam-farm.js"
    );
    steamFarmProcess = spawn("node", [steamFarmScript]);

    steamFarmProcess.stdout.on("data", (data) => {
      console.log(`Steam Farm stdout: ${data}`);
    });

    steamFarmProcess.stderr.on("data", (data) => {
      console.error(`Steam Farm stderr: ${data}`);
    });

    steamFarmProcess.on("close", (code) => {
      // console.log(`Steam Farm process exited with code ${code}`);
      steamFarmProcess = null;
    });

    res.send("Steam Farm started.");
  } else {
    res.send("Steam Farm is already running.");
  }
});

router.post("/stop/steam-farm", (req, res) => {
  console.log("Received request to stop Steam Farm");
  if (steamFarmProcess) {
    // console.log(
    //   `Stopping Steam Farm process with PID: ${steamFarmProcess.pid}`
    // );
    steamFarmProcess.kill("SIGINT"); // Send SIGINT to gracefully terminate the process
    steamFarmProcess.on("exit", (code, signal) => {
      // console
      //   .log
      //   `Steam Farm process exited with code ${code} and signal ${signal}`
      //   ();
      steamFarmProcess = null;
      res.send("Steam Farm stopped.");
    });
  } else {
    res.send("Steam Farm is not running.");
  }
});

router.post("/start/discord-idle", (req, res) => {
  console.log("Received request to start Discord Idle");
  if (!discordIdleProcess) {
    const discordIdleScript = path.join(
      __dirname,
      "../../src/services/discord-idle.js"
    );
    discordIdleProcess = spawn("node", [discordIdleScript]);

    discordIdleProcess.stdout.on("data", (data) => {
      console.log(`Discord Idle stdout: ${data}`);
    });

    discordIdleProcess.stderr.on("data", (data) => {
      console.error(`Discord Idle stderr: ${data}`);
    });

    discordIdleProcess.on("close", (code) => {
      // console.log(`Discord Idle process exited with code ${code}`);
      discordIdleProcess = null;
    });

    res.send("Discord Idle started.");
  } else {
    res.send("Discord Idle is already running.");
  }
});

router.post("/stop/discord-idle", (req, res) => {
  console.log("Received request to stop Discord Idle");
  if (discordIdleProcess) {
    // console.log(
    //   `Stopping Discord Idle process with PID: ${discordIdleProcess.pid}`
    // );
    discordIdleProcess.kill("SIGINT"); // Send SIGINT to gracefully terminate the process
    discordIdleProcess.on("exit", (code, signal) => {
      // console(
      //   .log
      //   `Discord Idle process exited with code ${code} and signal ${signal}`
      //   );
      discordIdleProcess = null;
      res.send("Discord Idle stopped.");
    });
  } else {
    res.send("Discord Idle is not running.");
  }
});

router.post("/start/discord-bot", (req, res) => {
  console.log("Received request to start Discord Bot");
  if (!discordBotProcess) {
    const discordBotScript = path.join(
      __dirname,
      "../../src/services/discord-bot.js"
    );
    discordBotProcess = spawn("node", [discordBotScript]);

    discordBotProcess.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    discordBotProcess.stderr.on("data", (data) => {
      console.error(`Discord Bot stderr: ${data}`);
    });

    discordBotProcess.on("close", (code) => {
      // console.log(`Discord Bot process exited with code ${code}`);
      discordBotProcess = null;
    });

    res.send("Discord Bot started.");
  } else {
    res.send("Discord Bot is already running.");
  }
});

router.post("/stop/discord-bot", (req, res) => {
  console.log("Received request to stop Discord Bot");
  if (discordBotProcess) {
    // console.log(
    //   `Stopping Discord Bot process with PID: ${discordBotProcess.pid}`
    // );
    discordBotProcess.kill("SIGINT"); // Send SIGINT to gracefully terminate the process
    discordBotProcess.on("exit", (code, signal) => {
      // console(
      //   .log
      //   `Discord Bot process exited with code ${code} and signal ${signal}`
      //   );
      discordBotProcess = null;
      res.send("Discord Bot stopped.");
    });
  } else {
    res.send("Discord Bot is not running.");
  }
});

router.get("/status/steam-farm", (req, res) => {
  if (steamFarmProcess) {
    res.send({ status: "ON" });
  } else {
    res.send({ status: "OFF" });
  }
});

router.get("/status/discord-idle", (req, res) => {
  if (discordIdleProcess) {
    res.send({ status: "ON" });
  } else {
    res.send({ status: "OFF" });
  }
});

router.get("/status/discord-bot", (req, res) => {
  if (discordBotProcess) {
    res.send({ status: "ON" });
  } else {
    res.send({ status: "OFF" });
  }
});

module.exports = router;
