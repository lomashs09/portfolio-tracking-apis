const { models } = require("../loaders/sequelize");

const getAllTickerSymbols = async () =>
  models.tickerSymbol.findAll({
    attributes: ["id", "name", "symbol", "price"],
    nest: true,
    raw: true
  });

module.exports = { getAllTickerSymbols };
