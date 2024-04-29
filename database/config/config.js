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
    "password": process.env.DB_PASSWORD || "sdv50mxbsBiYYrhfNm07",
    "port": process.env.DB_PORT || 6238,
    "database": process.env.DB_DATABASE || "railway",
    "host": process.env.DB_HOST || "containers-us-west-178.railway.app",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "sdv50mxbsBiYYrhfNm07",
    "port": process.env.DB_PORT || 6238,
    "database": process.env.DB_DATABASE || "railway",
    "host": process.env.DB_HOST || "containers-us-west-178.railway.app",
    "dialect": "mysql"
  }
}