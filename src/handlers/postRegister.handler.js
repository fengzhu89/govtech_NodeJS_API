const { json } = require("body-parser");
const db = require("../db");

module.exports = {
  postRegister: async (req, res) => {
    // check the request body key

    let teacher = req.body.teacher,
      students = req.body.students;
    if (typeof teacher === "undefined" || typeof students === "undefined") {
      return res.status(400).send({
        message: "Teacher or students is undefined",
      });
    }
    //check teacher value
    if (typeof teacher !== "string" || teacher.length < 1) {
      return res.status(400).send({
        message: "teacher email must be a non empty string",
      });
    }

    //check students format
    if (typeof students !== "object") {
      return res.status(400).send({
        message: "students must be an array object",
      });
    }

    for (let i = 0, len = students.length; i < len; i++) {
      //check student value
      if (typeof students[i] !== "string" || students[i].length < 1) {
        return res.status(400).send({
          message: "student email must be a non empty string",
        });
      }

      values = [teacher, students[i]];

      try {
        await new Promise(function (resolve, reject) {
          db.query(
            "INSERT INTO Register (teacher,students) VALUES(?,?)",
            values,
            function (err, result) {
              if (err) {
                return reject(err);
              }
              resolve(result);
            }
          );
        });
      } catch (err) {
        return res.status(400).send({
          message: err,
        });
      }
    }

    res.sendStatus(204);
    res.end();
  },
};
