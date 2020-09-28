const { uuid } = require("uuidv4");
const Message = require("../utils/ResponseMessages");
const { models } = require("../loaders/sequelize");
const { Response } = require("../utils/package");
const { TRADE_TYPE } = require("../utils/constants");
const Logger = require("../utils/package/Logger");
const { isUserExist, isTickerSymbolExist } = require("./isExist");

const addTrade = async (userId, params) => {
  try {
    await isUserExist(userId);

    await isTickerSymbolExist(params.tickerSymbolId);

    const trade = await models.trade.create({
      id: uuid(),
      userId,
      tickerSymbolId: params.tickerSymbolId,
      amount: params.amount,
      shares: params.shares,
      type: TRADE_TYPE.buy
    });

    const holding = await models.holding.findOne({
      nest: true,
      raw: true,
      attributes: ["average", "shares"],
      where: {
        userId,
        tickerSymbolId: params.tickerSymbolId
      }
    });

    if (holding) {
      const shares = holding.shares + params.shares;
      const average =
        (params.amount * params.shares + holding.average * holding.shares) /
        shares;

      await models.holding.update(
        {
          shares,
          average
        },
        {
          where: { userId, tickerSymbolId: params.tickerSymbolId }
        }
      );
    } else {
      await models.holding.create({
        id: uuid(),
        tickerSymbolId: params.tickerSymbolId,
        userId,
        average: params.amount,
        shares: params.shares
      });
    }

    return trade;
  } catch (e) {
    Logger.log("error", "error in adding trades", e);
    throw Response.createError(Message.tryAgain, e);
  }
};

const updateTrade = async (userId, tradeId, params) => {
  try {
    await isUserExist(userId);

    const trade = await models.trade.findOne({
      nest: true,
      raw: true,
      attributes: ["id", "tickerSymbolId"],
      where: {
        id: tradeId
      }
    });

    if (!trade) throw Response.createError(Message.tradeNotFound);

    await models.trade.update(params, { where: { id: tradeId } });

    const allTrades = await models.trade.findAll({
      nest: true,
      raw: true,
      attributes: ["id", "amount", "shares", "type"],
      where: {
        userId,
        tickerSymbolId: trade.tickerSymbolId
      }
    });
    const share = {
      amount: 0,
      buy: 0,
      sold: 0
    };

    allTrades.forEach(element => {
      if (element.type === "BUY") {
        if (!share.amount) {
          share.amount = parseFloat(element.amount);
          share.buy = element.shares;
        } else {
          share.amount =
            (share.amount * share.buy +
              parseFloat(element.amount) * element.shares) /
            (share.buy + element.shares);
          share.buy += element.shares;
        }
      } else if (!share.sold) share.sold = element.shares;
      else share.sold += element.shares;
    });

    await models.holding.update(
      {
        average: share.amount,
        shares: share.buy - share.sold
      },
      {
        where: {
          userId,
          tickerSymbolId: trade.tickerSymbolId
        }
      }
    );
  } catch (e) {
    Logger.log("error", "error in updating trades", e);
    throw Response.createError(Message.tryAgain, e);
  }
};

const sellTrade = async (userId, params) => {
  try {
    await isUserExist(userId);

    await isTickerSymbolExist(params.tickerSymbolId);

    const holding = await models.holding.findOne({
      nest: true,
      raw: true,
      attributes: ["id", "shares"],
      where: {
        userId,
        tickerSymbolId: params.tickerSymbolId
      }
    });

    if (!holding) throw Response.createError(Message.sharesNotFound);

    if (params.shares > holding.shares)
      throw Response.createError(Message.sharesMoreThanHoldings);

    const trade = await models.trade.create({
      id: uuid(),
      userId,
      tickerSymbolId: params.tickerSymbolId,
      amount: params.amount,
      shares: params.shares,
      type: TRADE_TYPE.sale
    });

    await models.holding.update(
      {
        shares: holding.shares - params.shares
      },
      {
        where: {
          userId,
          tickerSymbolId: params.tickerSymbolId
        }
      }
    );

    return trade;
  } catch (e) {
    Logger.log("error", "error in selling trades", e);
    throw Response.createError(Message.tryAgain, e);
  }
};

const getAllTrades = async userId => {
  try {
    const res = await models.user.findAll({
      nest: true,
      raw: true,
      attributes: ["id", "name"],
      where: {
        id: userId
      },
      include: [
        {
          required: true,
          model: models.tickerSymbol,
          attributes: ["id", "name", "symbol"],
          through: { attributes: ["id", "amount", "shares", "type"] }
        }
      ]
    });

    return res;
  } catch (e) {
    Logger.log("error", "error in fetching all Trades", e);
    throw Response.createError(Message.tryAgain, e);
  }
};

module.exports = { addTrade, updateTrade, sellTrade, getAllTrades };
