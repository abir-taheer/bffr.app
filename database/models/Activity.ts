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

export default class Activity extends Model<
  InferAttributes<Activity, {}>,
  InferCreationAttributes<Activity, {}>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<string>;
  declare prompt: string;

  declare createdBy: number;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // deletedAt is only defined after the row is soft-deleted
  declare deletedAt: CreationOptional<Date>;
}

Activity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prompt: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },

    createdBy: {
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
    tableName: "Activity",
    sequelize,
    paranoid: true,
  }
);

setImmediate(() => {
  Activity.belongsTo(User, { foreignKey: "createdBy" });
  Activity.belongsToMany(User, { through: ActivityMember });
});
