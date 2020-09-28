const { GENDERTYPES } = require("../utils/constants");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      gender: {
        type: DataTypes.ENUM(GENDERTYPES),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    const userId = "c40853a4-bc7b-4b34-870d-466b5785d21e";

    await queryInterface.bulkInsert("users", [
      {
        id: userId,
        name: "Test User",
        email: "test@test.com",
        gender: "MALE",
        phone: "1234567890",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => queryInterface.dropTable("users")
};
