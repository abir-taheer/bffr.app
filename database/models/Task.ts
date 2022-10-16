import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../sequelize";
import User from "./User";
import ActivityMember from "./ActivityMember";
import Activity from "./Activity";

export default class Task extends Model<
  InferAttributes<Task, {}>,
  InferCreationAttributes<Task, {}>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<string>;

  declare userId: string;
  declare activityId: number;

  declare order: number;

  declare action: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // deletedAt is only defined after the row is soft-deleted
  declare deletedAt: CreationOptional<Date>;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(256),
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

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Task",
    sequelize,
    paranoid: true,
  }
);
setImmediate(() => {
  Task.belongsTo(User, { foreignKey: "userId" });
  Task.belongsTo(Activity, { foreignKey: "activityId" });
});
