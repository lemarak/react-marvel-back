const express = require("express");
const axios = require("axios");
const router = express.Router();

const KEY = process.env.PRIVATE_KEY;

// List comics
router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// One comic
router.get("/comic/:comicId", async (req, res) => {
  try {
    const comic = req.params["comicId"];
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comic}?apiKey=${KEY}`
    );
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Comic not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List comics for a character
router.get("/comics/:characterId", async (req, res) => {
  try {
    const character = req.params["characterId"];
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${character}?apiKey=${KEY}`
    );
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
