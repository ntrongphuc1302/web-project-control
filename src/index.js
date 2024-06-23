const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const controlRouter = require("./controllers/control");
const os = require("os");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "..", "src")));
app.use(express.json());

// Endpoint to fetch system CPU usage
app.get("/cpu", (req, res) => {
  const cpuUsage = os.loadavg()[0] * 100; // CPU usage as a percentage
  res.json({ cpuUsage: cpuUsage.toFixed(2) });
});

// Endpoint to fetch system RAM usage
app.get("/ram", (req, res) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const ramUsage = (usedMemory / totalMemory) * 100; // RAM usage as a percentage
  res.json({ ramUsage: ramUsage.toFixed(2) });
});

app.get("/uptime", (req, res) => {
  const uptimeSeconds = os.uptime();
  const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8); // Convert to HH:MM:SS
  res.json({ uptime });
});

app.use("/control", controlRouter);

app.post("/start", (req, res) => {
  console.log("Received start request");
  res.send("Start action completed");
});

app.post("/stop", (req, res) => {
  console.log("Received stop request");
  res.send("Stop action completed");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
