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

// Admin characters to user's favorites
router.get(
  "/character/admin-favorites/:token/:characterId/:action",
  async (req, res) => {
    try {
      const token = req.params["token"];
      const characterId = req.params["characterId"];
      const action = req.params["action"];

      const user = await User.findOne({ token: token });
      if (user) {
        const indexCharacter = user.favoritesCharacters.indexOf(characterId);
        if (action === "add" && indexCharacter === -1) {
          user.favoritesCharacters.push(characterId);
          await user.save();
          console.log(characterId);
        } else if (action === "remove" && indexCharacter !== -1) {
          user.favoritesCharacters.splice(indexCharacter, 1);
          await user.save();
        }
        res.status(200).json({ favoritesCharacters: user.favoritesCharacters });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
