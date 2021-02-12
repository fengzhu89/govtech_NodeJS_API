const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const createTableSchema = `
        CREATE TABLE IF NOT EXISTS Register (
          id INT AUTO_INCREMENT,
          teacher varchar(255) NOT NULL,
          students varchar(255) NOT NULL,
          suspend_bool boolean NOT NULL DEFAULT false,
          PRIMARY KEY (id)
        );
    `;

//create mysql  conncection
const dbCon = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

dbCon.connect((err) => {
  if (err) throw err;
  console.log("database connected successfully!!!");

  sql = createTableSchema;
  dbCon.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

module.exports = dbCon;
