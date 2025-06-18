'use client';

import Image from 'next/image';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

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
      <div className="flex min-h-screen flex-col bg-cover bg-center sm:w-[370px] md:h-[450px] md:w-[450px]">
        <div className="mx-auto w-full max-w-lg px-6">
          <header className="bg-opacity-97 mb-4 rounded-b-3xl bg-[#36251a] shadow-md">
            <Image
              alt="Logo"
              className="mx-auto h-[150px] w-[300px] w-auto"
              src={logo}
            />
          </header>

          <form
            className="mt-15 bg-opacity-97 flex w-full max-w-lg flex-col items-center justify-center space-y-8 rounded-2xl bg-[#36251a] px-6 py-10 shadow-lg"
            onSubmit={handleSubmit}
          >
            <LabelInputContainer>
              <Label
                className="text-left text-lg text-white"
                htmlFor="username"
              >
                Username or Email
              </Label>
              <Input
                className="rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                id="username"
                placeholder="Johnny"
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
                className="rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-lg font-semibold text-black placeholder:text-gray-700"
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>
            {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
                  <p className="text-lg font-semibold text-yellow-400">
                    Loading...
                  </p>
                </div>
              </div>
            )}

            {error && <p className="text-center text-red-500">{error}</p>}

            <button
              className="w-full transform rounded-full bg-[#d8a465] px-4 py-3 text-lg font-semibold text-black shadow transition-transform hover:scale-105"
              type="submit"
            >
              Login
              <BottomGradient />
            </button>

            {/* Guest Login */}
            <button
              className="w-full rounded-full bg-[#bc6c25] px-4 py-3 text-lg font-semibold text-white shadow transition-transform hover:scale-105"
              type="button"
              onClick={() => router.push('/pages/home')}
            >
              Continue as Guest
            </button>

            <p className="mt-4 text-center text-sm text-neutral-300">
              Don&apos;t have an account?{' '}
              <Link className="font-medium text-[#bd9b73]" href="/auth/signup">
                Sign Up
              </Link>
            </p>
            <button
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-yellow-300"
            >
              <ChevronLeft className="h-7 w-7" />
              <span className="text-lg font-medium">Back</span>
            </button>
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
  className = 'flex w-full flex-col space-y-2',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export default Login;
