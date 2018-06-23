import { job } from 'cron';
import { User } from './models/user';
import { Post } from './models/post';

function reputationCalculation() {
  console.log('ok');
  User.find({'reputation.refresh': true})
  .select('reputation')
  .then(users => {
    for (const user of users) {
      Post.find({author: user._id})
      .select('reputation')
      .then(posts => {
        const upvotes = posts.map(post => post.reputation.upvotes);
        const downvotes = posts.map(post => post.reputation.downvotes);
        const upvoteSum = upvotes.reduce((a, b) => a + b, 0);
        const downvoteSum = downvotes.reduce((a, b) => a + b, 0);
        const score = upvoteSum + downvoteSum;
        const rank = (score === 0
          ? 0
          : upvoteSum > downvoteSum
            ? Math.trunc(Math.log(score))
            : Math.trunc(Math.log(score)) * -1
        );
        console.log(user._id, score, rank);
        User.findByIdAndUpdate(user._id, {
          $set: {
            'reputation.refresh': false,
            'reputation.score': score,
            'reputation.rank': rank
          }
        }).exec();
      });
    }
  });
  User.find({'trustReputation.refresh': true})
  .select('trustReputation')
  .then(users => {
    for (const user of users) {
      for (const trustReputation of user.trustReputation) {
        if (trustReputation.refresh) {
          Post.find({author: user._id, originType: 'Trust', originName: trustReputation.trust})
          .select('reputation')
          .then(posts => {
            const upvotes = posts.map(post => post.reputation.upvotes);
            const downvotes = posts.map(post => post.reputation.downvotes);
            const upvoteSum = upvotes.reduce((a, b) => a + b, 0);
            const downvoteSum = downvotes.reduce((a, b) => a + b, 0);
            const score = upvoteSum + downvoteSum;
            const rank = (score === 0
              ? 0
              : upvoteSum > downvoteSum
                ? Math.trunc(Math.log(score))
                : Math.trunc(Math.log(score)) * -1
            );
            console.log(user._id, score, rank);
            User.update({_id: user._id, 'trustReputation.trust': trustReputation.trust}, {
              $set: {
                'trustReputation.$.refresh': false,
                'trustReputation.$.score': score,
                'trustReputation.$.rank': rank
              }
            }).exec();
          });
        }
      }
    }
  });
  console.log('done');
}

job('0 0 * * * *', reputationCalculation, null, true, null, null, true);
