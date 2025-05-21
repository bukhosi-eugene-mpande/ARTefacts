'use client';

import React from 'react';

interface ScrollDownIconProps {
  onClick: () => void;
}

export default function ScrollDownIcon({ onClick }: ScrollDownIconProps) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-10 cursor-pointer border-none bg-transparent p-0"
      aria-label="Scroll to next section"
      type="button"
    >
      <svg
        className="animate-bounce"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
