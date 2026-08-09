const express = require("express");
const router = express.Router(); //groups one resource's routes in one file.
const  TradingCard  = require("../models/TradingCard");
const { Op } = require("sequelize");

async function requireName(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json("Name is missing, please enter one!!!");
  }
  next();
}

async function requireOwnerId(req, res, next) {
  if (!req.body.ownerId) {
    return res.status(400).json("ownerId is required.");
  }
  next();
}

// GET all TradingCards
router.get("/", async (req, res) => {
  try {
    const { name, team, status, value, rare } = req.query;
    const where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` }; // contains, case-insensitive
    }

    if (team) {
      where.team = { [Op.iLike]: `%${team}%` }; // contains, case-insensitive
    }

    if (status) {
      where.status = status; // contains, case-sensitive
    }

    if (rare != undefined) {
      where.rare = req.query.rare === "true"; // must be set up like this to request a boolean value
    }

    if (value != undefined) {
      where.value = Number(value); // exact match
    }
    const tradingCards = await TradingCard.findAll({ where });
    res.json(tradingCards);
  } catch (err) {
    console.log(err);
  }
});

// GET /TradingCards/:id- return a single TradingCard by id
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tradingcard = await TradingCard.findByPk(id);
    if (!tradingcard)
      return res.status(404).json({ error: "Trading Card Not Found!!!" });
    console.log("TradingCard id received: ", req.params.id);
    res.json(tradingcard);
  } catch (err) {
    console.log(err);
  }
});
router.post("/", requireName, async (req, res, next) => {
  try {
    console.log("📥 Incoming POST body:", req.body);

    const tradingCard = await TradingCard.create({
      name: req.body.name,
      team: req.body.team,
      status: req.body.status,
      value: Number(req.body.value),
      rare: req.body.rare,
      ownerId: req.body.ownerId
    });

    console.log("✅ Created card:", tradingCard.toJSON());
    return res.status(201).json(tradingCard);

  } catch (err) {
    console.log("🔥 REAL Sequelize error:", err);

    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors[0].message });
    }

    return next(err);
  }
});

// PATCH /TradingCards- Update Tradingcard data
router.patch("/:id", async (req, res) => {
  try {
    const tradingCard = await TradingCard.findByPk(req.params.id);
    if (!tradingCard)
      return res.status(404).json({ error: "That Trading Card Not Found!!!" });
    await tradingCard.update(req.body);
    console.log(tradingCard);
    res.status(201).json(tradingCard);
  } catch (err) {
    console.log(err);
  }
});

// DELETE /TradingCards- Delete TradingCard
router.delete("/:id", async (req, res) => {
  try {
    const tradingCard = await TradingCard.findByPk(req.params.id);
    if (!tradingCard)
      return res.status(404).json({ error: "Trading Card Not Found!!!" });
    await tradingCard.destroy();
    res.status(404);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
