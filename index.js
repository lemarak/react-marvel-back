const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

// Routes
const characterRoutes = require("./routes/character");
app.use(characterRoutes);
const comicRoutes = require("./routes/comic");
app.use(comicRoutes);

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue sur l'API Marvel" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  res.status(200).json({ message: "Hello" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "I'm lost !!!" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is started");
});
