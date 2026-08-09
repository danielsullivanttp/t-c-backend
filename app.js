const express = require("express");
const app = express();
const PORT = 3000;
const { db } = require("./models");
const TradingCardsRouter = require("./routes/trading-cards");
const cors = require('cors');
const favoriteRoutes = require("./routes/favoriteCards")
const usersRouter = require("./routes/users");

async function logger(req, res, next){
  console.log(`>>>>>Logging Request Method:  ${req.method }, ${req.originalUrl}`);
  next();
}
app.use(logger);
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],}));
  app.use("/favorites", favoriteRoutes);
  
  app.get("/", (req, res) => {
    res.json({ message: "API root" });
  });
  
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  app.use("/users", usersRouter);
  app.use("/TradingCard", TradingCardsRouter); // (Mounting router from "./routes/trading-cards") adds the /TradingCard prefix
  // ****Isn't repeated in routes/trading-cards.js***

function errorHandler(err, req, res, next){
  console.log("🔥 GLOBAL ERROR HANDLER:", err);
  res.status(500).json({ error: "Something went wrong!!!" });
}
app.use(errorHandler);

async function startApp() {
  await db.sync({alter: true});
  app.listen(PORT, () => {
    console.log("Server running on port 3000!!!");
  });
}

startApp();
