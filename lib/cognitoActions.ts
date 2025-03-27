import { redirect } from 'next/navigation';
import {
  signUp,
  signIn,
  confirmSignUp,
  signOut,
  resendSignUpCode,
  type SignUpOutput,
  type SignInOutput,
} from 'aws-amplify/auth';
import { getErrorMessage } from '@/utils/get-error-message';

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get('email')),
      password: String(formData.get('password')),
      options: {
        userAttributes: {
          email: String(formData.get('email')),
          name: String(formData.get('name')),
        },
        autoSignIn: true,
      },
    });
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect('/signup-confirmation');
}

export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete } = await confirmSignUp({
      username: String(formData.get('email')),
      confirmationCode: String(formData.get('code')),
    });

    if (isSignUpComplete) {
      redirect('/login');
    }
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  let redirectLink = '/dashboard';

  try {
    const { nextStep }: SignInOutput = await signIn({
      username: String(formData.get('email')),
      password: String(formData.get('password')),
    });

    if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      await resendSignUpCode({
        username: String(formData.get('email')),
      });
      redirectLink = 'signup-confirmation';
    }
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect(redirectLink);
}

/**
 * Handles user sign-out.
 */
export async function handleSignOut() {
  try {
    await signOut();
    redirect('/login');
  } catch (error) {
    return getErrorMessage(error);
  }
}

/**
 * Handles resending the confirmation code and returns the next step.
 */
export async function handleResendSignUpCode(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const nextStep = await resendSignUpCode({
      username: String(formData.get('email')),
    });

    return nextStep;
  } catch (error) {
    return getErrorMessage(error);
  }
}
