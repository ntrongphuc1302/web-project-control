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

function updateDiscordBotStatus() {
  fetch("/control/status/discord-bot")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const discordBotStatus = document.getElementById("discordBotStatus");
      discordBotStatus.textContent = data.status === "ON" ? "ON" : "OFF";
      updateStatusIndicator(discordBotStatus, data.status === "ON");
    })
    .catch((error) => {
      console.error("Error fetching Discord Bot status:", error);
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

function toggleDiscordBot() {
  const statusElement = document.getElementById("discordBotStatus");
  const currentStatus = statusElement.textContent;
  const url =
    currentStatus === "ON"
      ? "/control/stop/discord-bot"
      : "/control/start/discord-bot";
  fetch(url, { method: "POST" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log(
        `Discord Bot ${currentStatus === "ON" ? "stopped" : "started"}:`,
        data
      );
      updateDiscordBotStatus();
    })
    .catch((error) => {
      console.error(
        `Error toggling Discord Bot ${
          currentStatus === "ON" ? "stop" : "start"
        }:`,
        error
      );
      handleError(error);
    });
}

document.getElementById("steamFarmStatus").addEventListener("click", () => {
  if (document.querySelector(".active-checkbox").checked) {
    toggleSteamFarm();
  }
});

document.getElementById("discordIdleStatus").addEventListener("click", () => {
  if (document.querySelector(".active-checkbox").checked) {
    toggleDiscordIdle();
  }
});

document.getElementById("discordBotStatus").addEventListener("click", () => {
  if (document.querySelector(".active-checkbox").checked) {
    toggleDiscordBot();
  }
});

function updateStatuses() {
  updateSteamFarmStatus();
  updateDiscordIdleStatus();
  updateDiscordBotStatus();
  updateCPUUsage();
  updateRAMUsage();
  updateUptime();
}

updateStatuses();

setInterval(() => {
  if (document.querySelector(".active-checkbox").checked) {
    updateStatuses();
  }
}, 500);

document.addEventListener("DOMContentLoaded", (event) => {
  const themeCheckbox = document.querySelector(".theme-checkbox");
  const body = document.body;

  themeCheckbox.addEventListener("change", () => {
    if (themeCheckbox.checked) {
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
    }
  });

  const activeCheckbox = document.querySelector(".active-checkbox");
  activeCheckbox.addEventListener("change", () => {
    const containers = document.querySelectorAll(".status-wrapper");
    containers.forEach((container) => {
      container.classList.toggle("disabled-overlay");
    });

    // Disable pointer events for the toggle button
    const toggleButtons = document.querySelectorAll(".status");
    toggleButtons.forEach((button) => {
      if (activeCheckbox.checked) {
        button.style.pointerEvents = "auto";
      } else {
        button.style.pointerEvents = "none";
      }
    });
  });

  // Initial state of toggle buttons based on active-checkbox
  const toggleButtons = document.querySelectorAll(".status");
  toggleButtons.forEach((button) => {
    if (!activeCheckbox.checked) {
      button.style.pointerEvents = "none";
    }
  });
});
