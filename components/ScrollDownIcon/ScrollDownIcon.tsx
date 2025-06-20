'use client';

import React from 'react';

interface ScrollDownIconProps {
  onClick: () => void;
}

export default function ScrollDownIcon({ onClick }: ScrollDownIconProps) {
  return (
    <button
      aria-label="Scroll to next section"
      className="absolute bottom-10 cursor-pointer border-none bg-transparent p-0"
      type="button"
      onClick={onClick}
    >
      <svg
        className="animate-bounce"
        fill="none"
        height="40"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="40"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
