module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable("trades", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      tickerSymbolId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tickerSymbols",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      amount: {
        type: DataTypes.DECIMAL(26, 2),
        allowNull: false
      },
      shares: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
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

  down: queryInterface => queryInterface.dropTable("trades")
};
