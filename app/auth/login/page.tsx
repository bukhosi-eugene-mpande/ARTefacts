'use client';

import Image from 'next/image';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import oldMerensky from '../../assets/img/old_merensky.jpg';

import logo from '@/public/assets/logo.svg';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { setTokens } from '@/lib/authStorage';
import { handleSignIn } from '@/lib/cognitoActions';
import ConfigureAmplifyClientSide from '../../../lib/amplify-cognito-config';

const Login = () => {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const email = usernameOrEmail.trim();
    const pass = password.trim();

    if (!email || !pass) {
      setError(
        !email && !pass
          ? 'Please fill in email/username and password.'
          : !email
            ? 'Please fill in email/username.'
            : 'Please fill in password.'
      );
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', pass);

    const result = await handleSignIn(formData);

    if (typeof result === 'string') {
      setError(result);
    } else if (result?.AccessToken && result?.RefreshToken) {
      setTokens(result);
      router.push('/pages/home');
    }

    setLoading(false);
  };

  return (
    <>
      <ConfigureAmplifyClientSide />
      <div
        className="flex min-h-screen flex-col bg-cover bg-center sm:w-[370px] md:h-[450px] md:w-[450px]"
        style={{ backgroundImage: `url(${oldMerensky.src})` }}
      >
        {/* Logo Banner */}
        <header className="mx-auto mb-6 w-full max-w-lg rounded-b-3xl bg-[#36251a] bg-opacity-70 px-4 py-4 shadow-md">
          <Image alt="Logo" src={logo} className="h-21 mx-auto w-auto" />
        </header>

        <main className="flex flex-grow items-center justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-lg flex-col items-center justify-center space-y-8 rounded-2xl bg-[#36251a] bg-opacity-90 px-6 py-10 shadow-lg"
          >
            <LabelInputContainer>
              <Label
                htmlFor="username"
                className="text-left text-lg text-white"
              >
                Username or Email
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Johnny"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label
                htmlFor="password"
                className="text-left text-lg text-white"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
              />
            </LabelInputContainer>

            {loading && <p className="text-yellow-400">Logging in...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full transform rounded-full bg-[#d8a465] px-4 py-3 text-lg font-semibold text-black shadow transition-transform hover:scale-105"
            >
              Login
              <BottomGradient />
            </button>

            {/* Guest Login */}
            <button
              type="button"
              onClick={() => router.push('/pages/home')}
              className="w-full rounded-full bg-[#bc6c25] px-4 py-3 text-lg font-semibold text-white shadow transition-transform hover:scale-105"
            >
              Continue as Guest
            </button>

            <p className="mt-4 text-center text-sm text-neutral-300">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-[#bd9b73]">
                Sign Up
              </Link>
            </p>
          </form>
        </main>
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
  className = 'flex w-full flex-col space-y-2',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export default Login;
