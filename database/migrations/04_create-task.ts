import { DataTypes, QueryInterface } from "sequelize";
import { MigrationFn } from "umzug";

const up: MigrationFn<QueryInterface> = async function ({
  context: queryInterface,
}) {
  await queryInterface.createTable("Task", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};

const down: MigrationFn<QueryInterface> = async function ({
  context: queryInterface,
}) {
  await queryInterface.dropTable("Task");
};

export { up, down };
