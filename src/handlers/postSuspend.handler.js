const db = require("../db");
module.exports = {
  postSuspend: (req, res) => {

        let student = req.body.student;

        if(typeof student === "undefined"){
          return res.status(400).send({
            message: "Student  is undefined",
          });
        }

        if (typeof student !== "string" || student.length < 1) {
        return res.status(400).send({
            message: "please enter valid student email",
        });
        }
        
        db.query(`UPDATE Register SET suspend_bool = true WHERE students = ?`,student, function(err,rows){
                if (err) {
                  return res.status(400).send({
                    message: err,
                  });
                }
                
                if(rows.affectedRows === 0){ //if the student doesnt exist in the table
                  return res.status(404).send({
                    message: "Could not find any student",
                  });
                }else{
                  if(rows.changedRows === 0){  // already update
                    return res.status(404).send({
                      message: "student already suspended",
                    });                    
                  }
                }
                
                res.sendStatus(204)
                res.end()
        })
  },
};
