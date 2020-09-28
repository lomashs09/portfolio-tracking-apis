const { Response, Logger } = require("../../../utils/package");
const { holdingService } = require("../../../services");

class TradeController {
  static async getHoldings(req, res) {
    try {
      Logger.log("info", "fetching all the holdings");

      const holdings = await holdingService.getHoldings(req.params.userId);

      Response.success(res, "success", holdings);
    } catch (e) {
      Response.fail(res, e);
    }
  }

  static async getReturns(req, res) {
    try {
      Logger.log("info", "fetching returns");

      const returns = await holdingService.getReturns(req.params.userId);

      Response.success(res, "success", returns);
    } catch (e) {
      Response.fail(res, e);
    }
  }
}

module.exports = TradeController;
