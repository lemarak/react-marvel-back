const express = require("express");
const axios = require("axios");

const User = require("../models/User");

const router = express.Router();

const KEY = process.env.PRIVATE_KEY;
const LIMIT = 100;

// List comics
router.get("/comics", async (req, res) => {
  try {
    const page = req.query.page;
    const skip = LIMIT * (page - 1);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${KEY}&limit=${LIMIT}&skip=${skip}`
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

// Admin comics to user's favorites
router.get(
  "/comic/admin-favorites/:token/:comicId/:action",
  async (req, res) => {
    try {
      const token = req.params["token"];
      const comicId = req.params["comicId"];
      const action = req.params["action"];

      const user = await User.findOne({ token: token });
      if (user) {
        const indexComic = user.favoritesComics.indexOf(comicId);
        if (action === "add" && indexComic === -1) {
          user.favoritesComics.push(comicId);
          await user.save();
        } else if (action === "remove" && indexComic !== -1) {
          user.favoritesComics.splice(indexComic, 1);
          await user.save();
        }
        res.status(200).json({ favoritesComics: user.favoritesComics });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

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

// get one comic
router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params["comicId"];
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${KEY}`
    );
    if (response.data) {
      res.status(200).json(response.data);
      console.log(response.data);
    } else {
      res.status(404).json({ message: "Comic not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
