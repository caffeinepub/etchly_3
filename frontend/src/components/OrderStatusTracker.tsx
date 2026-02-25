import React from 'react';
import { OrderStatus } from '../backend';
import { Check } from 'lucide-react';

interface OrderStatusTrackerProps {
  status: OrderStatus;
  orderId: string;
}

const stages = [
  { key: OrderStatus.designing, label: 'Designing', description: 'Your piece is being designed' },
  { key: OrderStatus.etching, label: 'Etching', description: 'Laser etching in progress' },
  { key: OrderStatus.shipped, label: 'Shipped', description: 'On its way to you' },
];

function getStageIndex(status: OrderStatus): number {
  return stages.findIndex(s => s.key === status);
}

export function OrderStatusTracker({ status, orderId }: OrderStatusTrackerProps) {
  const activeIndex = getStageIndex(status);

  return (
    <div className="bg-etchly-white border border-gold/20 p-8 rounded-none shadow-gold">
      <div className="flex items-center justify-between mb-2">
        <p className="font-montserrat text-xs text-etchly-charcoal/50 tracking-widest uppercase">Order</p>
        <p className="font-cormorant text-lg text-gold">#{orderId}</p>
      </div>

      <div className="relative mt-8">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 right-0 h-px bg-gold/20" />
        <div
          className="absolute top-5 left-0 h-px bg-gold transition-all duration-700"
          style={{ width: `${(activeIndex / (stages.length - 1)) * 100}%` }}
        />

        <div className="relative flex justify-between">
          {stages.map((stage, i) => {
            const isCompleted = i < activeIndex;
            const isActive = i === activeIndex;
            const isFuture = i > activeIndex;

            return (
              <div key={stage.key} className="flex flex-col items-center gap-3 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                    isCompleted
                      ? 'bg-gold border-gold text-etchly-white'
                      : isActive
                      ? 'bg-etchly-white border-gold text-gold shadow-gold'
                      : 'bg-etchly-white border-gold/20 text-etchly-charcoal/30'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={2.5} />
                  ) : (
                    <span className="font-montserrat text-xs font-bold">{i + 1}</span>
                  )}
                </div>
                <div className="text-center">
                  <p
                    className={`font-cormorant text-lg leading-tight ${
                      isActive ? 'text-gold' : isCompleted ? 'text-etchly-charcoal' : 'text-etchly-charcoal/30'
                    }`}
                  >
                    {stage.label}
                  </p>
                  <p className={`font-montserrat text-[10px] mt-0.5 ${isActive ? 'text-etchly-charcoal/60' : 'text-etchly-charcoal/30'}`}>
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
