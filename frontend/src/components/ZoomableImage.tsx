import React from 'react';
import { useLightbox } from '../hooks/useLightbox';
import { ImageLightbox } from './ImageLightbox';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ZoomableImage({ src, alt, className = '', containerClassName = '' }: ZoomableImageProps) {
  const { isOpen, imageSrc, open, close } = useLightbox();

  return (
    <>
      <div className={`zoom-container ${containerClassName}`}>
        <img
          src={src}
          alt={alt}
          className={`zoom-image w-full h-full object-cover ${className}`}
          onClick={() => open(src)}
        />
      </div>
      <ImageLightbox isOpen={isOpen} imageSrc={imageSrc} onClose={close} />
    </>
  );
}
