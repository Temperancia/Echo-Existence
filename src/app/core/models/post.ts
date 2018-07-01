export class Post {
  _id: string;
  originType: string;
  originName: string;
  postType: string;
  owner: string;
  content: string;
  type: string;
  createdOn: string;
  reputation: {
    upvotes: number,
    downvotes: number
  };
  votes: [{
    voter: string,
    positive: Boolean,
    voteType: Number
  }];
  vote: {
    positive: Boolean,
    voteType: Number
  };
  /*
  constructor(id, name, content, createdOn, reputation) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.createdOn = createdOn;
    this.reputation = reputation;
  }
  */
}
