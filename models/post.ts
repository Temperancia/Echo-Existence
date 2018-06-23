import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  _id: Schema.Types.ObjectId,
  originType: {
    type: String,
    enum: ['Trust', 'Flux'],
  },
  originName: String,
  postType: {
    type: String,
    enum: ['Echo', 'Rumour', 'Inquiry', 'Outrage']
  },
  content: String,
  author: {
     type: Schema.Types.ObjectId,
     ref: 'User'
  },
  reputation: {
    upvotes: Number,
    downvotes: Number,
    voters: [Schema.Types.ObjectId]
  },
  reports: Number,
  createdOn: Date,
  updatedOn: {
    type: Date,
    default: Date.now
   }
});
export const Post = model('Post', postSchema);
