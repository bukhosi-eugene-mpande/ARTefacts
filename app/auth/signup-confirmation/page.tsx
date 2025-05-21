'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import logo from '@/public/assets/logo.svg';
import { cn } from '@/lib/utils';
import {
  handleConfirmSignUp,
  handleResendSignUpCode,
} from '@/lib/cognitoActions';

export default function SignupConfirmation() {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!confirmationCode.trim()) {
      setError('Please enter the confirmation code.');
      setLoading(false);

      return;
    }

    try {
      await handleConfirmSignUp(username as string, confirmationCode);
      router.push('/auth/login'); // Redirect to login on success
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      await handleResendSignUpCode(username as string);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-[5%] bg-[#36251a] p-4 dark:bg-[#141313] md:p-8">
      <Image alt="Logo" className="mx-auto mb-4" src={logo} />

      <h2 className="mb-2 text-center text-2xl font-semibold text-white">
        Verify Your Email
      </h2>

      <p className="mb-6 text-center text-base text-neutral-300 dark:text-neutral-300">
        Enter the confirmation code sent to your email.
      </p>

      {error && (
        <p className="mb-4 text-center text-base text-red-500">{error}</p>
      )}

      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label className="text-lg text-white" htmlFor="confirmation-code">
            Confirmation Code
          </Label>
          <Input
            className="w-full rounded-2xl bg-[#e5d1b4] px-4 py-3 font-garamond text-xl font-semibold text-black placeholder:text-gray-700"
            id="confirmation-code"
            placeholder="123456"
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </LabelInputContainer>

        <button
          type="submit"
          className="w-[80%] transform rounded-full bg-[#d8a465] px-10 py-3 text-2xl font-semibold text-black shadow transition-transform hover:scale-105"
        >
          {loading ? 'Confirming...' : 'Confirm'}
        </button>

        <button
          className="mt-4 w-full text-center text-base text-[#bd9b73] hover:underline"
          type="button"
          onClick={handleResendCode}
        >
          Resend Confirmation Code
        </button>

        <button
          className="mt-4 w-full text-center text-base text-gray-600 hover:underline dark:text-gray-300"
          type="button"
          onClick={() => router.push('/auth/signup')}
        >
          &larr; Back to Sign Up
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
