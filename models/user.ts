import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  type: {
    type: String,
    enum: ['Moderator', 'Public', 'Eminent'],
  },
  firstName: String,
  lastName: String,
  userName: String,
  fullName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  reputation: {
    refresh: Boolean,
    score: Number,
    rank: Number,
    tags: [{
      name: String,
      refresh: Boolean,
      score: Number,
      rank: Number
    }]
  },
  trustReputation: [{
    trust: String,
    refresh: Boolean,
    score: Number,
    rank: Number
  }],
  history: {
    flux: [String],
    trusts: [String]
  },
  birth: Date,
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  trustsOwned: [{
    type: Schema.Types.ObjectId,
    ref: 'Trust'
  }],
  trustsJoined: [{
    type: Schema.Types.ObjectId,
    ref: 'Trust'
  }],
  friendsRequested: [Schema.Types.ObjectId],
  friendsRequesting: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  trustRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'Trust'
  }],
  trustInvitations: [{
    type: Schema.Types.ObjectId,
    ref: 'Trust'
  }],
  password: String,
  createdOn: Date,
  updatedOn: {
    type: Date,
    default: Date.now
  },
});
export const User = model('User', userSchema);
