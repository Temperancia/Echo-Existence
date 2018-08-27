import { PostType } from '../app/core/enums/post-type.enum';

export const environment = {
  production: true
};

export const postReplies: any = {
  [PostType.Echo]: {
    positive: [
      'Interesting',
      'Nice'
    ],
    negative: [
      'Meh',
      'So what ...'
    ]
  },
  [PostType.Rumour]: {
    positive: [
      'Indeed',
      'Perhaps'
    ],
    negative: [
      'Unlikely',
      'Phony'
    ]
  },
  [PostType.Inquiry]: {
    positive: [
      'Curious',
      'Good Question'
    ],
    negative: [
      'Dull',
      'Another time'
    ]
  },
  [PostType.Outrage]: {
    positive: [
      'Concur',
      'Well said'
    ],
    negative: [
      'Oppose',
      'Vile'
    ]
  }
};
