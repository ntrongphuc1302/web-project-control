function handleError(error) {
  console.error("Error:", error);
}

function updateSteamFarmStatus() {
  fetch("/control/status/steam-farm")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const steamFarmStatus = document.getElementById("steamFarmStatus");
      steamFarmStatus.textContent = data.status === "ON" ? "ON" : "OFF";
      updateStatusIndicator(steamFarmStatus, data.status === "ON");
    })
    .catch((error) => {
      console.error("Error fetching Steam Farm status:", error);
      handleError(error);
    });
}

function updateDiscordIdleStatus() {
  fetch("/control/status/discord-idle")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const discordIdleStatus = document.getElementById("discordIdleStatus");
      discordIdleStatus.textContent = data.status === "ON" ? "ON" : "OFF";
      updateStatusIndicator(discordIdleStatus, data.status === "ON");
    })
    .catch((error) => {
      console.error("Error fetching Discord Idle status:", error);
      handleError(error);
    });
}

function updateCPUUsage() {
  fetch("/cpu")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const cpuUsage = document.getElementById("cpuUsage");
      cpuUsage.textContent = `${data.cpuUsage}%`;
      updateColor(cpuUsage, parseFloat(data.cpuUsage));
    })
    .catch((error) => {
      console.error("Error fetching CPU usage:", error);
      handleError(error);
    });
}

function updateRAMUsage() {
  fetch("/ram")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const ramUsage = document.getElementById("ramUsage");
      ramUsage.textContent = `${data.ramUsage}%`;
      updateColor(ramUsage, parseFloat(data.ramUsage));
    })
    .catch((error) => {
      console.error("Error fetching RAM usage:", error);
      handleError(error);
    });
}

function updateUptime() {
  fetch("/uptime")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const uptime = document.getElementById("uptime");
      uptime.textContent = data.uptime;
    })
    .catch((error) => {
      console.error("Error fetching uptime:", error);
      handleError(error);
    });
}

function updateColor(element, value) {
  if (value < 50) {
    element.style.color = "green";
  } else if (value < 75) {
    element.style.color = "yellow";
  } else {
    element.style.color = "red";
  }
}

function updateStatusIndicator(element, isRunning) {
  if (isRunning) {
    element.textContent = "ON";
    element.classList.add("running");
    element.classList.remove("stopped");
  } else {
    element.textContent = "OFF";
    element.classList.add("stopped");
    element.classList.remove("running");
  }
}

function toggleSteamFarm() {
  const statusElement = document.getElementById("steamFarmStatus");
  const currentStatus = statusElement.textContent;
  const url =
    currentStatus === "ON"
      ? "/control/stop/steam-farm"
      : "/control/start/steam-farm";
  fetch(url, { method: "POST" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log(
        `Steam Farm ${currentStatus === "ON" ? "stopped" : "started"}:`,
        data
      );

      updateSteamFarmStatus();
    })
    .catch((error) => {
      console.error(
        `Error toggling Steam Farm ${
          currentStatus === "ON" ? "stop" : "start"
        }:`,
        error
      );
      handleError(error);
    });
}

function toggleDiscordIdle() {
  const statusElement = document.getElementById("discordIdleStatus");
  const currentStatus = statusElement.textContent;
  const url =
    currentStatus === "ON"
      ? "/control/stop/discord-idle"
      : "/control/start/discord-idle";
  fetch(url, { method: "POST" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log(
        `Discord Idle ${currentStatus === "ON" ? "stopped" : "started"}:`,
        data
      );
      updateDiscordIdleStatus();
    })
    .catch((error) => {
      console.error(
        `Error toggling Discord Idle ${
          currentStatus === "ON" ? "stop" : "start"
        }:`,
        error
      );
      handleError(error);
    });
}

document
  .getElementById("steamFarmStatus")
  .addEventListener("click", toggleSteamFarm);
document
  .getElementById("discordIdleStatus")
  .addEventListener("click", toggleDiscordIdle);

function updateStatuses() {
  updateSteamFarmStatus();
  updateDiscordIdleStatus();
  updateCPUUsage();
  updateRAMUsage();
  updateUptime();
}

updateStatuses();

setInterval(updateStatuses, 500);

document.addEventListener("DOMContentLoaded", (event) => {
  const themeCheckbox = document.querySelector(".theme-checkbox");
  themeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("light-theme", themeCheckbox.checked);
  });
});
