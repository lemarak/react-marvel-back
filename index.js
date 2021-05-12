const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "I'm lost !!!" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is started");
});
