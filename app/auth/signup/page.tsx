'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Assuming you're using the Tabler Icons

import Link from 'next/link';
import { Button } from '@heroui/react';

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
      <div className="flex min-h-screen w-full bg-cover bg-center">
        <div className="w-1/2" />
        <div className="flex w-full items-center justify-end">
          <div className="flex min-h-screen flex-col bg-cover bg-center">
            <form
              className="bg-opacity-97 flex min-h-screen w-full flex-col items-center justify-center space-y-5 bg-[#231209] px-6 shadow-lg"
              onSubmit={handleSubmit}
            >
              <Image
                alt="Logo"
                className="mx-10 h-[150px] w-auto"
                height={150}
                src={logo}
                width={300}
              />
              <div className="flex w-[80%] flex-col space-y-2">
                <div className="flex flex-col space-y-2">
                  <Label
                    className="w-full text-left text-lg text-white"
                    htmlFor="firstname"
                  >
                    First name
                  </Label>
                  <Input
                    className="bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
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
                    className="bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                    id="username"
                    placeholder="Johnny_"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex w-[80%] flex-col space-y-2">
                <Label
                  className="w-full text-left text-lg text-white"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  className="w-full bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="flex w-[80%] flex-col space-y-2">
                <Label
                  className="w-full text-left text-lg text-white"
                  htmlFor="password"
                >
                  Password
                </Label>
                <Input
                  className="w-full bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
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
              <div className="flex w-[80%] flex-col space-y-2">
                <Label
                  className="w-full text-left text-lg text-white"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </Label>
                <Input
                  className="w-full bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
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

              <Button
                className="w-[80%] transform bg-[#D8A730] px-10 py-3 text-xl font-semibold text-black shadow transition-transform hover:scale-105"
                type="submit"
              >
                Sign up
              </Button>

              <Button
                className="w-[80%] bg-[#bc6c25] px-4 py-3 text-xl font-semibold text-black shadow transition-transform hover:scale-105"
                type="button"
                onClick={() => router.push('/pages/home')}
              >
                Continue as Guest
              </Button>

              <p className="mt-4 text-sm text-white dark:text-neutral-300">
                Already have an account?{' '}
                <Link
                  className="text-[#D8A730] hover:underline"
                  href="/auth/login"
                >
                  Log in.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
