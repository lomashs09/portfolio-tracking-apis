const httpStatusCodes = require("http-status-codes");
const { Response, Logger } = require("../../../utils/package");
const { TradeService } = require("../../../services");
const { TRADE_TYPE } = require("../../../utils/constants");

class TradeController {
  static async buyOrSaleTrade(req, res) {
    try {
      let trade;
      if (req.body.tradeType === TRADE_TYPE.buy) {
        Logger.log("info", "Adding trade for a user");
        trade = await TradeService.addTrade(req.params.userId, req.body);
      } else {
        Logger.log("info", "Deleting a trade for a user");
        trade = await TradeService.sellTrade(req.params.userId, req.body);
      }

      Response.success(res, "success", trade, httpStatusCodes.CREATED);
    } catch (e) {
      Response.fail(res, e);
    }
  }

  static async updateTrade(req, res) {
    try {
      Logger.log("info", "updating trade");
      const trade = await TradeService.updateTrade(
        req.params.userId,
        req.params.tradeId,
        req.body
      );
      Response.success(res, "success", trade);
    } catch (e) {
      Response.fail(res, e);
    }
  }

  static async getAllTrades(req, res) {
    try {
      Logger.log("info", "fetching all trades for a user");

      const trades = await TradeService.getAllTrades(req.params.userId);

      Response.success(res, "success", trades);
    } catch (e) {
      Response.fail(res, e);
    }
  }
}
module.exports = TradeController;
