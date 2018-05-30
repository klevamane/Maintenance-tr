import chaiHttp from 'chai-http';
import chai from 'chai';
import winston from 'winston';
import app from './../../app';
// import Users from './../models/user';

const { expect } = chai;
chai.use(chaiHttp);

let adminAuthToken;

describe('ADMIN CONTROLLER', () => {
  // doBeforeAll();
  it('Should Authenticate Admin user', (done) => {
    const user = {
      email: 'admin@gmx.com',
      password: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        adminAuthToken = res.body.token;
        expect(res.body.message).to.equal('User has been authenticated');
        expect(res).to.have.status(202);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Should return Request does not exist', (done) => {
    winston.info(`ADMIN USER TOKEN ${adminAuthToken}`);
    chai.request(app)
      .put('/api/v1/requests/500/approve')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('The request does not exist');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Should return Bad request', (done) => {
    winston.info(`ADMIN USER TOKEN ${adminAuthToken}`);
    chai.request(app)
      .put('/api/v1/requests/@/approve')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Bad request');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Request has been approved', (done) => {
    winston.info(`ADMIN USER TOKEN ${adminAuthToken}`);
    chai.request(app)
      .put('/api/v1/requests/1/approve')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Request has been approved');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Request already approved', (done) => {
    winston.info(`ADMIN USER TOKEN ${adminAuthToken}`);
    chai.request(app)
      .put('/api/v1/requests/1/approve')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('The request has already been approved');
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
