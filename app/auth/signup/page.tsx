'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import oldMerensky from '../../assets/img/old_merensky.jpg';
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
      <div className="flex min-h-screen flex-col bg-cover bg-center sm:w-[370px] md:h-[450px] md:w-[450px]">
        <div className="mx-auto w-full max-w-lg px-6">
          <header className="bg-opacity-97 mb-4 rounded-b-3xl bg-[#36251a] shadow-md">
            <Image
              alt="Logo"
              src={logo}
              className="mx-auto h-[150px] w-[300px] w-auto"
            />
          </header>

          <form
            onSubmit={handleSubmit}
            className="bg-opacity-97px-6 mb-10 flex w-full flex-col items-center justify-center space-y-5 rounded-2xl bg-[#36251a] py-6 shadow-lg"
          >
            <div className="mb-4 flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Label
                  className="w-full text-left text-lg text-white"
                  htmlFor="firstname"
                >
                  First name
                </Label>
                <Input
                  className="rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                  id="firstname"
                  placeholder="Johnny"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label
                  className="w-full text-left text-lg text-white"
                  htmlFor="username"
                >
                  Username
                </Label>
                {usernameError && (
                  <p className="mb-1 text-xs text-red-500">{usernameError}</p>
                )}
                <Input
                  className="rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                  id="username"
                  placeholder="Johnny_"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col space-y-2">
              <Label
                className="w-full text-left text-lg text-white"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                className="w-full rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                id="email"
                placeholder="john@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4 flex flex-col space-y-2">
              <Label
                className="w-full text-left text-lg text-white"
                htmlFor="password"
              >
                Password
              </Label>
              <Input
                className="w-full rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
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
                  <p className="text-s w-full text-green-500">
                    Password meets the requirements.
                  </p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4 flex flex-col space-y-2">
              <Label
                className="w-full text-left text-lg text-white"
                htmlFor="confirm-password"
              >
                Confirm Password
              </Label>
              <Input
                className="w- rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
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
              type="submit"
              className="w-[80%] transform rounded-full bg-[#d8a465] px-10 py-3 text-xl font-semibold text-black shadow transition-transform hover:scale-105"
            >
              Sign up
            </button>

            <button
              type="button"
              onClick={() => router.push('/pages/home')}
              className="w-[80%] rounded-full bg-[#bc6c25] px-4 py-3 text-xl font-semibold text-black shadow transition-transform hover:scale-105"
            >
              Continue as Guest
            </button>

            <p className="mt-4 text-sm text-white dark:text-neutral-300">
              Already have an account?{' '}
              <Link
                className="text-[#bd9b73] hover:underline"
                href="/auth/login"
              >
                Log in.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
