const { Router } = require("express");
const Controller = require("./holdingController");
const Validations = require("./holdingValidations");

const router = Router({ mergeParams: true });

router.get(
  "/users/:userId/holdings",
  Validations.getAllHoldings,
  Controller.getHoldings
);

router.get(
  "/users/:userId/returns",
  Validations.getAllHoldings,
  Controller.getReturns
);

module.exports = router;
