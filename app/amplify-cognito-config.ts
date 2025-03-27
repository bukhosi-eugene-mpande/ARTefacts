import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { config as AWSConfig } from 'aws-sdk';

AWSConfig.update({
  region: String(process.env.NEXT_PUBLIC_AWS_COGNITO_REGION),
});

export const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
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
