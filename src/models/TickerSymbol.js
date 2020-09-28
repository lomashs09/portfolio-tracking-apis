// todo: can make the datatypes of priority and label as ENUM by finalizing the value
module.exports = (sequelize, DataTypes) => {
  const TickerSymbol = sequelize.define(
    "tickerSymbol",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(26, 2),
        defaultValue: 100
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
  TickerSymbol.associate = model => {
    TickerSymbol.belongsToMany(model.user, {
      through: model.trade
    });
  };

  return TickerSymbol;
};
