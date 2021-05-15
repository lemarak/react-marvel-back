const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();

const User = require("../models/User");

// Signup
router.post("/user/signup", async (req, res) => {
  console.log("Je passe dans signup");
  try {
    const { email, username, password } = req.fields;
    // Etape1 : vérifier qu'il n'y a pas déjà un user qui possède ce nom
    const userUserName = await User.findOne({ username: username });
    if (userUserName) {
      res.status(403).json({ message: "username exists" });
    }
    // Etape2 : vérifier qu'il n'y a pas déjà un user qui possède cet email
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
      res.status(403).json({ message: "email exists" });
    }
    // Etape 3 : vérifier que les champs nécessaires sont requis
    if (!email || !username || !password) {
      res.status(400).json({ error: "Missing parameters" });
    }
    // Etape 4, tout est bon, on peut créer notre User
    // encrypter le mot de passe
    const salt = uid2(16);
    const token = uid2(64);
    const hash = SHA256(salt + password).toString(encBase64);
    // créer User
    const newUser = new User({
      email: email,
      username: username,
      token: token,
      salt: salt,
      hash: hash,
    });
    await newUser.save();
    res.status(200).json({
      username: username,
      _id: newUser._id,
      token: newUser.token,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.fields;
    // Etape1 : chercher le user qui souhaite se connecter
    const user = await User.findOne({ email: email });
    if (user) {
      // Etape2 : vérifier que le mot de passe est le bon
      const newHash = SHA256(user.salt + password).toString(encBase64);
      if (newHash === user.hash) {
        // Etape3 : répondre au client OK
        res.status(200).json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
