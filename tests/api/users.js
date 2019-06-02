const { expect } = require('chai');
const request = require('supertest');
const database = require('../../database');
const app = require('../../app');

describe('Users api test', () => {
    before(done => {
        database.connect()
            .then(() => {
              done()
            })
            .catch(err => {
              done(err)
            });
    });

    after(done => {
        database.disconnect()
            .then(() => done())
            .catch((err) => done(err));
    });

    describe('/api/signup', () => {

      const user = {
            fullName: 'Aktan',
            email: 'aktan@gmail.com',
            userName: 'aktanpg',
            password: 'password'
        }
        
        it('should create a new user and push to database', done => {
            request(app)
                .post('/api/users/signup')
                .send(user)
                .expect(200)
                .then(res => {
                    expect(res.body).to.contain.property('success');
                    done();
                })
                .catch(err => done(err));
        });

        it('should return json with error "already exists"', done => {
            request(app)
              .post('/api/users/signup')
              .send(user)
              .expect(400)
              .then(res => {
                expect(res.body.error).to.equal('user already exists');
                done();
              })
              .catch(err => done(err));
        });
    });
});
