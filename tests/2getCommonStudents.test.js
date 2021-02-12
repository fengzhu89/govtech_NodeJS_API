const request = require('supertest');
const { end } = require('../src/db');
const app = require('../src/app')();


describe('Testing GET /api/commonstudents', () =>{

    it('Should respond with a HTTP 400 when no query body is sent', (done)=>{
        request(app)
            .get('/api/commonstudents')
            .expect(400,done)
    })

    it('Should respond with a HTTP 400 when invalid query body is sent', (done)=>{
        request(app)
            .get('/api/commonstudents')
            .query({ invalid: true})
            .expect(400,done)
    })
    
    it('Should return an list of students under one teacher',(done)=>{
          request(app)
                .get('/api/commonstudents')
                .query({ teacher: 'teacherken@gmail.com' })
                .expect(200,{students:['commonstudent1@gmail.com','student_only_under_ken@gmail.com']},done)
    })

    it('Should return an list of commmon tudents for teachers',(done)=>{
        request(app)
              .get('/api/commonstudents')
              .query({ teacher: ['teacherken@gmail.com','teacherjoe@gmail.com'] })
               .expect(200,{students:['commonstudent1@gmail.com']},done)
    })

    it('Should return an empty list no common student',(done)=>{
        request(app)
              .get('/api/commonstudents')
              .query({ teacher: ['teacherken@gmail.com','teacherNew@gmail.com'] })
               .expect(200,[],done)
    })

})