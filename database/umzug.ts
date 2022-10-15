import path from "path";
import { SequelizeStorage, Umzug } from "umzug";
import sequelize from "./sequelize";

const migrationsPath = path.resolve(__dirname, "migrations");

// Umzug is responsible for running Migrations
const umzug = new Umzug({
  migrations: {
    glob: migrationsPath + "/*.ts",
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export default umzug;
