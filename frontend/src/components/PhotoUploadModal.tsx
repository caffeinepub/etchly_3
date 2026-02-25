import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Upload } from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (imageDataUrl: string) => void;
}

export function PhotoUploadModal({ isOpen, onClose, onConfirm }: PhotoUploadModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (preview) {
      onConfirm(preview);
      setPreview(null);
      onClose();
    }
  };

  const handleClose = () => {
    setPreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-sm bg-etchly-white border border-gold/30 rounded-none shadow-gold-lg">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-2xl text-etchly-charcoal">Photo Lab</DialogTitle>
          <DialogDescription className="font-montserrat text-xs text-etchly-charcoal/50">
            Upload a photo to be laser-etched onto your piece.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {/* Circular crop preview */}
          <div
            className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gold/40 bg-etchly-cream flex items-center justify-center cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="Upload preview"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-etchly-charcoal/30 group-hover:text-gold transition-colors">
                <Upload size={28} strokeWidth={1.5} />
                <span className="font-montserrat text-[10px] tracking-widest uppercase">Upload Photo</span>
              </div>
            )}
            {/* Face detection overlay hint */}
            {preview && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-24 border-2 border-gold/60 rounded-full opacity-70" />
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {!preview && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="font-montserrat text-xs tracking-widest uppercase border border-gold text-gold px-6 py-2.5 hover:bg-gold hover:text-etchly-white transition-all"
            >
              Choose Photo
            </button>
          )}

          {preview && (
            <p className="font-montserrat text-[10px] text-gold tracking-wide text-center">
              ✓ Face centered — ready to etch
            </p>
          )}
        </div>

        <DialogFooter className="flex flex-col gap-2">
          <button
            onClick={handleConfirm}
            disabled={!preview}
            className="w-full bg-gold text-etchly-white font-montserrat text-xs tracking-widest uppercase py-3.5 hover:bg-gold-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-gold"
          >
            Confirm Photo
          </button>
          <button
            onClick={handleClose}
            className="w-full font-montserrat text-xs text-etchly-charcoal/50 hover:text-etchly-charcoal transition-colors py-2 underline underline-offset-2"
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
