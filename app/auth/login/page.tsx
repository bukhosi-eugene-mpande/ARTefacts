'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';

import logo from '@/public/assets/logo.svg';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { setTokens } from '@/lib/authStorage';
import {
  handleSendForgotPasswordCode,
  handleSignIn,
} from '@/lib/cognitoActions';

import ConfigureAmplifyClientSide from '../../../lib/amplify-cognito-config';

const Login = () => {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = usernameOrEmail.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      if (!trimmedEmail && !trimmedPassword) {
        setError('Please fill in email/username and password.');
      } else if (!trimmedEmail) {
        setError('Please fill in email/username.');
      } else {
        setError('Please fill in password.');
      }

      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append('email', trimmedEmail);
    formData.append('password', trimmedPassword);

    const result = await handleSignIn(formData);

    if (typeof result === 'string') {
      setError(result);
    } else if (result && result.AccessToken && result.RefreshToken) {
      setTokens(result);
      router.push('/pages/home');
    }

    setLoading(false);
  };

  return (
    <>
      {' '}
      {loading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] m-0 flex items-center justify-center bg-black bg-opacity-50 p-0">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
            <p className="text-lg font-semibold text-yellow-400">Loading...</p>
          </div>
        </div>
      )}
      <ConfigureAmplifyClientSide />
      <div className="flex min-h-screen w-full bg-cover bg-center">
        <div className="flex w-full items-center justify-end">
          <form
            className="bg-opacity-97 flex min-h-screen w-full flex-col items-center justify-center space-y-5 bg-[#231209] px-6 shadow-lg md:w-[33.3333vw]"
            onSubmit={handleSubmit}
          >
            <Image
              alt="Logo"
              className="mx-auto w-auto"
              height={150}
              src={logo}
              width={300}
            />
            <LabelInputContainer>
              <Label
                className="text-left text-lg text-white"
                htmlFor="username"
              >
                Username or Email
              </Label>
              <Input
                className="rounded-full bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                id="username"
                placeholder="john_123"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label
                className="text-left text-lg text-white"
                htmlFor="password"
              >
                Password
              </Label>
              <Input
                className="rounded-full bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                id="password"
                placeholder="•••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>

            {error && <p className="text-center text-red-500">{error}</p>}

            <Button
              className="w-[80%] transform rounded-full bg-[#D8A730] px-4 py-3 text-lg text-black shadow transition-transform hover:scale-105"
              type="submit"
            >
              Login
              <BottomGradient />
            </Button>

            {/* Guest Login */}
            <Button
              className="w-[80%] rounded-full bg-[#BC6C25] px-4 py-3 text-lg text-black shadow transition-transform hover:scale-105"
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  router.push('/pages/home');
                }, 200);
              }}
            >
              Continue as Guest
            </Button>

            <p className="mt-4 text-center text-sm text-neutral-300">
              Don&apos;t have an account?{' '}
              <Link className="font-medium text-[#D8A730]" href="/auth/signup">
                Sign Up
              </Link>
            </p>
            <p className="mt-4 text-center text-sm text-neutral-300">
              <button
                className="font-medium text-[#D8A730] hover:underline"
                type="button"
                onClick={async () => {
                  const trimmedUsername = usernameOrEmail.trim();

                  if (!trimmedUsername) {
                    setError('Please enter your username or email first.');

                    return;
                  }

                  setLoading(true);
                  const result =
                    await handleSendForgotPasswordCode(trimmedUsername);

                  if (result === 'Password reset code sent successfully.') {
                    router.push(
                      `/auth/forgot-password?username=${encodeURIComponent(trimmedUsername)}`
                    );
                  } else {
                    setError(result);
                  }

                  setLoading(false);
                }}
              >
                Forgot Password?
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className = 'flex w-[80%] flex-col space-y-2',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export default Login;
