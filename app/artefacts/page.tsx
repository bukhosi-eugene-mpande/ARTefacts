'use client';

import React from 'react';

import { ExpandableCard } from '@/components/artefactInfo/artefactInfo';
import Searchbar from '@/components/searchbar';
import Header from '@/components/header';
import Artefactcard from '@/components/artefactcard/artefactcard';

export default function ArtefactPage() {
  const images = [
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652366604/docs/demo_image5.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg',
  ];

  return (
    <div className="flex flex-col items-center justify-start gap-4 md:py-10">
      <Header />
      <Searchbar />
      <div className="mb-4 flex w-full flex-col items-center justify-center">
        <h1 className="text-3xl text-[#D8A730]">EXHIBITIONS</h1>
        <div className="h-36 w-full bg-gray-300" />
      </div>
      <div className="flex w-full flex-col items-center">
        <h1 className="text-3xl text-[#D8A730]">ARTEFACTS</h1>
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((image, index) => (
            <div key={index} >
              <Artefactcard />
            </div>
          ))}
        </div>
      </div>
      {/* <ExpandableCard /> */}
    </div>
  );
}
