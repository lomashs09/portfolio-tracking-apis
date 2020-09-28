module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable("tickerSymbols", {
      id: {
        type: DataTypes.UUID(),
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(26, 2),
        allowNull: false,
        defaultValue: 100
      },
      createdBy: {
        type: DataTypes.STRING(),
        allowNull: true
      },
      updatedBy: {
        type: DataTypes.STRING(),
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }),

  down: queryInterface => queryInterface.dropTable("tickerSymbols")
};
