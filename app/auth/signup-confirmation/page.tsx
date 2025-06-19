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
      const errorMessage = await handleConfirmSignUp(
        username as string,
        confirmationCode
      );

      if (errorMessage) {
        setError(errorMessage);
      } else {
        router.push('/auth/login');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
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
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-0">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
            <p className="text-lg font-semibold text-yellow-400">Loading...</p>
          </div>
        </div>
      )}
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
            <h2 className="mb-2 text-center text-2xl font-semibold text-white">
              Verify Your Email
            </h2>
            <p className="mb-6 text-center text-base text-neutral-300 dark:text-neutral-300">
              Enter the confirmation code sent to your email.
            </p>
            {error && (
              <p className="mb-4 text-center text-base text-red-500">{error}</p>
            )}
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
                disabled={loading}
                aria-disabled={loading}
              />
            </LabelInputContainer>

            <button
              className="w-[80%] transform rounded-full bg-[#d8a465] px-10 py-3 text-2xl font-semibold text-black shadow transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Confirming...' : 'Confirm'}
            </button>

            <button
              className="mt-4 w-full text-center text-base text-[#bd9b73] hover:underline disabled:cursor-not-allowed disabled:opacity-70"
              type="button"
              onClick={handleResendCode}
              disabled={loading}
              aria-disabled={loading}
            >
              Resend Confirmation Code
            </button>

            <button
              className="mt-4 w-full text-center text-base text-yellow-400 transition-transform hover:scale-105 hover:text-yellow-500"
              type="button"
              onClick={() => router.push('/auth/signup')}
              disabled={loading}
              aria-disabled={loading}
            >
              &larr; Back to Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
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
