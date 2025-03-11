'use client';

import React from 'react';
import {
  CubeTransparentIcon,
  ArrowLeftIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Divider,
  Image,
} from '@heroui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ArtefactPage() {
  const images = [
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652366604/docs/demo_image5.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg',
  ];

  return (
    <div className="flex flex-col justify-start gap-4 py-8 md:py-10">
      <div className="flex flex-row justify-between text-black w-full">
        <ArrowLeftIcon className="size-6 dark:text-white" />
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Artefact</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="flex md:flex-col flex-row justify-between w-full">
        <Image
          alt="artefact"
          className="w-full pr-4 h-[40vh]"
          radius="none"
          src="https://mg.co.za/wp-content/uploads/2019/02/baf968fa-resistance-against-the-repatriation-of-african-artefacts.jpeg"
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <Button isIconOnly>
              <CubeTransparentIcon className="size-8" />
            </Button>
            <Button isIconOnly>
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button isIconOnly>
              <ChevronLeftIcon className="size-8" />
            </Button>
            <Button isIconOnly>
              <ChevronRightIcon className="size-8" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {images.map((image, index) => (
          <Image
            key={index}
            alt="artefact"
            className="w-fit "
            radius="none"
            src={image}
          />
        ))}
      </div>
      <div>
        <p className="text-sm text-gray-400">Artist</p>
        <p className="text-lg ">Artist Name</p>
      </div>
      <Divider />
      <div>
        <p className="text-lg">Description</p>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
        </p>
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <p className="text-heading">More by the Artist</p>
          <Button>View All</Button>
        </div>
        <div className="flex flex-row gap-4 flex-wrap my-6">
          {images.map((image, index) => (
            <div key={index} className="mb-1">
              <Image
                key={index}
                alt="artefact"
                className="w-[42.5vw] mb-1"
                radius="none"
                src={image}
              />
              <p className="font-thin">Lorem Ipsum</p>
              <p className="text-gray-400">Artist</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
