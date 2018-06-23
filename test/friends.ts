import { request, userA, userB } from './config';
import { login } from './authentication';

export async function getRequests(user) {
  return await request.get('/api/user/requests')
  .set('x-access-token', user.token);
}

export async function requestFriend(user, friend) {
  return await request.get('/api/friends/user/request/' + friend.id)
  .set('x-access-token', user.token);
}

export async function removeFriend(user, friend) {
  return await request.get('/api/friends/user/remove/' + friend.id)
  .set('x-access-token', user.token);
}

export async function getFriends(user) {
  return await request.get('/api/user/' + user.id + '/friends')
  .set('x-access-token', user.token);
}

let res;
describe('Friends', () => {
  before(async () => {
    await login(userA);
    await login(userB);
  });
  describe('Expected behaviour', () => {
    describe('/friends/user/request/:id', () => {
      it('it should send a friend request', async () => {
        res = await requestFriend(userA, userB);
        res.should.have.status(200);

        res = await getRequests(userA);
        res.should.have.status(200);
        res.body.should.include.something.that.deep.equals({
          _id: userB.id,
          fullName: userB.fullName,
          type: 'friendRequestSent'
        });

        res = await getRequests(userB);
        res.should.have.status(200);
        res.body.should.include.something.that.deep.equals({
          _id: userA.id,
          fullName: userA.fullName,
          type: 'friendRequestReceived'
        });
      });
    });
    describe('/friends/user/accept/:id', () => {
      it('it should accept a friend request', async () => {
        res = await request.get('/api/friends/user/accept/' + userA.id)
        .set('x-access-token', userB.token);
        res.should.have.status(200);

        res = await getRequests(userA);
        res.should.have.status(200);
        res.body.should.be.an('array').that.not.include.something.that.deep.equals({
          _id: userB.id,
          fullName: userB.fullName,
          type: 'friendRequestSent'
        });

        res = await getRequests(userB);
        res.should.have.status(200);
        res.body.should.be.an('array').that.not.include.something.that.deep.equals({
          _id: userA.id,
          fullName: userA.fullName,
          type: 'friendRequestReceived'
        });

        res = await getFriends(userA);
        res.should.have.status(200);
        res.body.should.be.an('array').that.containSubset([{
          _id: userB.id,
          fullName: userB.fullName
        }]);

        res = await getFriends(userB);
        res.should.have.status(200);
        res.body.should.be.an('array').that.containSubset([{
          _id: userA.id,
          fullName: userA.fullName
        }]);
      });
    });
    describe('/friends/user/remove/:id', () => {
      it('it should remove a friend', async () => {
        res = await removeFriend(userA, userB);
        res.should.have.status(200);

        res = await getFriends(userA);
        res.should.have.status(200);
        res.body.should.be.an('array').that.not.containSubset([{
          _id: userB.id,
          fullName: userB.fullName
        }]);

        res = await getFriends(userB);
        res.should.have.status(200);
        res.body.should.be.an('array').that.not.containSubset([{
          _id: userA.id,
          fullName: userA.fullName
        }]);
      });
    });
    describe('/friends/user/cancel/:id', () => {
      it('it should cancel a friend request', async () => {
        res = await requestFriend(userA, userB);
        res.should.have.status(200);

        res = await request.get('/api/friends/user/cancel/' + userB.id)
        .set('x-access-token', userA.token);
        res.should.have.status(200);

        res = await getRequests(userA);
        res.should.have.status(200);
        res.body.should.be.an('array').that.not.include.something.that.deep.equals({
          _id: userB.id,
          fullName: userB.fullName,
          type: 'friendRequestSent'
        });

        res = await getRequests(userB);
        res.should.have.status(200);
        res.body.should.be.an('array').that.not.include.something.that.deep.equals({
          _id: userA.id,
          fullName: userA.fullName,
          type: 'friendRequestReceived'
        });
      });
    });
    describe('/friends/user/refuse/:id', () => {
      it('it should refuse a friend request', async () => {
        res = await requestFriend(userA, userB);
        res.should.have.status(200);

        res = await request.get('/api/friends/user/refuse/' + userA.id)
        .set('x-access-token', userB.token);
        res.should.have.status(200);

        res = await getRequests(userA);
        res.should.have.status(200);
        res.body.should.be.an('array').that.not.include.something.that.deep.equals({
          _id: userB.id,
          fullName: userB.fullName,
          type: 'friendRequestSent'
        });

        res = await getRequests(userB);
        res.should.have.status(200);
        res.body.should.be.an('array').that.not.include.something.that.deep.equals({
          _id: userA.id,
          fullName: userA.fullName,
          type: 'friendRequestReceived'
        });
      });
    });
  });
});
