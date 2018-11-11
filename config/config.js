module.exports = {
    development: {
        host: 'localhost',
        dialect: 'mysql',
        database: 'mysql',
        username: 'root',
        password: '33YJ7DAdiBnaWi9r',
    },
    test: {
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql',
    },
  };
