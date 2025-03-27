import { Amplify, type ResourcesConfig } from 'aws-amplify';

export const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
    loginWith: {
      oauth: {
        domain: String(process.env.NEXT_PUBLIC_DOMAIN),
        scopes: [
          'openid',
          'email',
          'phone',
          'profile',
          'aws.cognito.signin.user.admin',
        ],
        redirectSignIn: ['http://localhost:300/', 'https://example.com/'],
        redirectSignOut: ['http://localhost:300/', 'https://example.com/'],
        responseType: 'code',
      },
    },
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
