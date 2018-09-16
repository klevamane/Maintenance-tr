import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';

const { expect } = chai;
chai.use(chaiHttp);

let authenticationToken;
let newRequestId;
let newlycreateduser;
let initialAdminToken;

/** *******************************
 * USER
 * ****************************** */
describe('POST USER /user', () => {
  it('should create a new user ****', (done) => {
    const user = {
      firstname: 'kleventh',
      email: 'exampleusertwo@user.com',
      lastname: 'Jonji',
      mobile: '08025912897',
      password: 'password123',
      password2: 'password123'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        newlycreateduser = res.body.user;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User has been registered');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('should require confirm password to match the password', (done) => {
    const user = {
      firstname: 'kleventh',
      email: 'exampleuserfive@user.com',
      lastname: 'Jonji',
      mobile: '08025912877',
      password: 'password123',
      password2: 'password123ss',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        console.log(res.body);
         console.log(res.body.errors);
        expect(res.body.errors.password2).to.equal('Passwords dont match');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  // ADMIN LOGIN TO TEST NO REQUESTS FOR ALL USERS

  it('Should Authenticate Admin user', (done) => {
    const user = {
      email: 'admin@gmx.com',
      password: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        initialAdminToken = res.body.token;
        expect(res.body.message).to.equal('User has been authenticated');
        expect(res).to.have.status(202);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  // GET ALL USERS REQUESTS
  it('Unable to Get all requests of a logged in user', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('authorization', `Bearer ${initialAdminToken}`)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.error).to.equal('No request found');
        expect(res).to.have.status(404);
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
      password: 'password123',
      password2: 'password123'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.mobile).to.equal('Mobile number must be of nigerian format of 11 digits');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });


  it('Lastname must be between 2 and 30 characters', (done) => {
    const user = {
      firstname: 'Bestman',
      email: 'email@email.com',
      lastname: 'a',
      mobile: '08025785342',
      password: 'Password123',
      password2: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal('Lastname must be between 2 and 30 characters');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Lastname must be between 2 and 30 characters ******', (done) => {
    const user = {
      firstname: 'Bestman',
      email: 'email@email.com',
      mobile: '08025785342',
      password: 'Password123',
      password2: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal('Lastname must be between 2 and 30 characters');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Lastname must be between only alphabets', (done) => {
    const user = {
      firstname: 'Bestman1',
      lastname: 'last12323',
      email: 'email@email.com',
      mobile: '08025785342',
      password: 'Password123',
      password2: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.lastname).to.equal('Lastname must be only alphabets');
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
      password: 'password123',
      password2: 'Password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.errors.firstname).to.equal('Firstname must be only alphabets');
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
        expect(res.body.errors.password).to.equal('Password must be between 8 and 30 characters');
        expect(res).to.have.status(400);
        done();
      });
  });


  it('lastname must contain only alphabets', (done) => {
    const user = {
      firstname: 'firstname',
      email: 'userone@email.com',
      lastname: 'Peti675',
      password: 'password123',
      password2: 'password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.lastname).to.equal('Lastname must be only alphabets');
        done();
      });
  });
});

describe('POST USER /Login', () => {
  it('should create a new user +++', (done) => {
    const user = {
      firstname: 'kleventh',
      email: 'dbuser@test.com',
      lastname: 'Jonji',
      mobile: '08025912890',
      password: 'password123',
      password2: 'password123'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User has been registered');
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('POST USER /Login', () => {
  it('You must provide a valid email address', (done) => {
    const user = {
      email: 'manip@sns',
      password: 'sabhjkajsd'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.errors.email).to.equal('Email is invalid');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Email not in database', (done) => {
    const user = {
      email: 'adebroki@gmail.com',
      password: 'extremely'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.body.emaildoesnotexist).to.equal('Email does not exist');
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

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

  it('fault is required', (done) => {
    const request = {
      fault: '',
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
        expect(res.body.errors.fault).to.equal('The Fault field is required');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Brand is required', (done) => {
    const request = {
      fault: 'Broken mouthpiece',
      brand: '',
      modelnumber: '77263',
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.brand).to.equal('Brand is required');
        expect(res.body).to.be.a('object');
        done();
      });
  });


  it('Description should contain string', (done) => {
    const request = {
      fault: 'Broken mouthpiece',
      brand: 'Lenovo',
      modelnumber: '77263',
      description: 'This is the description proper'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('Model number should contain only Alphabets and numbers', (done) => {
    const request = {
      fault: 'Broken mouthpiece',
      brand: 'Lenovo',
      modelNumber: '',
      description: 'description'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.errors.modelnumber).to.equal('The model number is required');
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
        newRequestId = res.body.newRequest.id;
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
      .get(`/api/v1/users/requests/${newRequestId}`)
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
      .get('/api/v1/users/requests/300')
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
      .put(`/api/v1/users/requests/${newRequestId}`)
      .set('Authorization', `Bearer ${authenticationToken}`)
      .send(request)
      .end((err, res) => {
        expect(res.body.message).to.equal('Request has been modified');
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Check if user is an Admin - Non Admin user cannot access admin route', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('Authorization', `Bearer ${authenticationToken}`)
      .end((err, res) => {
        expect(res.body.error).to.equal('You are not authorized to access this page');
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});


/** ***********************
THIS IS THE ADMIN REQUES SECTION
*************************** */

let adminAuthToken;
// ADMIN LOGIN

describe('ADMIN CONTROLLER', () => {
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

  // APPROVE USERS REQUESTS

  it('Should return Request does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/requests/500/approve')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('The request does not exist');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Request has been approved', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${newRequestId}/approve`)
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Request has been approved');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Request already approved', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${newRequestId}/approve`)
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('The request has already been approved');
        expect(res.body).to.be.a('object');
        done();
      });
  });


  // DISAPPROVE A REQUEST
  it('Disapprove the user request', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${newRequestId}/disapprove`)
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Request has been rejected');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Cannot Approve a rejected request', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${newRequestId}/approve`)
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('The request has already been approved');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Invalid request Id paramerter', (done) => {
    chai.request(app)
      .put('/api/v1/requests/abcddassx/approve')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid request Id parameter');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('The request does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/requests/894.6/approve')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('The request does not exist');
        expect(res.body).to.be.a('object');
        done();
      });
  });


  // DELETE A USER BY ADMIN

  it('Should delete a user', (done) => {
    chai.request(app)
      .delete(`/api/v1/users/${newlycreateduser.id}/delete`)
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('The user has been deleted');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Unable to delete an already deleted user', (done) => {
    chai.request(app)
      .delete(`/api/v1/users/${newlycreateduser.id}/delete`)
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Unable to delete the user');
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Should Indicate unable delete a user', (done) => {
    chai.request(app)
      .delete(`/api/v1/users/${600}/delete`)
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('The delete operation was not successful');
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
