const GENDERTYPES = ["MALE", "FEMALE", "OTHER"];
const PRIORITY_TYPES = ["URGENT", "HIGH", "MEDIUM", "LOW"];
const LABEL_TYPES = ["WORK", "PERSONAL", "SHOPPING", "EDUCATION", "OTHERS"];
const IN_PROGRESS_STAGE = "IN_PROGRESS";
const TODO_STAGES = [IN_PROGRESS_STAGE, "COMPLETED", "CANCELLED"];

const AMOUNT_ERRORS = {
  positive: "Amount should be positive",
  empty: "Please enter amount for trade"
};

const TRADE_TYPE = {
  buy: "BUY",
  sale: "SALE"
};

module.exports = {
  GENDERTYPES,
  PRIORITY_TYPES,
  LABEL_TYPES,
  TODO_STAGES,
  AMOUNT_ERRORS,
  IN_PROGRESS_STAGE,
  TRADE_TYPE
};
