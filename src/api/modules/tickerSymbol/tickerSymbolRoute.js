const { Router } = require("express");
const Controller = require("./tickerSymbolController");

const router = Router({ mergeParams: true });

router.get("/tickerSymbols", Controller.getAllTickerSymbol);

module.exports = router;
