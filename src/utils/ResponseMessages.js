const httpStatusCodes = require("http-status-codes");

module.exports = {
  tryAgain: {
    name: "CustomError",
    code: httpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "Please try again"
  },
  userNotFound: {
    name: "CustomError",
    code: httpStatusCodes.NOT_FOUND,
    message: "User not found"
  },
  tickerSymbolNotFound: {
    name: "CustomError",
    code: httpStatusCodes.NOT_FOUND,
    message: "tickerSymbol not found"
  },
  tradeNotFound: {
    name: "CustomError",
    code: httpStatusCodes.NOT_FOUND,
    message: "Trade not found"
  },
  sharesMoreThanHoldings: {
    name: "CustomError",
    code: httpStatusCodes.BAD_REQUEST,
    message: "entered shares are more than holdings, please enter lesser value"
  },
  sharesNotFound: {
    name: "CustomError",
    code: httpStatusCodes.BAD_REQUEST,
    message: `not enough shares to sell, please try again`
  }
};
