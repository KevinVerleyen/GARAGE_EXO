const { DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT, DB_DIALECT } = process.env;

module.exports = {
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
  dialect: DB_DIALECT,
  option: {
    trustServerCertificate: true,
  },
};
