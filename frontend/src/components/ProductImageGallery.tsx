import React, { useState } from 'react';
import { ZoomableImage } from './ZoomableImage';

const MATERIAL_IMAGES: Record<string, string[]> = {
  '18K Gold': [
    '/assets/generated/product-gold-medallion.dim_800x800.png',
    '/assets/generated/product-gold-medallion-alt.dim_800x800.png',
  ],
  'Rose Gold': [
    '/assets/generated/product-rose-gold-pendant.dim_800x800.png',
    '/assets/generated/product-rose-gold-pendant-alt.dim_800x800.png',
  ],
  '925 Silver': [
    '/assets/generated/product-silver-disc.dim_800x800.png',
    '/assets/generated/product-silver-disc-alt.dim_800x800.png',
  ],
  'Platinum': [
    '/assets/generated/product-platinum-medallion.dim_800x800.png',
    '/assets/generated/product-platinum-medallion-alt.dim_800x800.png',
  ],
};

const PRODUCT_IMAGES: Record<string, string[]> = {
  product1: [
    '/assets/generated/product-gold-medallion.dim_800x800.png',
    '/assets/generated/product-gold-medallion-alt.dim_800x800.png',
  ],
  product2: [
    '/assets/generated/product-rose-gold-pendant.dim_800x800.png',
    '/assets/generated/product-rose-gold-pendant-alt.dim_800x800.png',
  ],
  product3: [
    '/assets/generated/product-silver-disc.dim_800x800.png',
    '/assets/generated/product-silver-disc-alt.dim_800x800.png',
  ],
  product4: [
    '/assets/generated/product-platinum-medallion.dim_800x800.png',
    '/assets/generated/product-platinum-medallion-alt.dim_800x800.png',
  ],
};

interface ProductImageGalleryProps {
  productId: string;
  selectedMaterial: string;
  productName: string;
}

export function ProductImageGallery({ productId, selectedMaterial, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images =
    MATERIAL_IMAGES[selectedMaterial] ||
    PRODUCT_IMAGES[productId] || [
      '/assets/generated/product-gold-medallion.dim_800x800.png',
      '/assets/generated/product-gold-medallion-alt.dim_800x800.png',
    ];

  const mainImage = images[activeIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square bg-etchly-cream overflow-hidden">
        <ZoomableImage
          src={mainImage}
          alt={productName}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-20 h-20 overflow-hidden border-2 transition-all flex-shrink-0 ${
              i === activeIndex ? 'border-gold' : 'border-transparent hover:border-gold/40'
            }`}
          >
            <img
              src={img}
              alt={`${productName} view ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
