'use client';
import * as React from 'react';
import { useMotionTemplate, useMotionValue, motion } from 'motion/react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        className="p-[2px] rounded-lg transition duration-300 group/input"
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onMouseMove={handleMouseMove}
      >
        <input
          ref={ref}
          className={cn(
            `flex h-10 w-full border border-[#3D3937] bg-gray-100 text-[#2A2725] 
          shadow-input rounded-md px-3 py-2 text-sm placeholder:text-[#5F5A57]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2725] focus:border-[#2A2725]
          disabled:cursor-not-allowed disabled:opacity-50
          dark:bg-[#2A2725] dark:border-[#3D3937] dark:text-gray-200 dark:placeholder-gray-400
          dark:focus-visible:ring-[#5F5A57]
          group-hover/input:shadow-none transition duration-400
           `,
            className
          )}
          type={type}
          {...props}
        />
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
