import winston from 'winston';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';
// import Users from './../models/user';

const { expect } = chai;
chai.use(chaiHttp);

let authenticationToken;
let secondAuthenticationToken;

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
        winston.info('Authoken after added');
        winston.info(authenticationToken);
        expect(res.body.message).to.equal('User has been authenticated');
        expect(res).to.have.status(202);
        expect(res.body).to.be.a('object');
        done();
      });
  });


  it('Get all requests of a logged in user', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .set('authorization', `Bearer ${authenticationToken}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('Displaying user requests');
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Get a by Id requests of a logged in user', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/2')
      .set('authorization', `Bearer ${authenticationToken}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('Request found');
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Should return request not found', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/20')
      .set('authorization', `Bearer ${authenticationToken}`)
      .end((err, res) => {
        expect(res.body.error).to.equal('Request not found');
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });


  it('User request has been modified', (done) => {
    const request = {
      fault: 'Broken Screen',
      brand: 'LGG',
      modelNumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .put('/api/v1/users/requests/2')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.message).to.equal('Request has been modified');
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('User request has been modified', (done) => {
    const request = {
      fault: 'Broken Screen',
      brand: 'LGG',
      modelNumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.message).to.equal('You are Unauthorized to edit this request');
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('New request created', (done) => {
    const request = {
      fault: 'Broken Screen',
      brand: 'LGG',
      modelNumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.message).to.equal('Request has been sent');
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('User Unaunthorized to edit request', (done) => {
    const request = {
      fault: 'Broken Screen',
      brand: 'LGG',
      modelNumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.message).to.equal('You are Unauthorized to edit this request');
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Request to be modified does not exist', (done) => {
    const request = {
      fault: 'Broken Screen',
      brand: 'LGG',
      modelNumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .put('/api/v1/users/requests/7')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.message).to.equal('Bad request');
        expect(res).to.have.status(403);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});


// User 2
describe('POST USER REQUEST FILE', () => {
  // doBeforeAll();
  it('Should Authenticate user for request', (done) => {
    const user = {
      email: 'scriptuser@ymail.com',
      password: 'password123',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        secondAuthenticationToken = res.body.token;
        expect(res.body.message).to.equal('User has been authenticated');
        expect(res).to.have.status(202);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Get all requests of a logged in user', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .set('authorization', `Bearer ${secondAuthenticationToken}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('No request for this user');
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});