const httpStatusCodes = require("http-status-codes");
const { Response, Logger } = require("../../../utils/package");
const { TickerSymbol } = require("../../../services");

class TickerSymbolController {
  static async getAllTickerSymbol(req, res) {
    try {
      Logger.log("info", "fetching all ticker symbols");

      const tickerSymbols = await TickerSymbol.getAllTickerSymbols();

      Response.success(res, "success", tickerSymbols);
    } catch (error) {
      Logger.log("error", "error in creating user", error);

      Response.fail(res, error.message, httpStatusCodes.BAD_GATEWAY);
    }
  }
}

module.exports = TickerSymbolController;
