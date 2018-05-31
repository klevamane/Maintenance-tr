import chaiHttp from 'chai-http';
import chai from 'chai';
import app from './../../app';

const { expect } = chai;
chai.use(chaiHttp);
describe('POST USER REQUEST FILE', () => {
  it('Not Implemented', (done) => {
    chai.request(app)
      .get('/api/v1/auth/not')
      .end((err, res) => {
        expect(res).to.have.status(501);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Not Implemented', (done) => {
    chai.request(app)
      .get('/api/v1/user/1')
      .end((err, res) => {
        expect(res.body.message).to.equal('Something went wrong');
        expect(res).to.have.status(501);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
