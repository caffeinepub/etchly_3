import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { CustomizationRuleModal } from './CustomizationRuleModal';

interface StickyAddToBagBarProps {
  productName: string;
  selectedMaterial: string;
  materialPrice: number;
  engravingText: string;
  productId: string;
  imageUrl: string;
  onAddToBag: () => void;
}

export function StickyAddToBagBar({
  productName,
  selectedMaterial,
  materialPrice,
  engravingText,
  onAddToBag,
}: StickyAddToBagBarProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleAgree = () => {
    setModalOpen(false);
    onAddToBag();
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-etchly-white/95 backdrop-blur-md border-t border-gold/20 shadow-gold-lg">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:flex flex-col min-w-0">
            <p className="font-cormorant text-lg text-etchly-charcoal leading-tight truncate">{productName}</p>
            <div className="flex items-center gap-3">
              <span className="font-montserrat text-xs text-etchly-charcoal/50">{selectedMaterial}</span>
              {engravingText && (
                <span className="font-montserrat text-xs text-gold italic truncate max-w-[160px]">
                  "{engravingText}"
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <span className="font-cormorant text-2xl text-etchly-charcoal font-semibold">
              ${materialPrice.toFixed(2)}
            </span>
            <button
              onClick={handleClick}
              className="flex items-center gap-2 bg-gold text-etchly-white font-montserrat text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-gold-dark transition-colors shadow-gold whitespace-nowrap"
            >
              <ShoppingBag size={16} />
              Add to Bag
            </button>
          </div>
        </div>
      </div>

      <CustomizationRuleModal
        isOpen={modalOpen}
        onAgree={handleAgree}
        onCancel={handleCancel}
      />
    </>
  );
}
