'use client';

import { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

import ExpandableCard from '@/components/artefactInfo/artefactInfo';
import { Artefact } from '@/app/actions/artefacts/artefacts.types';

export default function CameraLayout() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const testData: Artefact = {
    ImageUrl:
      label === 'Controller'
        ? '/assets/controller.glb'
        : '/assets/lego_spiderman.glb',
    AdditionalInfo:
      label === 'Controller' ? 'Ps4 controller' : 'Lego spiderman dude.',
    ArtistLifespan: 'uhmm',
    ArtistName: label === 'Controller' ? 'Sony' : 'Stan Lee',
    CatalogNumber: '1234',
    ArtworkTitle:
      label === 'Controller' ? 'Ps4 controller' : 'Lego spiderman dude.',
    Category: label === 'Controller' ? 'Technology' : 'Superheroes',
    CreationYear: label === 'Controller' ? '2013' : '2002',
    ID: 1234567890,
    MediumFoundry: 'Seraching idk',
  };

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    initCamera();
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = '/model/model.json'; // Replace with your path
      const metadataURL = '/model/metadata.json'; // Replace with your path

      const loadedModel = await tmImage.load(modelURL, metadataURL);

      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (model && videoRef.current) {
      interval = setInterval(async () => {
        if (!videoRef.current) return;

        const prediction = await model.predict(videoRef.current);
        const topPrediction = prediction.find((p) => p.probability > 0.9);

        if (topPrediction) {
          setLabel(topPrediction.className);
          setShowCard(true);
        }
      }, 1000);
    }

    return () => clearInterval(interval as unknown as number);
  }, [model]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // transform: 'scaleX(-1)',
        }}
      />

      {/* Back arrow (top-left) */}
      <button
        style={{
          position: 'absolute',
          top: '2%',
          left: '4%',
          zIndex: 20,
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '50%',
          padding: '0.5rem 0.7rem',
          color: 'white',
          fontSize: '1.5rem',
        }}
        onClick={() => window.history.back()}
      >
        ←
      </button>

      {/* Image (top-right) */}
      <img
        alt="Top right"
        src="/Logo-512.png"
        style={{
          position: 'absolute',
          top: '2%',
          right: '4%',
          zIndex: 20,
          width: '40px',
          height: '40px',
          objectFit: 'cover',
          borderRadius: '50%',
          // border: '2px solid white',
        }}
      />

      {showCard && (
        <>
          <ExpandableCard
            confetti={true}
            data={testData}
            onClose={() => {
              setLabel(null);
              setShowCard(false);
            }}
          />
        </>
      )}
    </div>
  );
}
