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

module.exports = router;
