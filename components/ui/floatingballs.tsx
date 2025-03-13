"use client"; // If using Next.js App Router

import { motion } from "framer-motion";

interface FloatingSphereProps {
  delay: number;
  size: string;
  top: string;
  left: string;
}

const FloatingSphere = ({ delay, size, top, left }: FloatingSphereProps) => {
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

export default FloatingSphere;

// const LoginPage = () => {
//   return (
//     <div style={{ position: "relative", height: "100vh", background: "#141414" }}>
//       <FloatingSphere size="50px" top="10%" left="20%" delay={0} />
//       <FloatingSphere size="70px" top="50%" left="80%" delay={1} />
//       <FloatingSphere size="40px" top="80%" left="10%" delay={2} />
//       <h1 style={{ color: "#fff", textAlign: "center", paddingTop: "30vh" }}>
//         ARTEFACT
//       </h1>
//       <button style={{ display: "block", margin: "0 auto", padding: "10px 20px" }}>
//         Get Started
//       </button>
//     </div>
//   );
// };

// export default LoginPage;