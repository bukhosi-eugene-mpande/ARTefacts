'use client';
import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import logo from '@/public/assets/logo.svg';
import { cn } from '@/lib/utils';

export default function SignupConfirmation() {
  const [ConfirmationCode, setConfirmationCode] = useState('');
  const router = useRouter(); // Initialize router

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Confirmation code submitted:', ConfirmationCode);
  };

  const handleResendCode = () => {
    console.log('Resend confirmation code');
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
      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmation-code">Confirmation Code</Label>
          <Input
            id="confirmation-code"
            placeholder="123456"
            type="text"
            value={ConfirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-[#bd9b73] dark:from-[#614f3b] dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-lg"
          type="submit"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={handleResendCode}
          className="w-full text-center mt-4 text-sm text-[#bd9b73] hover:underline"
        >
          Resend Confirmation Code
        </button>

        {/* Back to Sign Up Button */}
        <button
          type="button"
          onClick={() => router.push('/signup')} // Navigate back to sign-up
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
