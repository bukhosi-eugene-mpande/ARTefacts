'use client';

import React from 'react';

import { ExpandableCard } from '@/components/artefactInfo/artefactInfo';

export default function ArtefactPage() {
  const images = [
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652366604/docs/demo_image5.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg',
  ];

  return (
    <div className="flex flex-col justify-start gap-4 md:py-10">
      <ExpandableCard />
    </div>
  );
}
