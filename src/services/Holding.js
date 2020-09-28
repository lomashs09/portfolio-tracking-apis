const Message = require("../utils/ResponseMessages");
const { models } = require("../loaders/sequelize");
const { Response, Logger } = require("../utils/package");
const { isUserExist } = require("./isExist");

const getHoldings = async userId => {
  try {
    await isUserExist(userId);

    return await models.holding.findAll({
      nest: true,
      raw: true,
      attributes: ["id", "average", "shares"],
      where: {
        userId
      },
      include: [
        {
          model: models.tickerSymbol,
          attributes: ["symbol"]
        }
      ]
    });
  } catch (e) {
    Logger.log("error", "error in fetching holdings for a user", e);
    throw Response.createError(Message.tryAgain, e);
  }
};

const getReturns = async userId => {
  try {
    await isUserExist(userId);

    const currentPrice = 100;

    const holdings = await models.holding.findAll({
      nest: true,
      raw: true,
      attributes: ["id", "tickerSymbolId", "average", "shares"],
      where: {
        userId
      }
    });

    const returns = holdings.reduce(
      (a, b) => a + (currentPrice - parseInt(b.average)) * b.shares,
      0
    );

    return { returns };
  } catch (e) {
    Logger.log("error", "error in fetching returns for a user", e);
    throw Response.createError(Message.tryAgain, e);
  }
};
module.exports = { getHoldings, getReturns };
