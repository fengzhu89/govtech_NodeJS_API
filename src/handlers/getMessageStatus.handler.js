const db = require("../db");
module.exports = {
  getMessageStatus: (req, res) => {
    res.send("Welcome to Aministrative Tool");
    // db.query("SELECT * FROM Register", function (err, rows) {
    //   if (err) {
    //     return res.send({
    //       error_code: "SERVER_ERROR",
    //       message: "Unknown error",
    //     });
    //   }

    //   if (rows.length === 0) {
    //     return res.send({
    //       message: "could not find any data",
    //     });
    //   }

    //   res.send(rows);
    // });
  },
};
