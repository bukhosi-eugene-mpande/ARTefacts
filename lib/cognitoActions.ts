import { createHmac } from 'crypto';

import { redirect } from 'next/navigation';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import axios from 'axios';
import { CognitoUser, CognitoRefreshToken } from 'amazon-cognito-identity-js';

import { getErrorMessage } from '@/app/utils/get-error-message';

import { userPool } from './amplify-cognito-config';

const CLIENT_SECRET = String(process.env.NEXT_PUBLIC_CLIENT_SECRET);
const CLIENT_ID = String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID);
const USER_POOL_ID = String(process.env.NEXT_PUBLIC_USER_POOL_ID);
const GOOGLE_CLIENT_ID = String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

function getSecretHash(username: string): string {
  const hasher = createHmac('sha256', CLIENT_SECRET);

  hasher.update(`${username}${CLIENT_ID}`);

  return hasher.digest('base64');
}

export async function handleGoogleCognitoLogin(accessToken: string) {
  try {
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const email = data.email;
    const secretHash = getSecretHash(email);
    const cognito = new CognitoIdentityServiceProvider();

    const result = await cognito
      .adminInitiateAuth({
        UserPoolId: USER_POOL_ID,
        ClientId: CLIENT_ID,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: accessToken,
          SECRET_HASH: secretHash,
        },
      })
      .promise();

    console.log('Cognito response:', result);

    return result.AuthenticationResult;
  } catch (err) {
    console.error('Cognito login failed:', err);
    throw err;
  }
}

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const username = String(formData.get('username')); // Use username explicitly
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const secretHash = getSecretHash(username);
  const name = String(formData.get('name'));
  const cognito = new CognitoIdentityServiceProvider();

  try {
    await cognito
      .signUp({
        ClientId: CLIENT_ID,
        Username: username,
        Password: password,
        SecretHash: secretHash,
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'name', Value: name },
          { Name: 'given_name', Value: username },
        ],
      })
      .promise();

    return 'success';
  } catch (error) {
    console.log('Error cognito signUp:', error);

    return getErrorMessage(error) as string;
  }
}

export async function handleConfirmSignUp(
  username: string,
  confirmationCode: string
) {
  const secretHash = getSecretHash(username);

  const cognito = new CognitoIdentityServiceProvider();

  try {
    await cognito
      .confirmSignUp({
        ClientId: CLIENT_ID,
        Username: username,
        SecretHash: secretHash,
        ConfirmationCode: confirmationCode,
      })
      .promise();

    redirect('/auth/login');
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleSignOut() {
  // Still needs working on
  try {
    // Example: Clear session or token from storage
    redirect('/auth/login');
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleResendSignUpCode(username: string) {
  const secretHash = getSecretHash(username);

  const cognito = new CognitoIdentityServiceProvider();

  try {
    await cognito
      .resendConfirmationCode({
        ClientId: CLIENT_ID,
        SecretHash: secretHash,
        Username: username,
      })
      .promise();

    return 'Confirmation code resent successfully';
  } catch (error) {
    return getErrorMessage(error);
  }
}

interface AuthResult {
  AccessToken?: string;
  IdToken?: string;
  RefreshToken?: string;
}

export async function handleSignIn(
  formData: FormData
): Promise<AuthResult | string> {
  const input = String(formData.get('email'));
  const password = String(formData.get('password'));
  const secretHash = getSecretHash(input);

  const cognito = new CognitoIdentityServiceProvider();

  try {
    const authResponse = await cognito
      .initiateAuth({
        ClientId: CLIENT_ID,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: input,
          PASSWORD: password,
          SECRET_HASH: secretHash,
        },
      })
      .promise();

    return authResponse.AuthenticationResult || 'Authentication failed';
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function refreshTokens(
  username: string,
  refreshToken: string
): Promise<AuthResult | string> {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  const refreshTokenObj = new CognitoRefreshToken({
    RefreshToken: refreshToken,
  });

  return new Promise((resolve) => {
    cognitoUser.refreshSession(refreshTokenObj, (err, session) => {
      if (err) {
        resolve(err.message || 'Token refresh failed');
      } else {
        const result = {
          AccessToken: session.getAccessToken().getJwtToken(),
          IdToken: session.getIdToken().getJwtToken(),
          RefreshToken: session.getRefreshToken().getToken(),
        };

        resolve(result);
      }
    });
  });
}

export async function handleAdminSignIn(
  username: string,
  password: string
): Promise<AuthResult | string> {
  const formData = new FormData();

  formData.append('email', username);
  formData.append('password', password);

  return await handleSignIn(formData);
}

export async function listUsers(): Promise<any[] | string> {
  const cognito = new CognitoIdentityServiceProvider();

  try {
    const users = await cognito
      .listUsers({ UserPoolId: USER_POOL_ID })
      .promise();

    return users.Users || [];
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function deleteUser(username: string): Promise<string> {
  const cognito = new CognitoIdentityServiceProvider();

  try {
    await cognito
      .adminDeleteUser({ UserPoolId: USER_POOL_ID, Username: username })
      .promise();

    return `User ${username} deleted successfully.`;
  } catch (error) {
    return getErrorMessage(error);
  }
}
