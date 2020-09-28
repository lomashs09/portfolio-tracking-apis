module.exports = {
  up: async queryInterface => {
    await queryInterface.addIndex("tickerSymbols", ["name", "symbol"]);
    await queryInterface.addIndex("holdings", ["average", "shares"]);

    await queryInterface.addIndex("trades", ["amount", "shares", "type"]);
  },

  down: async () => {}
};
