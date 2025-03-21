'use client'; // If using Next.js App Router

import { motion } from 'framer-motion';

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

// export default FloatingBalls;

const LoginPage = () => {
  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <FloatingBalls delay={0} left="20%" size="50px" top="10%" />
      <FloatingBalls delay={1} left="80%" size="70px" top="50%" />
      <FloatingBalls delay={2} left="10%" size="40px" top="80%" />
      {/* <h1 style={{ color: "#fff", textAlign: "center", paddingTop: "30vh" }}>
        ARTefact
      </h1>
      <button style={{ display: "block", margin: "0 auto", padding: "10px 20px" }}>
        Get Started
      </button> */}
    </div>
  );
};

export default LoginPage;
