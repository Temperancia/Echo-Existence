export class Post {
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
