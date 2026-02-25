import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface CustomizationRuleModalProps {
  isOpen: boolean;
  onAgree: () => void;
  onCancel: () => void;
}

export function CustomizationRuleModal({ isOpen, onAgree, onCancel }: CustomizationRuleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={open => { if (!open) onCancel(); }}>
      <DialogContent className="max-w-md bg-etchly-white border border-gold/30 rounded-none shadow-gold-lg">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-2xl text-etchly-charcoal tracking-wide">
            Customization Policy
          </DialogTitle>
          <DialogDescription className="font-montserrat text-sm text-etchly-charcoal/70 leading-relaxed mt-3">
            I understand that ETCHLY begins production 24 hours after my order and that customized items cannot be returned.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gold/20">
          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
            <span className="text-gold text-lg">⚡</span>
          </div>
          <p className="font-montserrat text-xs text-etchly-charcoal/50">
            Production begins within 24 hours. Each piece is uniquely crafted for you.
          </p>
        </div>
        <DialogFooter className="flex flex-col gap-2 mt-4">
          <button
            onClick={onAgree}
            className="w-full bg-gold text-etchly-white font-montserrat text-xs tracking-widest uppercase py-3.5 hover:bg-gold-dark transition-colors shadow-gold"
          >
            I Agree &amp; Continue
          </button>
          <button
            onClick={onCancel}
            className="w-full font-montserrat text-xs text-etchly-charcoal/50 hover:text-etchly-charcoal transition-colors py-2 underline underline-offset-2"
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
