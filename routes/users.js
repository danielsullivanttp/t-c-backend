const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

// Called when user logs in
router.post("/login", async (req, res) => {
  try {
    const { id, name, email, picture } = req.body;

    let user = await Users.findByPk(id);

    if (!user) {
      user = await Users.create({
        id,
        name,
        email,
        picture
      });
    }

    res.json(user);

  } catch (err) {
    console.log("🔥 User login error:", err);
    res.status(500).json({ error: "Failed to process user login" });
  }
});

module.exports = router;
