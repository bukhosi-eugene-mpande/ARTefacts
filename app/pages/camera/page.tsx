'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import Image from 'next/image';
import { useWindowSize } from 'react-use';
import Link from 'next/link';

import { Artefact } from '@/app/actions/artefacts/artefacts.types';
import Logo from '@/public/assets/logo-gold.png';
import helpBtn from '@/public/assets/helpBtn.png';
import HowToPlayModal from '@/components/HowToPlayModal';

export default function Camera({ _children }: { _children: ReactNode }) {
  const { width, height } = useWindowSize();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const [showWelcome, setShowWelcome] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
    setShowWelcome(false);
    setShowTutorial(false);
  };

  const handleShowTutorial = () => {
    setShowTutorial(true);
    setShowWelcome(false);
  };

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
      const modelURL = '/model/model.json';
      const metadataURL = '/model/metadata.json';

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
          console.log('Detected:', topPrediction.className);
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
        }}
      />

      {/* blur background if tutorial/welcome is visible */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: showTutorial || showWelcome ? 'blur(10px)' : 'none',
          WebkitBackdropFilter:
            showTutorial || showWelcome ? 'blur(10px)' : 'none',
          backgroundColor:
            showTutorial || showWelcome ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
          zIndex: 10,
        }}
      />

      {/* Help button */}
      {gameStarted && (
        <button
          aria-label="Toggle how to play"
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '4%',
            zIndex: 20,
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
          }}
          onClick={() => {
            setShowTutorial((prev) => !prev);
            setShowWelcome(false);
          }}
        >
          <Image
            alt="Help button"
            height={50}
            src={helpBtn}
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
            width={50}
          />
        </button>
      )}

      {/* Top-right logo */}
      <Link href="/pages/home">
        <Image
          alt="Top right logo"
          height={40}
          src="/Logo-512.png"
          style={{
            position: 'absolute',
            top: '2%',
            right: '4%',
            zIndex: 20,
            objectFit: 'cover',
            borderRadius: '50%',
          }}
          width={40}
        />
      </Link>

      {/* Artefact card */}
      {showCard && <div className="text-white">{label} detected!</div>}

      {/* Welcome modal */}
      {showWelcome && (
        <>
          <div
            className="text-center text-2xl text-white"
            style={{
              width: '80%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '2rem',
              borderRadius: '15px',
            }}
          >
            Welcome to
            <br />
            <Image alt="Logo" src={Logo} />
            Treasure Hunt
          </div>

          <button
            aria-label="Start the game"
            style={{
              position: 'absolute',
              bottom: '30%',
              left: '32%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '1rem',
              borderRadius: '15px',
              opacity: 0,
              animation: 'fadeIn 1s ease-in-out 1s forwards',
              cursor: 'pointer',
              color: 'white',
              fontSize: '20px',
            }}
            onClick={handleStartGame}
          >
            Start
          </button>

          <button
            aria-label="Show how to play instructions"
            style={{
              position: 'absolute',
              bottom: '30%',
              left: '65%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '1rem',
              borderRadius: '15px',
              opacity: 0,
              animation: 'fadeIn 1s ease-in-out 1s forwards',
              cursor: 'pointer',
              color: 'white',
              fontSize: '20px',
            }}
            onClick={handleShowTutorial}
          >
            How to play
          </button>
        </>
      )}

      {/* Tutorial modal */}
      <HowToPlayModal
        gameStarted={gameStarted}
        setShowTutorial={setShowTutorial}
        setShowWelcome={setShowWelcome}
        showTutorial={showTutorial}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
