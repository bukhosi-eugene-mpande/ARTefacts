import Image from 'next/image';
import React from 'react';

import Logo from '../../public/assets/logo-gold.png';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header() {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Image alt="Artefacts Logo" height={400} src={Logo} width={500} />
      {/* <Bars3Icon className="w-10 font-extrabold text-[#9C5C00]" /> */}
    </div>
  );
}
