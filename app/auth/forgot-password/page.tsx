'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Spinner } from '@heroui/react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import logo from '@/public/assets/logo.svg';
import { cn } from '@/lib/utils';
import { handleConfirmForgotPassword } from '@/lib/cognitoActions';

export default function ForgotPasswordConfirmation() {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  // ✅ Reused password validation function
  const validatePassword = (password: string): string => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    setPasswordRequirements({ minLength, hasUppercase, hasSpecialChar });

    return minLength && hasUppercase && hasSpecialChar
      ? ''
      : 'Password does not meet requirements.';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPasswordError('');
    setLoading(true);

    if (!confirmationCode || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);

      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setLoading(false);

      return;
    }

    const passwordValidationError = validatePassword(newPassword);

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setLoading(false);

      return;
    }

    try {
      const message = await handleConfirmForgotPassword(
        username as string,
        confirmationCode,
        newPassword
      );

      if (message?.toLowerCase().includes('fail')) {
        setError(message);
      } else {
        router.push('/auth/login');
      }
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Spinner
        className="flex h-screen items-center justify-center text-white"
        labelColor="foreground"
      >
        <span className="text-primary">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
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
              Reset Your Password
            </h2>
            <p className="mb-6 text-center text-base text-neutral-300">
              Enter the code sent to your email and set a new password.
            </p>

            {error && (
              <p className="text-center text-base text-red-500">{error}</p>
            )}
            {passwordError && (
              <p className="text-center text-base text-red-500">
                {passwordError}
              </p>
            )}

            <LabelInputContainer>
              <Label className="text-lg text-white" htmlFor="confirmation-code">
                Verification Code
              </Label>
              <Input
                className="rounded-2xl bg-[#e5d1b4] px-4 py-3 text-xl font-semibold text-black"
                id="confirmation-code"
                placeholder="123456"
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="text-lg text-white" htmlFor="new-password">
                New Password
              </Label>
              <Input
                className="rounded-2xl bg-[#e5d1b4] px-4 py-3 text-xl font-semibold text-black"
                id="new-password"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="text-lg text-white" htmlFor="confirm-password">
                Confirm Password
              </Label>
              <Input
                className="rounded-2xl bg-[#e5d1b4] px-4 py-3 text-xl font-semibold text-black"
                id="confirm-password"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </LabelInputContainer>

            <div className="flex w-full items-center space-x-2">
              <input
                checked={showPassword}
                className="h-4 w-4"
                id="show-password"
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label
                className="text-sm text-neutral-300"
                htmlFor="show-password"
              >
                Show Password
              </label>
            </div>

            <div className="mt-2 w-full text-sm text-neutral-300">
              <ul className="list-disc pl-6">
                <li
                  className={
                    passwordRequirements.minLength ? 'text-green-500' : ''
                  }
                >
                  At least 8 characters
                </li>
                <li
                  className={
                    passwordRequirements.hasUppercase ? 'text-green-500' : ''
                  }
                >
                  At least one uppercase letter
                </li>
                <li
                  className={
                    passwordRequirements.hasSpecialChar ? 'text-green-500' : ''
                  }
                >
                  At least one special character
                </li>
              </ul>
            </div>

            <button
              className="w-[80%] transform rounded-full bg-[#d8a465] px-10 py-3 text-2xl font-semibold text-black shadow transition-transform hover:scale-105 disabled:opacity-70"
              disabled={loading}
              type="submit"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <button
              className="mt-4 w-full text-center text-base text-yellow-400 transition-transform hover:scale-105 hover:text-yellow-500"
              type="button"
              onClick={() => router.push('/auth/login')}
            >
              &larr; Back to Login
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
}) => (
  <div className={cn('flex w-full flex-col space-y-2', className)}>
    {children}
  </div>
);
