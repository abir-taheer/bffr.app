import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../sequelize";
import User from "./User";
import Activity from "./Activity";

export default class ActivityMember extends Model<
  InferAttributes<ActivityMember, {}>,
  InferCreationAttributes<ActivityMember, {}>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<string>;
  declare userId: number;
  declare activityId: number;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // deletedAt is only defined after the row is soft-deleted
  declare deletedAt: CreationOptional<Date>;
}

ActivityMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
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
    tableName: "ActivityMember",
    sequelize,
    paranoid: true,
  }
);

setImmediate(() => {
  ActivityMember.belongsTo(User, { foreignKey: "userId" });
  ActivityMember.belongsTo(Activity, { foreignKey: "activityId" });
});
