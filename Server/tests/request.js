import winston from 'winston';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';
// import Users from './../models/user';

const { expect } = chai;
chai.use(chaiHttp);

let authenticationToken;
let loggedInUserId;

// const doBeforeAll = () => {
//   before(() => {
//     const user = {
//       email: 'oniadekan@gmail.com',
//       password: 'password123',
//     };
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         expect(res.body.message).to.equal('User has been authenticated');
//         expect(res).to.have.status(202);
//       });
//   });
// };


describe('POST USER REQUEST FILE', () => {
  // doBeforeAll();
  it('Should Authenticate user for request', (done) => {
    const user = {
      email: 'oniadekan@gmail.com',
      password: 'password123',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        authenticationToken = res.body.token;
        expect(res.body.message).to.equal('User has been authenticated');
        expect(res).to.have.status(202);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Create new request for a user', (done) => {
    before(() => {
      const user1 = {
        email: 'oniadekan@gmail.com',
        password: 'password123',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user1)
        .end((err, res) => {
          expect(res.body.message).to.equal('User has been authenticated');
          expect(res).to.have.status(202);
        });
    });
    winston.info(`This is the user ID: ${loggedInUserId}`);
    winston.info(`This is the user AuthTOken: ${authenticationToken}`);
    const user = {
      fault: 'Broken Screen',
      brand: 'LG',
      modelNumber: '77263',
      // user: loggedInUserId,
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('Request has been sent');
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Get all requests of a logged in user', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .end((err, res) => {
        winston.info(`GET ALL USER REQ ${authenticationToken}`);
        expect(res.body.message).to.equal('Displaying user requests');
        expect(res).to.have.status(302);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
