'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IconChevronLeft } from '@tabler/icons-react'; // Assuming you're using the Tabler Icons

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import logo from '@/public/assets/logo.svg';
import { handleSignUp } from '@/lib/cognitoActions';
import { makeGuestToken } from '@/lib/authStorage';
import ConfigureAmplifyClientSide from '../../../lib/amplify-cognito-config';
import { IconBrandGoogle } from '@tabler/icons-react';

export default function SignupModal() {
  const router = useRouter();
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showModal, setShowModal] = useState(false); // Control modal visibility with transition

  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameWarning, setUsernameWarning] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
  });

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    setPasswordRequirements({ minLength, hasUppercase, hasSpecialChar });

    return minLength && hasUppercase && hasSpecialChar
      ? ''
      : 'Password does not meet requirements.';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      setUsernameWarning('Username is required.');
      return;
    } else {
      setUsernameWarning('');
    }

    const passwordValidationError = validatePassword(password);

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      const formData = new FormData();
      formData.set('username', username);
      formData.set('email', email);
      formData.set('password', password);
      formData.set('name', firstname);

      const result = await handleSignUp(undefined, formData);

      if (result === 'success') {
        router.push(
          `/signup-confirmation?username=${encodeURIComponent(username)}`
        );
        return;
      }

      if (String(result).includes('User already exists')) {
        setUsernameError('User already exists');
      } else {
        setPasswordError(String(result));
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      <ConfigureAmplifyClientSide />
      <div className="shadow-input relative mx-auto w-full max-w-md rounded-[5%] bg-white p-4 transition-all duration-300 ease-in-out dark:bg-[#141313] md:p-8">
        {/* Chevron Icon for Back Button */}
        {showModal && (
          <button
            onClick={() => {
              setShowModal(false); // Hide the modal with transition
              setShowSignupForm(false);
            }}
            className="absolute left-4 top-4 p-2 text-gray-600 hover:text-gray-800"
          >
            <IconChevronLeft size={30} />
          </button>
        )}

        <Image alt="Logo" src={logo} className="mb-4" />

        {!showSignupForm ? (
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                setShowModal(true); // Show the modal with transition
                setShowSignupForm(true);
              }}
              className="h-10 w-full rounded-md bg-[#bd9b73] font-medium text-white shadow hover:bg-[#a79984]"
            >
              Sign up
            </button>
            <button
              onClick={() => {
                makeGuestToken();
                router.push('/home');
              }}
              className="h-10 w-full rounded-md bg-[#E5D1B4] font-medium text-black shadow hover:bg-[#a79984]"
            >
              Continue as Guest
            </button>
          </div>
        ) : (
          <form
            className={`my-6 transform transition-all ${
              showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`} // Smooth scale and opacity transition
            onSubmit={handleSubmit}
          >
            {/* Form content */}
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Johnny"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="username">Username</Label>
                {usernameError && (
                  <p className="mb-1 text-xs text-red-500">{usernameError}</p>
                )}
                <Input
                  id="username"
                  placeholder="Johnny_"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  setPasswordError('');
                  validatePassword(val);
                  if (!hasTypedPassword && val.length > 0) {
                    setHasTypedPassword(true);
                  }
                }}
              />
              {hasTypedPassword &&
                !(
                  passwordRequirements.minLength &&
                  passwordRequirements.hasUppercase &&
                  passwordRequirements.hasSpecialChar
                ) && (
                  <p className="text-xs text-red-500">
                    Password must be at least 8 characters, include one
                    uppercase letter and one special character.
                  </p>
                )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                placeholder="••••••••"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError('');
                }}
              />
            </LabelInputContainer>

            {passwordError && (
              <p className="mb-4 text-xs text-red-500">{passwordError}</p>
            )}

            <button
              className="h-10 w-full rounded-md bg-gradient-to-br from-[#bd9b73] to-neutral-600 font-medium text-white shadow-md hover:shadow-lg"
              type="submit"
            >
              Sign up &rarr;
            </button>

            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
              Already have an account?{' '}
              <Link
                className="text-[#bd9b73] hover:underline"
                href="/auth/login"
              >
                Log in.
              </Link>
            </p>
            <p className="mt-4 text-xs text-neutral-600 dark:text-neutral-300">
              University of Pretoria
            </p>
          </form>
        )}
      </div>
    </>
  );
}

const LabelInputContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>
  );
};
