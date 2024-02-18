import sql from "mssql";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();
const {
  SQL_USER,
  SQL_PASSWORD,
  SQL_SERVER,
  SQL_DB,
  SQL_SERVER_PORT,
  SQL_ENCRYPT,
  SQL_TRUST_SERVER_CERTIFICATE,
} = process.env;

const sqlConfig = {
  user: SQL_USER,
  password: SQL_PASSWORD,
  server: SQL_SERVER,
  database: SQL_DB,
  port: Number(SQL_SERVER_PORT),

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 3000,
  },

  options: {
    encrypt: Boolean(SQL_ENCRYPT),
    trustServerCertificate: Boolean(SQL_TRUST_SERVER_CERTIFICATE),
  },
};

let appPool;
let poolRequest;

try {
  appPool = await sql.connect(sqlConfig);
  //console.log("Reached here");
  poolRequest = () => appPool.request();
  if (appPool) {
    logger.info("Connected to MSSQL Server");
  }
} catch (error) {
  logger.error("Error creating connection pool", error);
}

export { poolRequest, sql };
