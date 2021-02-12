const { restart } = require("nodemon");
const db = require("../db");

module.exports = {
  getCommonStudents: (req, res) => {

    let teacher = req.query.teacher;

    if(typeof teacher === "undefined"){
      return res.status(400).send({
        message: "Teacher  is undefined",
      });
    }

   
      let value = ''
      let lenofTeacher = 0 //number of teachers in the query
      if( typeof teacher === 'string'){
        value = "'"+teacher+"'";
        lenofTeacher = 1
        
      }else{
        lenofTeacher = teacher.length
        for(let i = 0; i<lenofTeacher; i++){
          value = value + ", '" + teacher[i] + "'";
        }
        value = value.slice(1)
      }
  

      db.query(
        `select students from Register where teacher IN (${value}) GROUP BY students HAVING COUNT(students)=?`,lenofTeacher,
        function (err, rows) {
          if (err) {
            return res.status(400).send({
              message: err,
            });
          }
          if (rows.length === 0) {
            return res.status(200).send([]);
          }

          let listOfStudents = [];
          for (let i = 0; i < rows.length; i++) {
            listOfStudents.push(rows[i].students);
          }
          res.send({ students: listOfStudents });
        });
    
  },
};
