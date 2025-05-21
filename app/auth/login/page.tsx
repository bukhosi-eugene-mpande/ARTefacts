'use client';

import Image from 'next/image';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      <div className="flex flex-col items-center justify-center">
        <Image alt="Logo" src={logo} className="mb-8" />

        <form
          onSubmit={handleSubmit}
          className="shadow-input flex h-auto w-full flex-col items-center justify-center space-y-10 overflow-hidden rounded-[5%] bg-white px-6 pb-6 pt-12 dark:bg-[#322016] sm:w-[400px] md:h-[450px] md:w-[550px]"
        >
          <LabelInputContainer>
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              type="text"
              placeholder="Johnny"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="rounded-2xl bg-white font-garamond font-bold"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 font-garamond font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#d4af7a]"
            />
          </LabelInputContainer>

          {loading && <p className="text-yellow-500">Logging in...</p>}
          {error && (
            <p className="text-red-500">
              {error.includes('INCORRECT USERNAME OR PASSWORD')
                ? error
                : 'Failed to login'}
            </p>
          )}

          <button
            type="submit"
            className="group/btn hover: relative block h-10 w-full transform rounded-2xl bg-gradient-to-br from-[#bd9b73] to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-transform duration-200 ease-in-out hover:text-lg dark:from-[#614f3b] dark:to-zinc-900"
          >
            Login
            <BottomGradient />
          </button>
          <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-[#bd9b73]">
              Sign Up.
            </Link>
          </p>
        </form>
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
