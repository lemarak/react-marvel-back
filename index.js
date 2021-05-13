const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const characterRoutes = require("./routes/character");
app.use(characterRoutes);
const comicRoutes = require("./routes/comic");
app.use(comicRoutes);
const searchRoutes = require("./routes/search");
app.use(searchRoutes);
const userRoutes = require("./routes/user");
app.use(userRoutes);

// Home back end
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
