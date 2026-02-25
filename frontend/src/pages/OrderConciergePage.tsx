import React, { useState } from 'react';
import { useGetOrderStatus } from '../hooks/useQueries';
import { OrderStatusTracker } from '../components/OrderStatusTracker';
import { Search, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function OrderConciergePage() {
  const [inputValue, setInputValue] = useState('');
  const [submittedId, setSubmittedId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  const { data: status, isLoading, isError } = useGetOrderStatus(submittedId, hasSearched && !!submittedId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setSubmittedId(inputValue.trim());
    setHasSearched(true);
  };

  return (
    <main className="min-h-screen bg-etchly-white pt-24 pb-32">
      <div className="max-w-2xl mx-auto px-6">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${titleVisible ? 'active' : ''} text-center mb-14`}
        >
          <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase mb-3">
            Order Concierge
          </p>
          <h1 className="font-cormorant text-5xl text-etchly-charcoal">Track Your Order</h1>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
          <p className="font-montserrat text-sm text-etchly-charcoal/50 mt-4 leading-relaxed">
            Enter your order number to see the current status of your ETCHLY piece.
          </p>
          <p className="font-montserrat text-xs text-gold/70 mt-2">
            Try: order12345 · order67890 · order54321
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-10">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Enter order number..."
            className="flex-1 border border-border bg-transparent px-5 py-3.5 font-montserrat text-sm text-etchly-charcoal placeholder:text-etchly-charcoal/30 focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="flex items-center gap-2 bg-gold text-etchly-white font-montserrat text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-gold"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-etchly-white/40 border-t-etchly-white rounded-full animate-spin" />
            ) : (
              <Search size={16} />
            )}
            Track
          </button>
        </form>

        {hasSearched && !isLoading && (
          <div className="animate-fade-up">
            {isError ? (
              <div className="flex items-center gap-3 border border-destructive/30 bg-destructive/5 px-5 py-4 rounded-none">
                <AlertCircle size={18} className="text-destructive flex-shrink-0" />
                <div>
                  <p className="font-montserrat text-sm text-etchly-charcoal font-medium">Order not found</p>
                  <p className="font-montserrat text-xs text-etchly-charcoal/50 mt-0.5">
                    Please check your order number and try again.
                  </p>
                </div>
              </div>
            ) : status !== undefined ? (
              <OrderStatusTracker status={status} orderId={submittedId} />
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
