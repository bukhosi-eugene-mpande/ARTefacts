import { createHmac } from 'crypto';

import { redirect } from 'next/navigation';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

import { getErrorMessage } from '@/app/utils/get-error-message';

// grab all the constant variables from the user pool
const CLIENT_SECRET = String(process.env.NEXT_PUBLIC_CLIENT_SECRET);
const CLIENT_ID = String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID);
const USER_POOL_ID = String(process.env.NEXT_PUBLIC_USER_POOL_ID);

function getSecretHash(username: string): string {
  const hasher = createHmac('sha256', CLIENT_SECRET);

  hasher.update(`${username}${CLIENT_ID}`);

  return hasher.digest('base64');
}

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const username = String(formData.get('username')); // Use username explicitly
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const secretHash = getSecretHash(username);

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

    redirect('/login');
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleSignOut() {
  // Still needs working on
  try {
    // Example: Clear session or token from storage
    redirect('/login');
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
  const username = String(formData.get('email'));
  const password = String(formData.get('password'));
  const secretHash = getSecretHash(username);

  const cognito = new CognitoIdentityServiceProvider();

  try {
    const authResponse = await cognito
      .adminInitiateAuth({
        UserPoolId: USER_POOL_ID,
        ClientId: CLIENT_ID,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: {
          USERNAME: username,
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
  refreshToken: string
): Promise<AuthResult | string> {
  const cognito = new CognitoIdentityServiceProvider();

  try {
    const refreshResponse = await cognito
      .adminInitiateAuth({
        UserPoolId: USER_POOL_ID,
        ClientId: CLIENT_ID,
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      })
      .promise();

    return refreshResponse.AuthenticationResult || 'Token refresh failed';
  } catch (error) {
    return getErrorMessage(error);
  }
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
