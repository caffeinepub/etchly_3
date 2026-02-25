import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';

function PullQuote({ text }: { text: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${isVisible ? 'active' : ''} border-l-2 border-gold pl-8 py-2 my-8`}
    >
      <p className="font-cormorant text-2xl md:text-3xl text-etchly-charcoal italic leading-relaxed">
        "{text}"
      </p>
    </div>
  );
}

function ContentSection({
  number,
  title,
  body,
  quote,
  delay = 0,
}: {
  number: string;
  title: string;
  body: string;
  quote: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${isVisible ? 'active' : ''} max-w-2xl`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase mb-3">{number}</p>
      <h2 className="font-cormorant text-4xl text-etchly-charcoal mb-4">{title}</h2>
      <p className="font-montserrat text-sm text-etchly-charcoal/65 leading-relaxed">{body}</p>
      <PullQuote text={quote} />
    </div>
  );
}

export function ArtisanStoryPage() {
  const parallax = useParallax(0.3);
  const { ref: heroTextRef, isVisible: heroTextVisible } = useScrollReveal();

  return (
    <main className="min-h-screen bg-etchly-white">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ ...parallax, willChange: 'transform' }}
        >
          <img
            src="/assets/generated/artisan-story-hero.dim_1600x900.png"
            alt="Artisan crafting jewelry"
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-etchly-charcoal/50 via-etchly-charcoal/30 to-etchly-charcoal/60" />
        <div
          ref={heroTextRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${heroTextVisible ? 'active' : ''} relative z-10 text-center px-6 max-w-3xl`}
        >
          <p className="font-montserrat text-[10px] tracking-[0.5em] text-gold uppercase mb-4">
            The Etchly Method
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl text-etchly-white font-light leading-tight">
            Crafted by Light.<br />Perfected by Hand.
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-6" />
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-24">
          <ContentSection
            number="01 — Technology"
            title="2026 Laser Precision"
            body="ETCHLY harnesses the most advanced laser etching technology available in 2026. Our proprietary system operates at micron-level precision, capable of reproducing the finest details of a photograph — every eyelash, every smile line — permanently onto precious metal. The laser never touches the surface; it sculpts it with light."
            quote="We don't engrave. We sculpt with photons."
            delay={0}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video overflow-hidden">
              <img
                src="/assets/generated/laser-detail-texture.dim_800x600.png"
                alt="Laser etching detail"
                className="w-full h-full object-cover"
              />
            </div>
            <ContentSection
              number="02 — Craft"
              title="Traditional Hand-Polishing"
              body="After the laser completes its work, each piece passes through the hands of our master polishers. Using techniques passed down through generations of jewelers, they bring out the mirror-like luster that makes ETCHLY pieces unmistakable. This marriage of 2026 technology and timeless craft is what we call The Etchly Method."
              quote="Technology creates the detail. Human hands create the soul."
              delay={100}
            />
          </div>

          <ContentSection
            number="03 — Promise"
            title="The Quality Guarantee"
            body="Every ETCHLY piece is inspected under 10× magnification before it leaves our studio. We guarantee the integrity of every etch, the purity of every material, and the permanence of every memory we help you preserve. If your piece ever fails to meet our standard, we remake it — no questions asked."
            quote="A memory this precious deserves a guarantee as strong as the metal it's etched on."
            delay={0}
          />
        </div>
      </section>
    </main>
  );
}
