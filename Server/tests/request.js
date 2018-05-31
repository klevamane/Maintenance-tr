import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';

const { expect } = chai;
chai.use(chaiHttp);

let authenticationToken;

describe('REQUEST FILE', () => {
  it('Should Authenticate user for request', (done) => {
    const user = {
      email: 'exampleusertwo@user.com',
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

  it('fault should contain only Alphabets and numbers', (done) => {
    const request = {
      fault: 'Broken %& @',
      brand: 'LGG',
      modelnumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('fault should contain only Alphabets and numbers');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Brand should contain only Alphabets and numbers', (done) => {
    const request = {
      fault: 'Broken mouthpiece',
      brand: 'L&# @!',
      modelnumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Brand should contain only Alphabets and numbers');
        expect(res.body).to.be.a('object');
        done();
      });
  });


  it('Description should contain only Alphabets and numbers', (done) => {
    const request = {
      fault: 'Broken mouthpiece',
      brand: 'Lenovo',
      modelnumber: '77263',
      description: 'descri@#ption ^'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Description should contain only Alphabets and numbers');
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('Model number should contain only Alphabets and numbers', (done) => {
    const request = {
      fault: 'Broken mouthpiece',
      brand: 'Lenovo',
      modelNumber: '77263* @!#@ ^',
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.error).to.equal('Model number should contain only Alphabets and numbers');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('New request created', (done) => {
    const request = {
      fault: 'Broken Screen',
      brand: 'LGG',
      modelnumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Request has been created');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('It should create a request', (done) => {
    const request = {
      fault: 'Camera',
      brand: 'LG',
      modelnumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Request has been created');
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


  it('Get request by Id requests of a logged in user', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1')
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
      .get('/api/v1/users/requests/90')
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
      .put('/api/v1/users/requests/10')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.message).to.equal('You are Unauthorized to edit this request');
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
