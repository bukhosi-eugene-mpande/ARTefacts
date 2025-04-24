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
    <div className="max-w-md w-full mx-auto rounded-[5%] p-4 md:p-8 shadow-input bg-white dark:bg-[#141313]">
      <Image alt="Logo" src={logo} className="mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-center mb-2">
        Verify Your Email
      </h2>
      <p className="text-neutral-600 text-sm text-center mb-6 dark:text-neutral-300">
        Enter the confirmation code sent to your email.
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmation-code">Confirmation Code</Label>
          <Input
            id="confirmation-code"
            placeholder="123456"
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-[#bd9b73] dark:from-[#614f3b] dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-lg disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Confirming...' : 'Confirm'}
        </button>

        <button
          type="button"
          onClick={handleResendCode}
          className="w-full text-center mt-4 text-sm text-[#bd9b73] hover:underline"
        >
          Resend Confirmation Code
        </button>

        <button
          type="button"
          onClick={() => router.push('/signup')}
          className="w-full text-center mt-4 text-sm text-gray-600 dark:text-gray-300 hover:underline"
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
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
