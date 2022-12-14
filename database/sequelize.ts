import { Options, Sequelize } from "sequelize";

const logsDisabled = process.env.SEQUELIZE_NO_LOG === "true";
const url = process.env.SEQUELIZE_URL;

if (!url) {
  throw new Error("The environment variable SEQUELIZE_URL is not set.");
}

const env: string = process.env.NODE_ENV || "development";

const configMap: { [key: string]: Options } = {
  development: {
    define: {
      charset: "utf8",
      collate: "utf8_unicode_ci",
    },
    ssl: true,
    native: true,
    logging: logsDisabled ? false : console.log,
  },
  production: {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      charset: "utf8",
      collate: "utf8_unicode_ci",
    },
    native: true,
    ssl: true,
    logging: false,
  },
};

const config = configMap[env];

const sequelize = new Sequelize(url, config);

export default sequelize;
