"use client"
// import { FcGoogle } from "react-icons/fc"; 
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import loginPic from "@/public/assets/bg-login.svg";
import { IconBrandGoogle } from "@tabler/icons-react"

import { motion } from "framer-motion";

interface FloatingSphereProps {
  delay: number;
  size: string;
  top: string;
  left: string;
}

const FloatingBalls = ({ delay, size, top, left }: FloatingSphereProps) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle, #d4af7a, #3b2c21)", // Adjust colors
        top,
        left,
      }}
    />
  );
};

const Login = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-1 md:py-10"> 
        <FloatingBalls size="50px" top="10%" left="15%" delay={0} />
        <FloatingBalls size="70px" top="50%" left="80%" delay={1} />
        <FloatingBalls size="40px" top="80%" left="10%" delay={2} />
        <FloatingBalls size="80px" top="95%" left="80%" delay={2} />
        <Image src={logo} alt="Logo" />
        <Image src={loginPic} alt="loginPic" className="mb-12 flex justify-center"/>
        {/* google btn */}
        <button
            className="flex items-center justify-center px-6 py-3 mb-3 bg-[#E5D1B4] border-gray-300  w-full rounded-lg shadow-md hover:shadow-lg transition hover:bg-[#a79984]">
            {/* insert onclick link to google AWScognito */}
            <span className="font-medium text-black">Continue with Google</span><IconBrandGoogle className="ml-2 font-medium text-black" />
        </button>

        {/* guest btn */}
        <button
            className="flex items-center justify-center px-6 py-3 mb-3 bg-[#181109] border-gray-300 w-full rounded-lg shadow-md hover:shadow-lg transition hover:bg-[#2c1f10]">
            <span className="font-medium text-white px-7">Continue as Guest</span>
        </button>

        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Don't have an account? <a href="/signup" className="text-[#bd9b73]">Sign up.</a>
        </p> 

      <p className="text-neutral-600 mt-5 text-xs max-w-sm dark:text-neutral-300">
        University of Pretoria
      </p>
    </div>
    
  )
}

export default Login;