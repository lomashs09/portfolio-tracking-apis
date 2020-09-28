const { celebrate, Joi } = require("celebrate");

module.exports = {
  getAllHoldings: celebrate({
    params: {
      userId: Joi.string()
        .uuid()
        .required()
    }
  })
};
