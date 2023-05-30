const { Sequelize } = require("sequelize");

//Создаем instance Sequelize
/**
 * Sequelize - штука, которая позволяет через себя подключаться к БД и САМОЕ ГЛАВНОЕ - не писать чистые SQL-запросы, а использовать функции.
 */
const sequelizeInstance = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "js-todo",
  username: "postgres",
  password: "mireabbso0220",

  // dialect: "sqlite",
  // storage: "./sqliteData/database.sqlite", //Путь до файла с данными
});

/**
 * Синхронизация моделей (таблиц) БД.
 * Этот код позволяет не лезть в БД (pgAdmin) и не создавать таблицы. (это происходит автоматически)
 */
const initDB = async () => {
  try {
    await sequelizeInstance.authenticate(); //Авторизация нашей ORM в БД
    // await sequelize.dropSchema('public', {});
    // await sequelize.createSchema('public', {});
    await sequelizeInstance.sync(); //Синхронизация МОДЕЛЕЙ
    console.log("Sequelize was initialized");
  } catch (error) {
    console.log("Sequelize ERROR (initDB)", error);
    process.exit();
  }
};

module.exports = {
  sequelizeInstance,
  initDB,
};
