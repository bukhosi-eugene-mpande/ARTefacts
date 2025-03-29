'use client';
// import { FcGoogle } from "react-icons/fc";
import Image from 'next/image';
import { IconBrandGoogle } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import logo from '@/public/assets/logo.svg';
import loginPic from '@/public/assets/bg-login.svg';
import Link from 'next/link';

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
        background: 'radial-gradient(circle, #d4af7a, #3b2c21)', // Adjust colors
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
  return (
    <div className="flex justify-center items-center flex-col gap-1 md:py-10">
      <FloatingBalls delay={0} left="15%" size="50px" top="10%" />
      <FloatingBalls delay={1} left="80%" size="70px" top="50%" />
      <FloatingBalls delay={2} left="10%" size="40px" top="80%" />
      <FloatingBalls delay={2} left="80%" size="80px" top="95%" />
      <Image alt="Logo" src={logo} />
      <Image
        alt="loginPic"
        className="mb-12 flex justify-center"
        src={loginPic}
      />
      {/* google btn */}
      <button className="flex items-center justify-center px-6 py-3 mb-3 bg-[#E5D1B4] border-gray-300  w-full rounded-lg shadow-md hover:shadow-lg transition hover:bg-[#a79984]">
        {/* insert onclick link to google AWScognito */}
        <span className="font-medium text-black">Continue with Google</span>
        <IconBrandGoogle className="ml-2 font-medium text-black" />
      </button>

      {/* guest btn */}
      <button className="flex items-center justify-center px-6 py-3 mb-3 bg-[#181109] border-gray-300 w-full rounded-lg shadow-md hover:shadow-lg transition hover:bg-[#2c1f10]">
        <span className="font-medium text-white px-7">Continue as Guest</span>
      </button>

      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Don&apos;t have an account?{' '}
        <Link className="text-[#bd9b73]" href="/signup">
          Sign up.
        </Link>
      </p>
      <p className="text-neutral-600 mt-5 text-xs max-w-sm dark:text-neutral-300">
        University of Pretoria
      </p>
    </div>
  );
};

export default Login;
