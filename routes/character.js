const express = require("express");
const axios = require("axios");

const User = require("../models/User");

const router = express.Router();

const KEY = process.env.PRIVATE_KEY;
const LIMIT = 100;

router.get("/characters", async (req, res) => {
  try {
    const page = req.query.page;
    const skip = LIMIT * (page - 1);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${KEY}&limit=${LIMIT}&skip=${skip}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add characters to user's favorites
router.get("/character/add-favorites/:token/:characterId", async (req, res) => {
  try {
    const token = req.params["token"];
    const characterId = req.params["characterId"];

    const user = await User.findOne({ token: token });
    if (user) {
      if (user.favoritesCharacters.indexOf(characterId) === -1) {
        user.favoritesCharacters.push(characterId);
        await user.save();
        console.log(characterId);
      }
      res.status(200).json({ favoritesCharacters: user.favoritesCharacters });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
