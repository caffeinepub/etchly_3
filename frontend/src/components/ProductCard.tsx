import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Product } from '../backend';
import { useLightbox } from '../hooks/useLightbox';
import { ImageLightbox } from './ImageLightbox';

const PRODUCT_IMAGES: Record<string, { primary: string; alt: string }> = {
  product1: {
    primary: '/assets/generated/product-gold-medallion.dim_800x800.png',
    alt: '/assets/generated/product-gold-medallion-alt.dim_800x800.png',
  },
  product2: {
    primary: '/assets/generated/product-rose-gold-pendant.dim_800x800.png',
    alt: '/assets/generated/product-rose-gold-pendant-alt.dim_800x800.png',
  },
  product3: {
    primary: '/assets/generated/product-silver-disc.dim_800x800.png',
    alt: '/assets/generated/product-silver-disc-alt.dim_800x800.png',
  },
  product4: {
    primary: '/assets/generated/product-platinum-medallion.dim_800x800.png',
    alt: '/assets/generated/product-platinum-medallion-alt.dim_800x800.png',
  },
};

interface ProductCardProps {
  product: Product;
  style?: React.CSSProperties;
  className?: string;
}

export function ProductCard({ product, style, className = '' }: ProductCardProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const { isOpen, imageSrc, open, close } = useLightbox();

  const images = PRODUCT_IMAGES[product.id] || {
    primary: '/assets/generated/product-gold-medallion.dim_800x800.png',
    alt: '/assets/generated/product-gold-medallion-alt.dim_800x800.png',
  };

  const displayedImage = hovered ? images.alt : images.primary;
  const basePrice = product.materials[0]?.priceUSD ?? 0;

  return (
    <>
      <div
        className={`group cursor-pointer ${className}`}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="zoom-container aspect-square bg-etchly-cream overflow-hidden mb-4"
          onClick={() => open(displayedImage)}
        >
          <img
            src={displayedImage}
            alt={product.name}
            className="zoom-image w-full h-full object-cover transition-all duration-500"
          />
        </div>
        <div
          className="px-1"
          onClick={() => navigate({ to: '/product/$id', params: { id: product.id } })}
        >
          <h3 className="font-cormorant text-xl text-etchly-charcoal group-hover:text-gold transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="font-montserrat text-xs text-etchly-charcoal/50 mt-1">
            From ${basePrice.toFixed(2)}
          </p>
        </div>
      </div>
      <ImageLightbox isOpen={isOpen} imageSrc={imageSrc} onClose={close} />
    </>
  );
}
