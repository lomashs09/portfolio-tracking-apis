const { uuid } = require("uuidv4");

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert("tickerSymbols", [
      {
        id: uuid(),
        name: "Tata Consultancy Services Limited",
        symbol: "TCS",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: "Wipro pvt. Limited",
        symbol: "WIPRO",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: "Godrejind Limited",
        symbol: "GODREJIND",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: "Infosys pvt. Limited",
        symbol: "INFOSYS",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => queryInterface.bulkDelete("tickerSymbols", null, {})
};
