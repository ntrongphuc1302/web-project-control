const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const controlRouter = require("./controllers/control");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "..", "src")));
app.use(express.json());

app.use("/control", controlRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
