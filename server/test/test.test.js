const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Article = require('../models/article')
const Comment = require('../models/comment')

const user = {
    name: 'hadi nw',
    email: 'hadinw@mail.com',
    password: '123'
};

chai.use(chaiHttp)

describe('User Routes Test', () => {
    describe('User register test', () => {
        it('POST/users/register', (done) => {
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'hadi',
                    email: 'hadi@mail.com',
                    password: '123'
                })
                .end((err, res) => {
                    expect(res.body.message).to.be.a('string')
                    expect(res).to.have.status(201)
                    done()
                })
        })
    })

    describe('User Login test', () => {
        it('POST/users/login', (done) => {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'hadi@mail.com',
                    password: '123'
                })
                .end((err, res) => {
                    expect(res.body.message).to.be.a('string')
                    expect(res.body.message).equal('successfull login')
                    expect(res).to.have.status(200)
                    expect(res.body).to.haveOwnProperty('token')
                    expect(res.body).to.haveOwnProperty('message')
                    done()
                }) 
        })
    }) 
})





describe('Article Test', function() {
    before((done) => {
        User.create(user)
            .then(user => {                
                Article.deleteOne({title: 'test'})
                    .then(result => {
                        token = jwt.sign({
                            id: user._id, 
                            name: user.name,
                            email: user.email
                        }, process.env.JWT_SECRET);
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
            User.deleteOne({
                email: 'hadinw@mail.com'
            })
            .then(result => {
                Article.deleteOne({title: 'test'})
                    .then(article => {
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(function(err) {
                console.log(err);
            });
    });

        // article create
    it('should return 201 if created', (done) => {
        chai.request(app)
            .post('/articles')
            .set('token', token)
            .send({
                title: 'test',
                description: 'desc test'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('author');
                expect(res.body).to.have.property('createdAt');
                expect(res.body).to.have.property('updatedAt');
                done();
            });
    });

    it('should return status 400 if no token or no login', (done) => {
        chai.request(app)
            .post('/articles')
            .set({})
            .send({
                title: 'test agin',
                description: 'desc'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message')
                done();
            });
    });

        // get all artocle
    it('should return status 200 if get success', (done) => {
        chai.request(app)
            .get('/articles')
            .end((err, res) =>  {
                expect(res).to.have.status(200);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('description');
                expect(res.body[0]).to.have.property('author');
                done();
            });
    });
});