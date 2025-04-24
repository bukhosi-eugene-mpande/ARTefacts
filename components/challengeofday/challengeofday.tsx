import React from 'react';
import Link from 'next/link';

interface SearchbarProps {
  children?: React.ReactNode;
}

export default function ChallengeOfDay() {
  return (
    <div
      className="mb-3 flex w-full flex-col items-center justify-center rounded-2xl px-8 py-3"
      style={{ backgroundColor: '#E3C8A0' }}
    >
      <h1 className="text-[28px] text-[#A37A3E]">Challenge of the day</h1>

      {/* REPLACE THIS BLOCK WITH INFORMATION FROM DATABASE/API REQUEST */}
      <h2 className="font-garamond text-[14px] font-bold">
        Challenge Time: 30 minutes
      </h2>
      <p className="mb-2 text-center font-garamond text-[14px]">
        A rare artifact has gone missing from our digital archives! Can you find
        it in time? Search through the exhibits and locate the mysterious golden
        scarab before time runs out!
      </p>
      {/* END OF BLOCK */}

      <Link href="/pages/camera">
        <button
          className="rounded-full bg-[#231209] px-10 py-1 font-semibold text-[20px] text-[#D8A730]"
        >
          Start
        </button>
      </Link>
    </div>
  );
}
