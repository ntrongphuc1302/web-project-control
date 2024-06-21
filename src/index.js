document.getElementById("start-button").addEventListener("click", () => {
  fetch("/start", { method: "POST" })
    .then((response) => response.text())
    .then((message) => alert(message))
    .catch((error) => console.error("Error:", error));
});

document.getElementById("stop-button").addEventListener("click", () => {
  fetch("/stop", { method: "POST" })
    .then((response) => response.text())
    .then((message) => alert(message))
    .catch((error) => console.error("Error:", error));
});
