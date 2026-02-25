import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

export function ImageLightbox({ isOpen, imageSrc, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-etchly-charcoal/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-etchly-white hover:text-gold transition-colors z-10 bg-etchly-charcoal/60 rounded-full p-2"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>
      <div
        className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt="Product detail"
          className="max-w-full max-h-[90vh] object-contain shadow-gold-lg rounded"
        />
      </div>
    </div>
  );
}
