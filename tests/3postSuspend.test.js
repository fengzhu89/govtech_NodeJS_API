const request = require('supertest');
const { end } = require('../src/db');
const app = require('../src/app')();


describe('Testing POST /api/suspend', () =>{
    it('Should respond with a HTTP 400 when invalid query body is sent', (done)=>{
        request(app)
            .post('/api/suspend')
            .send({ invalid: true})
            .expect(400,done)
    })

    it('Should respond with a HTTP 204 when valid query body is sent',(done)=>{
        request(app)
            .post('/api/suspend')
            .send({student:'student_only_under_joe@gmail.com'})
            .expect(204,done)
    })

    it('Should respond with HTTP 404 with message "student already suspended"',(done)=>{
        request(app)
            .post('/api/suspend')
            .send({student:'student_only_under_joe@gmail.com'})
            .expect(404,{message: "student already suspended"},done)
    })

    it('Should respond with a HTTP 404 with message "could not find any student" when the query student is not in the DB',(done)=>{
        request(app)
            .post('/api/suspend')
            .send({student:'student_not_exist@gmail.com'})
            .expect(404,{message: "Could not find any student"},done)
    })
    

})