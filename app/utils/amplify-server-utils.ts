import { createServerRunner } from '@aws-amplify/adapter-nextjs';

import { authConfig } from '@/lib/amplify-cognito-config';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});
