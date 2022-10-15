import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../sequelize";

export default class User extends Model<
  InferAttributes<User, {}>,
  InferCreationAttributes<User, {}>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;

  declare picture: string | null;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // deletedAt is only defined after the row is soft-deleted
  declare deletedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    picture: {
      type: new DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "User",
    sequelize,
    paranoid: true,
  }
);
