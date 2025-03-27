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

    redirect('/signup-confirmation');
  } catch (error) {
    return getErrorMessage(error) as string;
  }
}

export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  const username = String(formData.get('email'));
  const secretHash = getSecretHash(username);
  const confirmationCode = String(formData.get('code'));

  const cognito = new CognitoIdentityServiceProvider();

  try {
    await cognito
      .confirmSignUp({
        ClientId: CLIENT_ID, // Only pass ClientId here
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

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  let redirectLink = '/dashboard';
  const username = String(formData.get('email'));
  const password = String(formData.get('password'));
  const secretHash = getSecretHash(username);

  const cognito = new CognitoIdentityServiceProvider();

  try {
    const authResponse = await cognito
      .adminInitiateAuth({
        UserPoolId: USER_POOL_ID, // This is only needed for admin authentication
        ClientId: CLIENT_ID,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: secretHash,
        },
      })
      .promise();

    if (authResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
      // Handle the case where new password is required
      // Redirect to the change password page or whatever step is needed
      redirectLink = '/change-password';
    }
  } catch (error) {
    return getErrorMessage(error);
  }

  redirect(redirectLink);
}

export async function handleSignOut() {
  // AWS SDK doesn't have a method for signOut, but you can handle this on the client side
  try {
    // Example: Clear session or token from storage
    redirect('/login');
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleResendSignUpCode(
  prevState: string | undefined,
  formData: FormData
) {
  const username = String(formData.get('email'));
  const secretHash = getSecretHash(username);

  const cognito = new CognitoIdentityServiceProvider();

  try {
    await cognito
      .resendConfirmationCode({
        ClientId: CLIENT_ID, // Only pass ClientId here
        SecretHash: secretHash,
        Username: username,
      })
      .promise();

    return 'Confirmation code resent successfully';
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function checkIfUserExists(username: string): Promise<boolean> {
  const cognito = new CognitoIdentityServiceProvider();

  try {
    await cognito
      .adminGetUser({
        UserPoolId: USER_POOL_ID,
        Username: username,
      })
      .promise();

    return true; // User exists
  } catch (error: any) {
    if (error.code === 'UserNotFoundException') {
      return false; // User does not exist
    }
    throw new Error(error); // Handle other errors
  }
}
