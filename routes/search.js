const express = require("express");
const axios = require("axios");
const router = express.Router();

const KEY = process.env.PRIVATE_KEY;

router.get("/search/characters", async (req, res) => {
  try {
    const name = req.query.name;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${KEY}&name=${name}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search/comics", async (req, res) => {
  try {
    const title = req.query.title;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${KEY}&title=${title}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
