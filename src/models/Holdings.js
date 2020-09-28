module.exports = (sequelize, DataTypes) => {
  const Holding = sequelize.define(
    "holding",
    {
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
      average: {
        type: DataTypes.DECIMAL(26, 2),
        allowNull: false,
        defaultValue: 100
      },
      shares: {
        type: DataTypes.INTEGER(),
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
    },
    {
      timestamps: true,
      paranoid: true
    }
  );

  Holding.associate = model => {
    Holding.belongsTo(model.user);
    Holding.belongsTo(model.tickerSymbol);
  };

  return Holding;
};
