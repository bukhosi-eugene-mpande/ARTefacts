'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Assuming you're using the Tabler Icons

import Link from 'next/link';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import logo from '@/public/assets/logo.svg';
import { handleSignUp } from '@/lib/cognitoActions';

import ConfigureAmplifyClientSide from '../../../lib/amplify-cognito-config';

export default function SignupModal() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true); // Control modal visibility
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
      setUsernameError('Username is required.');

      return;
    } else {
      setUsernameError('');
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

      const result = await handleSignUp(formData);

      if (result === 'success') {
        router.push(
          `/auth/signup-confirmation?username=${encodeURIComponent(username)}`
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
        <Image alt="Logo" className="mb-4" src={logo} />

        {/* Only Sign up Form */}
        <form
          className={`my-6 transform transition-all ${
            showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`} // Smooth scale and opacity transition
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                className="font-garamond font-bold"
                id="firstname"
                placeholder="Johnny"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="username">Username</Label>
              {usernameError && (
                <p className="mb-1 text-xs text-red-500">{usernameError}</p>
              )}
              <Input
                className="font-garamond font-bold"
                id="username"
                placeholder="Johnny_"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              className="font-garamond font-bold"
              id="email"
              placeholder="john@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              className="font-garamond font-bold"
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => {
                const val = e.target.value;

                setPassword(val);
                setPasswordError('');
                validatePassword(val);
              }}
            />
            {passwordRequirements.minLength &&
              passwordRequirements.hasUppercase &&
              passwordRequirements.hasSpecialChar && (
                <p className="text-xs text-green-500">
                  Password meets the requirements.
                </p>
              )}
          </div>

          <div className="mb-4">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              className="font-garamond font-bold"
              id="confirm-password"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError('');
              }}
            />
          </div>

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
            <Link className="text-[#bd9b73] hover:underline" href="/auth/login">
              Log in.
            </Link>
          </p>
          <p className="mt-4 text-xs text-neutral-600 dark:text-neutral-300">
            University of Pretoria
          </p>
        </form>
      </div>
    </>
  );
}
