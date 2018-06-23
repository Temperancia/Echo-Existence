import { Router } from 'express';
import { Types } from 'mongoose';
import { Post } from './../models/post';
import { User } from './../models/user';

let posting = Router();

posting.post('/posts/create', async (req, res) => {
  const post = req.body.post;
  const newPost = {
    _id: new Types.ObjectId,
    originType: post.originType,
    originName: post.originName,
    postType: post.postType,
    content: post.content,
    author: req.decoded.id,
    reputation: {
      upvotes: 0,
      downvotes: 0
    },
    createdOn: Date.now()
  };
  console.log('new Post :', newPost);
  try {
    await Post.create(newPost);
    return res.json({});
  } catch(err) {
    return res.status(500).json('Error while creating post');
  }
});

posting.get('/posts/get', async (req, res) => {
  const type = req.query.type;
  const user = req.query.user;
  let posts;
  try {
    if (type) {
      if (type === 'Flux') {
        posts = await findPostsFromFluxes(req.query.origin.split(' '));
      } else if (type === 'Trust') {
        posts = await findPostsFromTrust(req.query.origin);
      }
    } else if (user) {
      posts = await findPostsFromUser(user);
    }
    return res.json(posts);
  } catch(err) {
    return res.status(500).json('Error while finding posts');
  }
});

posting.get('/post/:postId/upvote', async (req, res) => {
  const error = await vote(req.decoded.id, req.params.postId, 1)
  return error ? res.status(500).json(error) : res.json({});
});

posting.get('/post/:postId/downvote', async (req, res) => {
  const error = await vote(req.decoded.id, req.params.postId, -1);
  return error ? res.status(500).json(error) : res.json({});
});

async function vote(voterId: string, postId: string, coefficient: number): Promise<string> {
  try {
    const post = await Post.findById(postId)
    .select('originType originName author reputation');
    if (post.author.equals(voterId)) {
      throw 'Cannot upvote your own post';
    }
    if (post.reputation.voters.find(voter => { return voter.equals(voterId); })) {
      return 'Cannot upvote anymore';
    }
    let updateThisPost = {
      $push: {'reputation.voters': voterId},
    };
    coefficient === 1
    ? updateThisPost['$inc'] = {'reputation.upvotes': 1}
    : updateThisPost['$inc'] = {'reputation.downvotes': 1};
    Post.findByIdAndUpdate(postId, updateThisPost).exec();
    if (post.originType === 'Flux') {
      await User.findByIdAndUpdate(post.author, {
        $set: {'reputation.refresh': true}
      });
    } else {
      console.log('refresh trust rep on next', post.author, post.originName)
      await User.update({_id: post.author, 'trustReputation.trust': post.originName}, {
        $set: {'trustReputation.$.refresh': true}
      });
    }
    return undefined;
  } catch(err) {
    return 'Error while finding post : ' + err;
  }
}

function findPostsFromFluxes(fluxes: string): Promise<any> {
  const filter = {
    originType: 'Flux',
    originName: {$in: fluxes}
  };
  return Post.find(filter)
  .select('originName postType content createdOn reputation')
  .populate('author', 'fullName reputation');
}

function findPostsFromUser(user: string): Promise<any> {
  return Post.find({author: user})
  .select('originType originName postType content createdOn reputation');
}

async function findPostsFromTrust(trustKey: string): Promise<any> {
  const filter = {
    originType: 'Trust',
    originName: trustKey
  };
  return await Post.find(filter)
  .select('postType content createdOn reputation')
  .populate('author', 'fullName reputation');
}

module.exports = posting;
