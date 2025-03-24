'use client';

import { useEffect } from 'react';
import Swiper from 'swiper';

import ArtifactViewer from '@/components/artifact/ArtifactViewer';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

export default function ProductPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const swiperThumb = new Swiper('.product-thumb', {
        loop: true,
        spaceBetween: 12,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });

      new Swiper('.product-prev', {
        loop: true,
        spaceBetween: 32,
        effect: 'fade',
        thumbs: {
          swiper: swiperThumb,
        },
      });
    }
  }, []);

  const artifacts = [
    {
      type: 'Object',
      url: '/assets/car.glb',
      alt: 'Car',
      id: 'art0',
    },
    {
      type: 'Image',
      url: 'https://pagedone.io/asset/uploads/1700471851.png',
      alt: 'Yellow Travel Bag',
      id: 'art1',
    },
    {
      type: 'Image',
      url: 'https://pagedone.io/asset/uploads/1711514857.png',
      alt: 'Yellow Travel Bag',
      id: 'art2',
    },
    {
      type: 'Image',
      url: 'https://pagedone.io/asset/uploads/1711514875.png',
      alt: 'Yellow Travel Bag',
      id: 'art3',
    },
    {
      type: 'Image',
      url: 'https://pagedone.io/asset/uploads/1711514892.png',
      alt: 'Yellow Travel Bag',
      id: 'art4',
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Details Section */}
          <div className="pro-detail w-full flex flex-col justify-center order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
            <p className="font-medium text-lg mb-4">
              Lorem Ipsum &nbsp; / &nbsp; Lorem Ipsum
            </p>
            <h2 className="mb-2 font-bold text-3xl leading-10 text-gray-900">
              Art
            </h2>
            <h3 className="mb-2 font-bold text-2xl leading-10 text-gray-900">
              Artist
            </h3>
            <p className="text-gray-500 text-base font-normal mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed nisl facilisis, luctus nisl ut, egestas lorem. Donec elementum
              bibendum augue. Duis facilisis consectetur sollicitudin. Phasellus
              ultricies ultrices nulla, dictum vulputate arcu condimentum sit
              amet. In metus nunc, feugiat ac volutpat vel, condimentum quis
              purus
            </p>
            <p className="text-gray-500 text-base font-normal mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed nisl facilisis, luctus nisl ut, egestas lorem. Donec elementum
              bibendum augue. Duis facilisis consectetur sollicitudin. Phasellus
              ultricies ultrices nulla, dictum vulputate arcu condimentum sit
              amet. In metus nunc, feugiat ac volutpat vel, condimentum quis
              purus
            </p>
          </div>

          {/* Product Image Section */}
          <div>
            <div className="swiper product-prev mb-6">
              <div className="swiper-wrapper">
                {artifacts.map((artifact) => (
                  <div key={artifact.id} className="swiper-slide">
                    <ArtifactViewer
                      altnativeText={artifact.alt}
                      artifactUrl={artifact.url}
                      category={artifact.type as 'Image' | 'Object'}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="swiper product-thumb max-w-[608px] mx-auto">
              <div className="swiper-wrapper">
                {artifacts.map((artifact) => (
                  <div key={artifact.id} className="swiper-slide">
                    <ArtifactViewer
                      altnativeText={artifact.alt}
                      artifactUrl={artifact.url}
                      category={artifact.type as 'Image' | 'Object'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
