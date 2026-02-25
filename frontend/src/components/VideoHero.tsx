import React, { useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';

export function VideoHero() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Video / Fallback */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/generated/hero-banner.dim_1920x1080.png"
      >
        {/* No actual video source — poster image serves as fallback */}
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-etchly-charcoal/60 via-etchly-charcoal/40 to-etchly-charcoal/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-montserrat text-xs tracking-[0.4em] text-gold uppercase mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Luxury Laser-Etched Jewelry
        </p>
        <h1
          className="font-cormorant text-7xl md:text-9xl text-etchly-white font-light leading-none tracking-tight mb-6 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          ETCHLY
        </h1>
        <p
          className="font-cormorant text-xl md:text-2xl text-etchly-white/80 italic mb-10 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          Crafted by Light. Perfected by Hand.
        </p>
        <button
          onClick={() => navigate({ to: '/catalog' })}
          className="font-montserrat text-xs tracking-[0.3em] uppercase bg-transparent border border-gold text-gold px-10 py-4 hover:bg-gold hover:text-etchly-white transition-all duration-300 animate-fade-up shadow-gold"
          style={{ animationDelay: '0.8s' }}
        >
          Explore Collection
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: '1.2s' }}>
        <span className="font-montserrat text-[10px] tracking-widest text-etchly-white/50 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}
