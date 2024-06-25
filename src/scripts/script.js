function handleError(error) {
  console.error("Error:", error);
  // alert("An error occurred. Please try again.");
}

function updateStatus() {
  fetch("/control/status/steam-farm")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const steamFarmStatus = document.getElementById("steamFarmStatus");
      steamFarmStatus.textContent = data.status === "ON" ? "ON" : "OFF";
      if (data.status === "ON") {
        steamFarmStatus.classList.add("running");
        steamFarmStatus.classList.remove("stopped");
      } else {
        steamFarmStatus.classList.add("stopped");
        steamFarmStatus.classList.remove("running");
      }
    })
    .catch((error) => {
      handleError(error);
    });

  fetch("/control/status/discord-idle")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const discordIdleStatus = document.getElementById("discordIdleStatus");
      discordIdleStatus.textContent = data.status === "ON" ? "ON" : "OFF";
      if (data.status === "ON") {
        discordIdleStatus.classList.add("running");
        discordIdleStatus.classList.remove("stopped");
      } else {
        discordIdleStatus.classList.add("stopped");
        discordIdleStatus.classList.remove("running");
      }
    })
    .catch((error) => {
      handleError(error);
    });

  fetch("/cpu")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const cpuUsage = document.getElementById("cpuUsage");
      cpuUsage.textContent = `${data.cpuUsage}%`;
      updateColor(cpuUsage, parseFloat(data.cpuUsage));
    })
    .catch((error) => {
      handleError(error);
    });

  fetch("/ram")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const ramUsage = document.getElementById("ramUsage");
      ramUsage.textContent = `${data.ramUsage}%`;
      updateColor(ramUsage, parseFloat(data.ramUsage));
    })
    .catch((error) => {
      handleError(error);
    });

  fetch("/uptime")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const uptime = document.getElementById("uptime");
      uptime.textContent = data.uptime;
    })
    .catch((error) => {
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
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log(
        `Steam Farm ${currentStatus === "ON" ? "stopped" : "started"}:`,
        data
      );
      updateStatus();
    })
    .catch((error) => {
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
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log(
        `Discord Idle ${currentStatus === "ON" ? "stopped" : "started"}:`,
        data
      );
      updateStatus();
    })
    .catch((error) => {
      handleError(error);
    });
}

document
  .getElementById("steamFarmStatus")
  .addEventListener("click", toggleSteamFarm);
document
  .getElementById("discordIdleStatus")
  .addEventListener("click", toggleDiscordIdle);

setInterval(updateStatus, 1000);
updateStatus();

function handleError(error) {
  console.error("Error:", error);
  // alert("An error occurred. Please try again.");
}

function updateStatus() {
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
      if (data.status === "ON") {
        steamFarmStatus.classList.add("running");
        steamFarmStatus.classList.remove("stopped");
      } else {
        steamFarmStatus.classList.add("stopped");
        steamFarmStatus.classList.remove("running");
      }
    })
    .catch((error) => {
      console.error("Error fetching Steam Farm status:", error);
      handleError(error);
    });

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
      if (data.status === "ON") {
        discordIdleStatus.classList.add("running");
        discordIdleStatus.classList.remove("stopped");
      } else {
        discordIdleStatus.classList.add("stopped");
        discordIdleStatus.classList.remove("running");
      }
    })
    .catch((error) => {
      console.error("Error fetching Discord Idle status:", error);
      handleError(error);
    });

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
