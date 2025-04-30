import Image from 'next/image';

import { title } from '@/components/primitives';
import logo from '@/public/assets/logo.svg';

export default function MuseumPage() {
  return (
    <div>
      <Image alt="Logo" src={logo} />
      <h2 className={title()}>Museum</h2>

      <h2 className={title()}>Artists</h2>
    </div>
  );
}
