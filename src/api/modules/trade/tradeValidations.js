const { celebrate, Joi } = require("celebrate");
const { AMOUNT_ERRORS, TRADE_TYPE } = require("../../../utils/constants");

module.exports = {
  buyOrSaleTrade: celebrate({
    params: {
      userId: Joi.string()
        .uuid()
        .required()
    },
    body: {
      tickerSymbolId: Joi.string()
        .uuid()
        .required(),
      amount: Joi.number()
        .positive()
        .precision(2)
        .strict()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.required":
                err.message = AMOUNT_ERRORS.empty;
                break;
              case "any.empty":
                err.message = AMOUNT_ERRORS.empty;
                break;
              case "number.positive":
                err.message = AMOUNT_ERRORS.positive;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      shares: Joi.number()
        .positive()
        .required(),
      tradeType: Joi.string()
        .valid(Object.values(TRADE_TYPE))
        .required()
    }
  }),

  updateTrade: celebrate({
    params: {
      userId: Joi.string()
        .uuid()
        .required(),
      tradeId: Joi.string()
        .uuid()
        .required()
    },
    body: {
      shares: Joi.number().positive(),
      amount: Joi.number()
        .positive()
        .precision(2)
        .strict()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.required":
                err.message = AMOUNT_ERRORS.empty;
                break;
              case "any.empty":
                err.message = AMOUNT_ERRORS.empty;
                break;
              case "number.positive":
                err.message = AMOUNT_ERRORS.positive;
                break;
              default:
                break;
            }
          });
          return errors;
        })
    }
  }),
  getAllTrades: celebrate({
    params: {
      userId: Joi.string()
        .uuid()
        .required()
    }
  })
};
