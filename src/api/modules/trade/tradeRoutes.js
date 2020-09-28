const { Router } = require("express");
const Controller = require("./tradeController");
const Validations = require("./tradeValidations");

const router = Router({ mergeParams: true });

router.post(
  "/users/:userId/trades",
  Validations.buyOrSaleTrade,
  Controller.buyOrSaleTrade
);

router.put(
  "/users/:userId/trades/:tradeId",
  Validations.updateTrade,
  Controller.updateTrade
);

router.get(
  "/users/:userId/trades",
  Validations.getAllTrades,
  Controller.getAllTrades
);

module.exports = router;
