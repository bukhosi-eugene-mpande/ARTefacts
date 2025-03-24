import { title } from '@/components/primitives';
import Image from 'next/image';
import logo from '@/public/assets/logo.svg';

export default function MuseumPage() {
  return (
    <div>
      <Image src={logo} alt="Logo" />
      <h2 className={title()}>Museum</h2>
      
      <h2 className={title()}>Artists</h2>

    </div>
  );
}
