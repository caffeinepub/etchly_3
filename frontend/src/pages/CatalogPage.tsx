import React from 'react';
import { useGetProducts } from '../hooks/useQueries';
import { ProductCard } from '../components/ProductCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Skeleton } from '@/components/ui/skeleton';

function RevealCard({ product, delay }: { product: any; delay: number }) {
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

export function CatalogPage() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { data: products, isLoading } = useGetProducts();

  return (
    <main className="min-h-screen bg-etchly-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${titleVisible ? 'active' : ''} text-center mb-16`}
        >
          <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase mb-3">
            The Collection
          </p>
          <h1 className="font-cormorant text-6xl text-etchly-charcoal">ETCHLY Pieces</h1>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
          <p className="font-montserrat text-sm text-etchly-charcoal/50 mt-4 max-w-md mx-auto leading-relaxed">
            Each piece is uniquely crafted with precision laser technology and traditional hand-polishing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              ))
            : (products ?? []).map((product, i) => (
                <RevealCard key={product.id} product={product} delay={i * 80} />
              ))}
        </div>
      </div>
    </main>
  );
}
