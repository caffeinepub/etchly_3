import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { CartItem } from '../hooks/useCart';
import { PaymentIcons } from './PaymentIcons';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onRemove: (id: string) => void;
}

export function CartSidebar({ isOpen, onClose, items, subtotal, onRemove }: CartSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-etchly-charcoal/40 z-[90] backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-etchly-white z-[100] shadow-gold-lg flex flex-col transition-transform duration-350 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
          <h2 className="font-cormorant text-2xl text-etchly-charcoal tracking-wide">Your Bag</h2>
          <button
            onClick={onClose}
            className="text-etchly-charcoal/60 hover:text-gold transition-colors p-1"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-cormorant text-2xl text-etchly-charcoal/40 mb-2">Your bag is empty</p>
              <p className="font-montserrat text-xs text-etchly-charcoal/30">
                Add a piece to begin your journey
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gold/10">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-etchly-cream">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant text-lg text-etchly-charcoal leading-tight">
                      {item.productName}
                    </p>
                    <p className="font-montserrat text-xs text-etchly-charcoal/60 mt-0.5">
                      {item.selectedMaterial}
                    </p>
                    {item.engravingText && (
                      <p className="font-montserrat text-xs text-gold mt-0.5 italic truncate">
                        "{item.engravingText}"
                      </p>
                    )}
                    <p className="font-montserrat text-sm font-semibold text-etchly-charcoal mt-1">
                      ${item.materialPrice.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-etchly-charcoal/30 hover:text-destructive transition-colors self-start mt-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-5 border-t border-gold/20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-montserrat text-sm text-etchly-charcoal/70">Subtotal</span>
            <span className="font-cormorant text-2xl text-etchly-charcoal font-semibold">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <button
            className="w-full bg-gold text-etchly-white font-montserrat text-xs tracking-widest uppercase py-4 hover:bg-gold-dark transition-colors shadow-gold"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
          <PaymentIcons className="mt-2" />
        </div>
      </div>
    </>
  );
}
