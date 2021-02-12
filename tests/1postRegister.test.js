// const { before } = require('mocha');
const request = require('supertest');
// const { end } = require('../src/db');
const app = require('../src/app')();
const db = require("../src/db");


const createTableSchema = `
        CREATE TABLE IF NOT EXISTS Register (
          id INT AUTO_INCREMENT,
          teacher varchar(255) NOT NULL,
          students varchar(255) NOT NULL,
          suspend_bool boolean NOT NULL DEFAULT false,
          PRIMARY KEY (id)
        );
    `;

describe('Testing POST /api/register', () => {

    before(()=>{
        db.query("DROP TABLE IF EXISTS `Register`", function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
      });

        let sql = createTableSchema;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
    })

    it('Should respond with a HTTP 400 when invalid request body is sent', (done) => {
        request(app)
            .post('/api/register')
            .send({ invalid: true })
            .expect(400, done)
    });


    it('Should respond with a HTTP 204 when valid request is sent',  (done) => {
       request(app)
          .post('/api/register')
          .send({
            teacher: 'teacherNew@gmail.com',
            students: [
              'studentOne@gmail.com',
              'studentTwo@gmail.com',
            ],
          })
          .expect(204,done);
      }); 

      it('Should respond with a HTTP 204 when valid request is sent for furture test 1',  (done) => {
        request(app)
           .post('/api/register')
           .send({
            teacher: "teacherken@gmail.com",
            students: ["commonstudent1@gmail.com","student_only_under_ken@gmail.com"]
          })
           .expect(204,done);
       });
       it('Should respond with a HTTP 204 when valid request is sent for furture test 1',  (done) => {
        request(app)
           .post('/api/register')
           .send({
            teacher: "teacherjoe@gmail.com",
            students: ["commonstudent1@gmail.com","student_only_under_joe@gmail.com"]
          })
           .expect(204,done);
       });

})