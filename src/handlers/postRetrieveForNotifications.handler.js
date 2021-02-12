const db = require("../db");
module.exports = {
  postRetrieveForNotifications: (req, res) => {
   
    let teacher = req.body.teacher,
        notification = req.body.notification;
    
    if(typeof teacher ==='undefined' || typeof notification === 'undefined'){
      return res.status(400).send({
        message: "Teacher or notification is undefined",
      });
    }

    if(typeof teacher !== 'string' || teacher.length<1){
      return res.status(400).send({
        message: "teacher email must be a non empty string",
      });
    }

    if(typeof notification !== 'string' || notification.length<1){
      return res.status(400).send({
        message: "notification  must be a non empty string",
      });
    }

    // tmpValue to store the @ student content if any
    let tmpValue = notification.match(/(@[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
   
    if(tmpValue !== null){ //got @ addtional students
      let value =''
      for(let i = 0, len = tmpValue.length; i< len; i++){
        value = value + ",'" + tmpValue[i].slice(1) + "'";
      }
      value = value.slice(1)

      let sql = `SELECT students FROM Register WHERE students IN (${value}) AND suspend_bool = false 
      UNION SELECT students FROM Register WHERE teacher = ? AND suspend_bool = false `;
      db.query(sql, teacher, function (err, rows) {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }

      if (rows.length === 0) {
        return res.status(400).send({
          message: "Could not find any student",
        });
      }

      let listOfStudents = [];
      for (let i = 0; i < rows.length; i++) {
        listOfStudents.push(rows[i].students);
      }
      res.send({ recipients: listOfStudents });
      });
    }else{
      //without adding addtional student
      db.query(
        "SELECT students FROM Register WHERE teacher = ? AND suspend_bool = false",
        teacher,
        function (err, rows) {
          if (err) {
            return res.status(400).send({
              message: err,
            });
          }

          if (rows.length === 0) {
            return res.status(404).send({
              message: "Could not find any student",
            });
          }

          console.log(rows);
          let listOfStudents = [];
          for (let i = 0; i < rows.length; i++) {
            listOfStudents.push(rows[i].students);
          }
          res.send({ recipients: listOfStudents });
        }
      );
    }
  }
};
