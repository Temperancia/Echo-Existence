import { User } from './../models/user';
import { request, userA, userB } from './config';

export async function create(user): Promise<any> {
  const res = await request.post('/api/authentication/user/create')
  .send({
    user: {
      type: 'Public',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }
  });
  user.id = res.body.id;
  user.token = res.body.token;
  return res;
}

export async function login(user): Promise<any> {
  const res = await request.post('/api/authentication/user/login')
  .send({
    email: user.email,
    password: user.password
  });
  user.id = res.body.id;
  user.token = res.body.token;
  return res;
}

let res;
describe('Authentication', () => {
  before(async () => {
    await User.remove({});
  });
  describe('Expected behaviour', () => {
    describe('/user/create', () => {
      it('it should create users', async () => {
        res = await create(userA);
        res.should.have.status(200);
        res.body.should.have.property('id');
        res.body.should.have.property('token');
        res = await create(userB);
        res.should.have.status(200);
        res.body.should.have.property('id');
        res.body.should.have.property('token');
      });
    });
    describe('/user/login', () => {
      it('it should log in', async () => {
        res = await login(userA);
        res.should.have.status(200);
        res.body.should.have.property('id');
        res.body.should.have.property('token');
      });
    });
  });
});
