module.exports = {
  "development": {
    "username": "root",
    "password": "",
    "port": 3306,
    "database": "laflamante",
    "host": "127.0.0.1",
    "dialect": "mysql",
  },
  "test": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "NOKlymaWYFDuTdLISbSQUcaTyPDMSoTu",
    "port": process.env.DB_PORT || 38578,
    "database": process.env.DB_DATABASE || "railway",
    "host": process.env.DB_HOST || "roundhouse.proxy.rlwy.net",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "NOKlymaWYFDuTdLISbSQUcaTyPDMSoTu",
    "port": process.env.DB_PORT || 38578,
    "database": process.env.DB_DATABASE || "railway",
    "host": process.env.DB_HOST || "roundhouse.proxy.rlwy.net",
    "dialect": "mysql"
  }
}