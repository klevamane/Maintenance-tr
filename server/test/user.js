import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';
// import Users from './../models/user';


const { expect } = chai;
chai.use(chaiHttp);

process.env.NODE_ENV = test;

// CREATE
describe('POST USER /user', () => {
  // runBeforeAll();
  // doBeforeEach();
  it('should create a new user', (done) => {
    const user = {
      firstname: 'Bestman',
      email: 'email@email.com',
      lastname: 'Jonji',
      mobile: '08025773821',
      password: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('User has been registered');
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Mobile number should be of nigerian format', (done) => {
    const user = {
      firstname: 'Bestman',
      email: 'email@email.com',
      lastname: 'Jonji',
      mobile: '',
      password: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.error).to.equal('Mobile number must be in Nigerian Format');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Lastname must contain only alphabets', (done) => {
    const user = {
      firstname: 'Bestman',
      email: 'email@email.com',
      lastname: '',
      mobile: '08025785342',
      password: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.error).to.equal('lastname must contain only alphabets');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('You must provide a valid email address', (done) => {
    const user = {
      firstname: 'Bestman',
      email: 'email',
      lastname: 'Kevin',
      mobile: '08025785342',
      password: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.error).to.equal('You must provide a valid email address');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });


  it('Firstname must contain only alphabets', (done) => {
    const user = {
      firstname: 'Kevin77',
      email: 'userone@email.com',
      lastname: 'Kevin',
      password: 'password123'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.error).to.equal('firstname must contain only alphabets');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Password must be between 6-15 characters', (done) => {
    const user = {
      firstname: 'Kevin',
      email: 'userone@email.com',
      lastname: 'Kevin',
      password: 'pas'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.error).to.equal('Password must be between 6-15 characters');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Enter password less than 16 characters', (done) => {
    const user = {
      firstname: 'Kevin',
      email: 'userone@email.com',
      lastname: 'Kevin',
      password: 'paslore10ipsumloremsom'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.error).to.equal('Password must be between 6-15 characters');
        expect(res).to.have.status(400);
        done();
      });
  });


  it('lastname must contain only alphabets', (done) => {
    const user = {
      firstname: 'firstname',
      email: 'userone@email.com',
      lastname: 'Peti675',
      password: 'newpassword',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('lastname must contain only alphabets');
        done();
      });
  });
});
