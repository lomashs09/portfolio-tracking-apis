const tradeRoutes = require("../api/modules/trade/tradeRoutes");
const tickerSymbolRoutes = require("../api/modules/tickerSymbol/tickerSymbolRoute");
const holdingRoutes = require("../api/modules/holding/holdingRoutes");

const config = require("../config");

exports.loadRoutes = app => {
  app.use(`/${config.api.prefix}/`, tradeRoutes);
  app.use(`/${config.api.prefix}/`, tickerSymbolRoutes);
  app.use(`/${config.api.prefix}/`, holdingRoutes);
};
