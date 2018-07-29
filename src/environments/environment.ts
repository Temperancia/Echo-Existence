// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { PostType } from '../app/core/enums/post-type.enum';

export const environment = {
  production: false
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
