const { models } = require("../loaders/sequelize");
const Message = require("../utils/ResponseMessages");
const { Response } = require("../utils/package");

const isUserExist = async userId => {
  const user = await models.user.findOne({
    attributes: ["id"],
    nest: true,
    raw: true,
    where: {
      id: userId
    }
  });

  if (!user) throw Response.createError(Message.userNotFound);
  return user;
};

const isTickerSymbolExist = async id => {
  const tickerSymbol = await models.tickerSymbol.findOne({
    attributes: ["id", "name", "symbol", "price"],
    nest: true,
    raw: true,
    where: {
      id
    }
  });
  if (!tickerSymbol) throw Response.createError(Message.tickerSymbolNotFound);
  return tickerSymbol;
};

module.exports = { isUserExist, isTickerSymbolExist };
