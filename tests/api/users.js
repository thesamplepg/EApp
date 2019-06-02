const { expect } = require('chai');
const request = require('supertest');
const database = require('../../database');
const app = require('../../app');

describe('Users api test', () => {
    before(done => {
        database.connect()
            .then(() => done())
            .catch(err => done(err));
    });

    after(done => {
        database.disconnect()
            .then(() => done())
            .catch((err) => done(err));
    });

    describe('/api/signup', () => {

        it('should create a new user and push to database', done => {
            const user = {
                fullName: 'Aktan',
                email: 'aktan@gmail.com',
                userName: 'aktanpg',
                password: 'password'
            }

            request(app)
                .post('/api/users/signup')
                .send(user)
                .then(res => {
                    expect(res).to.contain.property("_id");
                    
                    delete res._id;
                    expect(res).to.deep.equal(user);

                    done();
                })
                .catch(err => done(err));
        });
    });
});
