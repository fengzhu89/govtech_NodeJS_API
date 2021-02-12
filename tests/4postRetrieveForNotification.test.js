const request = require('supertest');
const { end } = require('../src/db');
const app = require('../src/app')();


describe('Testing POST /api/retrievefornotifications', () =>{
    it('Should respond with a HTTP 400 when invalid request body is sent', (done) => {
        request(app)
            .post('/api/retrievefornotifications')
            .send({ invalid: true })
            .expect(400, done)
    });

    it('Should respond with a HTTP 200 and the reqcipients who is not suspended when no mention @ request is sent', (done) => {
        request(app)
            .post('/api/retrievefornotifications')
            .send({
                "teacher":  "teacherjoe@gmail.com",
                "notification": "Hey everybody"
              })
            .expect(200, {
                "recipients":
                  [
                    "commonstudent1@gmail.com",  // student_only_under_joe@gmail.com was supended
                  ]   
              },done)
    });

    it('Should respond with a HTTP 200 and the reqcipients who is not suspended when mention @ request is sent', (done) => {
        request(app)
            .post('/api/retrievefornotifications')
            .send({
                "teacher":  "teacherken@gmail.com",
                "notification": "Hey everybody @student_only_under_joe@gmail.com @studentOne@gmail.com"
              })
            .expect(200, {
                "recipients":
                  [
                    "studentOne@gmail.com",
                    "commonstudent1@gmail.com",  
                    "student_only_under_ken@gmail.com"// student_only_under_joe@gmail.com was supended
                  ]   
              },done)
    });
    
})