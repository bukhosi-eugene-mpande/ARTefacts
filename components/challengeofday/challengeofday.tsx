import { Input } from '@heroui/react';
import React from 'react';

import { SearchIcon } from '../icons';

interface SearchbarProps {
  children?: React.ReactNode;
}

export default function ChallengeOfDay() {
  return (
    <div
      className="px-8 py-3 rounded-2xl w-full flex flex-col justify-center items-center  mb-3"
      style={{ backgroundColor: '#E3C8A0' }}
    >
      <h1 className='text-[#A37A3E] text-[28px]'>Challenge of the day</h1>

      {/* REPLACE THIS BLOCK WITH INFORMATION FROM DATABASE/API REQUEST */}
      <h2 className='font-bold font-garamond text-[14px]'>Challenge Time: 30 minutes</h2>
      <p className='font-garamond text-[14px] text-center mb-4'>A rare artifact has gone missing from our digital archives!
        Can you find it in time? Search through the exhibits and locate the mysterious
        golden scarab before time runs out!</p>
      {/* END OF BLOCK */}

      <button className='absolute -bottom-[-50%] bg-[#231209] text-[#D8A730] text-[24px] rounded-full px-10 '>Start</button>
    </div>
  );
}
