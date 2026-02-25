import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGetProducts } from '../hooks/useQueries';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from '@tanstack/react-router';

export function TrendingCollections() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { data: products, isLoading } = useGetProducts();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-etchly-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${titleVisible ? 'active' : ''} text-center mb-16`}
        >
          <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase mb-3">Curated for You</p>
          <h2 className="font-cormorant text-5xl text-etchly-charcoal">Trending Collections</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full bg-etchly-white/60" />
                  <Skeleton className="h-5 w-3/4 bg-etchly-white/60" />
                  <Skeleton className="h-3 w-1/3 bg-etchly-white/60" />
                </div>
              ))
            : (products ?? []).map((product, i) => (
                <ProductCardReveal key={product.id} product={product} delay={i * 100} />
              ))}
        </div>

        <div className="text-center mt-14">
          <button
            onClick={() => navigate({ to: '/catalog' })}
            className="font-montserrat text-xs tracking-[0.3em] uppercase border border-etchly-charcoal text-etchly-charcoal px-10 py-4 hover:bg-etchly-charcoal hover:text-etchly-white transition-all duration-300"
          >
            View All Pieces
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductCardReveal({ product, delay }: { product: any; delay: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <ProductCard product={product} />
    </div>
  );
}
