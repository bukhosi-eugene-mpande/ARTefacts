import Image from 'next/image';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

import Logo from '../../public/assets/logo-gold.png';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header() {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <Image alt="Artefacts Logo" height={200} src={Logo} width={300} />
      <Bars3Icon className="w-10 font-extrabold text-[#9C5C00]" />
    </div>
  );
}
