import React, { useState } from 'react';
import { PhotoUploadModal } from './PhotoUploadModal';
import { Camera, X } from 'lucide-react';

interface PhotoLabProps {
  onPhotoChange: (dataUrl: string | null) => void;
  uploadedPhoto: string | null;
}

export function PhotoLab({ onPhotoChange, uploadedPhoto }: PhotoLabProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-etchly-charcoal/50 mb-4">
        Photo Lab
      </p>

      {uploadedPhoto ? (
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/40 flex-shrink-0">
            <img
              src={uploadedPhoto}
              alt="Uploaded"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center top' }}
            />
          </div>
          <div className="flex-1">
            <p className="font-montserrat text-xs text-etchly-charcoal/70">Photo ready for etching</p>
            <p className="font-montserrat text-[10px] text-gold mt-0.5">✓ Face detected & centered</p>
          </div>
          <button
            onClick={() => onPhotoChange(null)}
            className="text-etchly-charcoal/30 hover:text-destructive transition-colors"
            aria-label="Remove photo"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-3 border border-dashed border-gold/40 text-etchly-charcoal/50 hover:border-gold hover:text-gold transition-all px-5 py-3.5 font-montserrat text-xs tracking-wide w-full justify-center"
        >
          <Camera size={16} strokeWidth={1.5} />
          Upload Photo
        </button>
      )}

      <PhotoUploadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={dataUrl => {
          onPhotoChange(dataUrl);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
