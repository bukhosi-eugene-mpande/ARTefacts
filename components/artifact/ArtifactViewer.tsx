import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Extending JSX to support the 'model-viewer' HTML element for rendering 3D models
// This ensures TypeScript recognizes 'model-viewer' attributes like src, auto-rotate, and AR
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          alt: string;
          'auto-rotate'?: boolean;
          'camera-controls'?: boolean;
          ar?: boolean;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

// Props interface for the ArtifactViewer component
interface ArtifactViewerProps {
  height?: number; // Optional height for the artifact viewer
  width?: number; // Optional width for the artifact viewer
  artifactUrl: string; // URL to the image or 3D model file
  altnativeText: string; // Alternative text for accessibility
  artifactClass?: string; // Optional additional CSS classes
  category: 'Image' | 'Object'; // Determines whether to render an image or a 3D object
}

const ArtifactViewer: React.FC<ArtifactViewerProps> = ({
  height,
  width,
  artifactUrl,
  altnativeText,
  artifactClass = '',
  category,
}) => {
  // Ref to ensure the model viewer library is only imported once
  const modelViewerLoaded = useRef(false);

  useEffect(() => {
    if (!modelViewerLoaded.current) {
      import('@google/model-viewer'); // Dynamically import the model viewer library
      modelViewerLoaded.current = true;
    }
  }, []);

  return (
    <>
      {/* Render an image if the category is 'Image' */}
      {category === 'Image' ? (
        <div
          className={`relative w-full ${height ? '' : 'aspect-[1/1]'}`}
          style={{ height: height ? `${height}px` : 'auto' }}
        >
          <img
            alt={altnativeText}
            className={`cursor-pointer border-2 border-gray-50 ${artifactClass}`}
            // fill={!width && !height} // Only use 'fill' if width and height are not defined
            height={height || undefined}
            src={artifactUrl}
            width={width || undefined}
          />
        </div>
      ) : (
        // Render a 3D model viewer if the category is 'Object'
        <div
          className={`relative w-full ${height ? '' : 'aspect-[1/1]'} bg-gray-300 pb-16`}
          style={{ height: height ? `${height}px` : 'auto' }}
        >
          <model-viewer
            ar // Enables AR mode if supported
            auto-rotate // Auto-rotates the 3D model
            camera-controls // Allows user interaction with the model
            alt={altnativeText}
            className={artifactClass}
            src={artifactUrl}
            style={{
              width: width ? `${width}px` : '100%',
              height: height ? `${height}px` : '100%',
            }}
          />
        </div>
      )}
    </>
  );
};

export default ArtifactViewer;
