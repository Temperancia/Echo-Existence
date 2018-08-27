import { login, create } from './authentication';
import { request, userA, userB, trustA } from './config';
import { Trust } from '../models/trust';

export async function createTrust(owner, trust): Promise<any> {
  const res = await request.post('/api/trusting/trusts/create')
  .set('x-access-token', owner.token)
  .send({
    trust: {
      name: trust.name,
      description: trust.description
    }
  });
  trust.id = res.body._id;
  return res;
}

describe('Trusting : API tests', async () => {
  before(async () => {
    await Trust.remove({});
    await login(userA);
    await login(userB);
  });
  describe('/trusts/create', () => {
    it('it should create a trust', async () => {
      const res = await createTrust(userA, trustA);
      res.should.have.status(200);
      res.body.should.have.property('_id');
      res.body.should.have.property('name').eql(trustA.name);
      res.body.should.have.property('key').eql(trustA.key);
      res.body.should.have.property('description').eql(trustA.description);
      res.body.should.have.property('owner').eql(userA.id);
      res.body.should.have.property('moderators').eql([]);
      res.body.should.have.property('members').eql([]);
      res.body.should.have.property('policies').eql([]);
      res.body.should.have.property('reputation').eql(0);
      res.body.should.have.property('createdOn');
    });
  });
  describe('/trusts/get', () => {
    it('it should get all the trusts', async () => {
      const res = await request.get('/api/trusting/trusts/get')
      .set('x-access-token', userA.token);
      res.should.have.status(200);
      res.body.should.be.a('array');
    });
  });
  describe('/trust/:key/get', () => {
    it('it should get the trust data', async () => {
      const url = '/api/trusting/trust/' + encodeURIComponent(trustA.key) + '/get';
      const res = await request.get(url)
      .set('x-access-token', userA.token)
      res.should.have.status(200);
      res.body.should.have.property('name').eql(trustA.name);
      res.body.should.have.property('reputation');
      res.body.should.have.property('owner')
      res.body.owner.should.have.property('fullName').eql(userA.fullName);
      res.body.owner.should.have.property('reputation');
      res.body.should.have.property('moderators');
      res.body.should.have.property('members');
    });
  });
  /*
  describe('/trust/:trustId/requesting/send', () => {
    it('it should send and accept a trust request', async () => {
      let res;

      res = await request.get('/api/trusting/trust/' + trustA.id + '/requesting/send')
      .set('x-access-token', userB.token);
      res.should.have.status(200);

      res = await request.get('/api/user/requests')
      .set('x-access-token', userB.token);
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.include.something.that.deep.equals({
        _id: trustA.id,
        name: trustA.name,
        key: trustA.key,
        type: 'trustRequest'
      });
    });
  });
  */

});
