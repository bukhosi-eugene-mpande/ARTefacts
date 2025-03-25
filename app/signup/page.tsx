'use client';
import type React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signUp } from '@aws-amplify/auth';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import logo from '@/public/assets/logo.svg';
import { cn } from '@/lib/utils';

export default function Signup() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
  });

  const validatePassword = (password: string) => {
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

    const firstname = (
      e.currentTarget.elements.namedItem('firstname') as HTMLInputElement
    )?.value.trim();
    const lastname = (
      e.currentTarget.elements.namedItem('lastname') as HTMLInputElement
    )?.value.trim();
    const email = (
      e.currentTarget.elements.namedItem('email') as HTMLInputElement
    )?.value;

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    const passwordValidationError = validatePassword(password);

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    const fullName = lastname ? `${firstname} ${lastname}` : firstname;

    try {
      const signUpResponse = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email: email,
            name: fullName,
          },
        },
      });

      console.log('Sign-up successful', signUpResponse);

      router.push(`/signup-confirmation?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-[5%] p-4 md:p-8 shadow-input bg-white dark:bg-[#141313]">
      <Image alt="Logo" src={logo} />

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Johnny" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Appleseed" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="johnappleseed@gmail.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
              validatePassword(e.target.value);
            }}
          />
          {!(
            passwordRequirements.minLength &&
            passwordRequirements.hasUppercase &&
            passwordRequirements.hasSpecialChar
          ) && (
            <p className="text-xs text-red-500">
              {(() => {
                const missing = [];

                if (!passwordRequirements.minLength)
                  missing.push('8 characters long');
                if (!passwordRequirements.hasUppercase)
                  missing.push('one uppercase letter');
                if (!passwordRequirements.hasSpecialChar)
                  missing.push('one special character');

                if (missing.length === 0) return ''; // No message if all conditions are met

                const prefix = !passwordRequirements.minLength
                  ? 'The password must be at least '
                  : 'The password must contain at least ';

                return prefix + missing.join(', ') + '.';
              })()}
            </p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirm-password">Re-type Password</Label>
          <Input
            id="confirm-password"
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError('');
            }}
          />
        </LabelInputContainer>
        {passwordError && (
          <p className="text-xs text-red-500 mb-4">{passwordError}</p>
        )}

        <button
          className="bg-gradient-to-br relative group/btn from-[#bd9b73] dark:from-[#614f3b] dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

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
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
