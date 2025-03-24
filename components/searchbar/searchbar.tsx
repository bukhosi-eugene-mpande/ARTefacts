import { Input } from '@heroui/react';
import React from 'react';

import { SearchIcon } from '../icons';

interface SearchbarProps {
  children?: React.ReactNode;
}

export default function Searchbar() {
  return (
    <div className="px-8 rounded-2xl w-full flex justify-center items-center text-white">
      <Input
        isClearable
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60',
          ],
          innerWrapper: 'bg-transparent',
          // inputWrapper: [
          //   'shadow-xl',
          //   'bg-default-200/50',
          //   'dark:bg-default/60',
          //   'backdrop-blur-xl',
          //   'backdrop-saturate-200',
          //   'hover:bg-default-200/70',
          //   'dark:hover:bg-default/70',
          //   'group-data-[focus=true]:bg-default-200/50',
          //   'dark:group-data-[focus=true]:bg-default/60',
          //   '!cursor-text',
          // ],
        }}
        // label="Search"
        placeholder="Type to search..."
        radius="lg"
        startContent={<SearchIcon className="text-black text-xl" />}
      />
    </div>
  );
}
