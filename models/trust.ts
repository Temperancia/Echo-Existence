import { Schema, model } from 'mongoose';

const trustSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true
  },
  key: {
    type: String,
    unique: true
  },
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  moderators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  invitations: [{
    invitor: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    invited: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  policies: [String],
  reputation: Number,
  createdOn: Date,
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
export const Trust = model('Trust', trustSchema);
