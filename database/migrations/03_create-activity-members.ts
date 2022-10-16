import { DataTypes, QueryInterface } from "sequelize";
import { MigrationFn } from "umzug";

const up: MigrationFn<QueryInterface> = async function ({
  context: queryInterface,
}) {
  await queryInterface.createTable("ActivityMember", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
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
  await queryInterface.dropTable("ActivityMember");
};

export { up, down };
