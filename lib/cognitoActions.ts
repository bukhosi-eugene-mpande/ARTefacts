import { createHmac } from 'crypto';

import { redirect } from 'next/navigation';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { CognitoUser, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { getErrorMessage } from '@/app/utils/get-error-message';

import { userPool } from './amplify-cognito-config';

const CLIENT_SECRET = String(process.env.CLIENT_SECRET);
const NEXT_PUBLIC_CLIENT_ID = String(
  process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
);
const NEXT_PUBLIC_USER_POOL_ID = String(
  process.env.NEXT_PUBLIC_USER_POOL_IDUSER_POOL_ID
);

function getSecretHash(username: string): string {
  console.log(CLIENT_SECRET);
  const hasher = createHmac(
    'sha256',
    'ugjajg8vuhirjulbnr537r7fklb31cnh5d7jbss3kkpd7me5d3o'
  );

  hasher.update(`${username}${NEXT_PUBLIC_CLIENT_ID}`);

  return hasher.digest('base64');
}

const REGION = process.env.NEXT_PUBLIC_AWS_COGNITO_REGION!;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!;

/**
 * Sends a forgot password code to the user's email.
 */
export async function handleSendForgotPasswordCode(
  username: string
): Promise<string> {
  const secretHash = getSecretHash(username);

  try {
    const client = new CognitoIdentityProviderClient({
      region: REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new ForgotPasswordCommand({
      ClientId: NEXT_PUBLIC_CLIENT_ID,
      Username: username,
      SecretHash: secretHash,
    });

    await client.send(command);

    return 'Password reset code sent successfully.';
  } catch (error) {
    console.error('ForgotPassword error:', error);

    return 'Failed to send password reset code.';
  }
}

/**
 * Confirms a new password using the code from the user's email.
 */
export async function handleConfirmForgotPassword(
  username: string,
  code: string,
  newPassword: string
): Promise<string> {
  const secretHash = getSecretHash(username);

  try {
    const client = new CognitoIdentityProviderClient({
      region: REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new ConfirmForgotPasswordCommand({
      ClientId: NEXT_PUBLIC_CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
      Password: newPassword,
      SecretHash: secretHash,
    });

    await client.send(command);

    return 'Password has been successfully reset.';
  } catch (error: any) {
    const statusCode = error?.$metadata?.httpStatusCode;
    const errorType = error?.name;

    if (
      statusCode === 400 ||
      errorType === 'InvalidParameterException' ||
      errorType === 'CodeMismatchException' ||
      errorType === 'ExpiredCodeException' ||
      errorType === 'LimitExceededException'
    ) {
      throw new Error(
        'Something went wrong. Please check the verification code and try again.'
      );
    }

    // Unexpected error — throw with raw message
    throw new Error(error.message || 'An unknown error occurred.');
  }
}

export async function handleSignUp(
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
        ClientId: NEXT_PUBLIC_CLIENT_ID,
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
    const result = await cognito
      .confirmSignUp({
        ClientId: NEXT_PUBLIC_CLIENT_ID,
        Username: username,
        SecretHash: secretHash,
        ConfirmationCode: confirmationCode,
      })
      .promise();
  } catch (error) {
    console.log('handleConfirmSignUp error:', error);

    return getErrorMessage(error); // ❌ Do NOT redirect
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
        ClientId: NEXT_PUBLIC_CLIENT_ID,
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
        ClientId: NEXT_PUBLIC_CLIENT_ID,
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
      .listUsers({ UserPoolId: NEXT_PUBLIC_USER_POOL_ID })
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
      .adminDeleteUser({
        UserPoolId: NEXT_PUBLIC_USER_POOL_ID,
        Username: username,
      })
      .promise();

    return `User ${username} deleted successfully.`;
  } catch (error) {
    return getErrorMessage(error);
  }
}
