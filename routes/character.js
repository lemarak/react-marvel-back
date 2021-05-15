const express = require("express");
const axios = require("axios");
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
router.get("/comic/add-favorites/:token/:characterId", async (req, res) => {
  try {
    const token = req.params["token"];
    const characterId = req.params["characterId"];

    const user = await User.findOne({ token: token });
    if (user) {
      user.favoritesCharacters.push(characterId);
      await user.save();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
