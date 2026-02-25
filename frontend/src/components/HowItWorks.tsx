import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Camera, Zap, Package } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    number: '01',
    title: 'Upload Your Photo',
    description: 'Share a cherished image or personal message. Our system prepares it for precision laser etching.',
  },
  {
    icon: Zap,
    number: '02',
    title: 'Laser Etching',
    description: 'Our 2026 laser technology etches your design with micron-level precision onto your chosen material.',
  },
  {
    icon: Package,
    number: '03',
    title: 'Delivered to You',
    description: 'Hand-polished and inspected, your piece arrives in luxury packaging, ready to be treasured.',
  },
];

function StepCard({ step, delay }: { step: typeof steps[0]; delay: number }) {
  const { ref, isVisible } = useScrollReveal();
  const Icon = step.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${isVisible ? 'active' : ''} text-center px-6`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 border border-gold/40 rounded-full mb-6 text-gold">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <p className="font-montserrat text-[10px] tracking-[0.3em] text-gold uppercase mb-2">{step.number}</p>
      <h3 className="font-cormorant text-2xl text-etchly-charcoal mb-3">{step.title}</h3>
      <p className="font-montserrat text-sm text-etchly-charcoal/60 leading-relaxed max-w-xs mx-auto">
        {step.description}
      </p>
    </div>
  );
}

export function HowItWorks() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-etchly-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${titleVisible ? 'active' : ''} text-center mb-16`}
        >
          <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase mb-3">The Process</p>
          <h2 className="font-cormorant text-5xl text-etchly-charcoal">How It Works</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-gold/20" />
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} delay={i * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}
