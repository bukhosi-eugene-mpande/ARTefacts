'use client';
import Image from 'next/image';
import { IconBrandGoogle } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { cn } from 'tailwind-variants';
import { useState } from 'react';
import Link from 'next/link';

import { setTokens } from '@/lib/authStorage';
import logo from '@/public/assets/logo.svg';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { handleSignIn } from '@/lib/cognitoActions'; // Import the handleSignIn function

import ConfigureAmplifyClientSide from '../../../lib/amplify-cognito-config';

import { useRouter } from 'next/navigation';

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
      router.push('/home');
    }

    setLoading(false);
  };

  return (
    <>
      <ConfigureAmplifyClientSide />
      <div className="flex justify-center items-center flex-col gap-1 md:py-10 px-4">
        <FloatingBalls delay={0} left="15%" size="50px" top="10%" />
        <FloatingBalls delay={1} left="80%" size="70px" top="50%" />
        <FloatingBalls delay={2} left="10%" size="40px" top="80%" />
        <FloatingBalls delay={2} left="80%" size="80px" top="95%" />

        <Image alt="Logo" className="mb-8" src={logo} />

        <form
          className="w-full max-w-sm bg-white dark:bg-[#141313] shadow-input rounded-[5%] px-6 py-6 space-y-4"
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
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af7a] text-black"
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
            className="bg-gradient-to-br relative group/btn from-[#bd9b73] dark:from-[#614f3b] dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </form>

        <p className="text-neutral-600 text-sm max-w-sm mt-4 dark:text-neutral-300">
          Already have an account?{' '}
          <Link className="text-[#bd9b73]" href="/auth/signup">
            Log in.
          </Link>
        </p>
        <p className="text-neutral-600 mt-5 text-xs max-w-sm dark:text-neutral-300">
          University of Pretoria
        </p>
      </div>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
      className={((className = 'flex flex-col space-y-2 w-full'), className)}
    >
      {children}
    </div>
  );
};

export default Login;
