import React from 'react';

const paymentMethods = [
  { name: 'VISA', label: 'Visa' },
  { name: 'MC', label: 'Mastercard' },
  { name: 'AMEX', label: 'Amex' },
  { name: 'DISCOVER', label: 'Discover' },
  { name: 'JCB', label: 'JCB' },
  { name: 'DINERS', label: 'Diners' },
  { name: 'APPLEPAY', label: 'Apple Pay' },
  { name: 'GOOGLEPAY', label: 'Google Pay' },
  { name: 'PAYPAL', label: 'PayPal' },
  { name: 'KLARNA', label: 'Klarna' },
  { name: 'AFTERPAY', label: 'Afterpay' },
];

function PaymentBadge({ name, label }: { name: string; label: string }) {
  return (
    <div
      className="flex items-center justify-center px-2 py-1 rounded border border-border bg-white/60 grayscale opacity-60 hover:opacity-90 transition-opacity"
      title={label}
      style={{ minWidth: 48, height: 28 }}
    >
      <span className="font-montserrat text-[9px] font-bold tracking-wider text-etchly-charcoal uppercase select-none">
        {name}
      </span>
    </div>
  );
}

export function PaymentIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {paymentMethods.map(m => (
        <PaymentBadge key={m.name} name={m.name} label={m.label} />
      ))}
    </div>
  );
}
