import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { config as AWSConfig } from 'aws-sdk';

AWSConfig.update({
  region: process.env.AWS_COGNITO_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: String(process.env.USER_POOL_ID),
    userPoolClientId: String(process.env.USER_POOL_CLIENT_ID),
  },
};

export const userPool = new CognitoUserPool({
  UserPoolId: String(process.env.USER_POOL_ID),
  ClientId: String(process.env.USER_POOL_CLIENT_ID),
});

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
