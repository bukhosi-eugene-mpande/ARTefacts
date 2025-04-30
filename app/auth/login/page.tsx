'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { setTokens } from '@/lib/authStorage';
import logo from '@/public/assets/logo.svg';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { handleSignIn } from '@/lib/cognitoActions'; // Import the handleSignIn function

import ConfigureAmplifyClientSide from '../../../lib/amplify-cognito-config';

interface FloatingSphereProps {
  delay: number;
  size: string;
  top: string;
  left: string;
}

const FloatingBalls = ({ delay, size, top, left }: FloatingSphereProps) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      initial={{ y: 0 }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #d4af7a, #3b2c21)',
        top,
        left,
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay,
      }}
    />
  );
};

const Login = () => {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State to store error message
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleSignInClick = async (e: React.FormEvent) => {
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
      <ConfigureAmplifyClientSide />
      <div className="flex flex-col items-center justify-center gap-1 px-4 md:py-10">
        <FloatingBalls delay={0} left="15%" size="50px" top="10%" />
        <FloatingBalls delay={1} left="80%" size="70px" top="50%" />
        <FloatingBalls delay={2} left="10%" size="40px" top="80%" />
        <FloatingBalls delay={2} left="80%" size="80px" top="95%" />

        <Image alt="Logo" className="mb-8" src={logo} />

        <form
          className="shadow-input w-full max-w-sm space-y-4 rounded-[5%] bg-white px-6 py-6 dark:bg-[#141313]"
          onSubmit={handleSignInClick}
        >
          <LabelInputContainer>
            <Label htmlFor="firstname">Username or Email</Label>
            <Input
              id="firstname"
              placeholder="Johnny"
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="firstname">Password</Label>
            <Input
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af7a]"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          {/* Show loading spinner while signing in */}
          {loading && <p className="text-yellow-500">Signing in...</p>}

          {/* Display error if any */}
          {error && <p className="text-red-500">{error}</p>}

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-[#bd9b73] to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-[#614f3b] dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </form>

        <p className="mt-4 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Already have an account?{' '}
          <Link className="text-[#bd9b73]" href="/auth/signup">
            Log in.
          </Link>
        </p>
        <p className="mt-5 max-w-sm text-xs text-neutral-600 dark:text-neutral-300">
          University of Pretoria
        </p>
      </div>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={((className = 'flex w-full flex-col space-y-2'), className)}
    >
      {children}
    </div>
  );
};

export default Login;
