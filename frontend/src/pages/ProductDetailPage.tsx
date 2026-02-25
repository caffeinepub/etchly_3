import React, { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useGetProductById } from '../hooks/useQueries';
import { ProductImageGallery } from '../components/ProductImageGallery';
import { MaterialHub } from '../components/MaterialHub';
import { PhotoLab } from '../components/PhotoLab';
import { EngravingPreview } from '../components/EngravingPreview';
import { StickyAddToBagBar } from '../components/StickyAddToBagBar';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PRODUCT_IMAGES: Record<string, string> = {
  product1: '/assets/generated/product-gold-medallion.dim_800x800.png',
  product2: '/assets/generated/product-rose-gold-pendant.dim_800x800.png',
  product3: '/assets/generated/product-silver-disc.dim_800x800.png',
  product4: '/assets/generated/product-platinum-medallion.dim_800x800.png',
};

interface ProductDetailPageProps {
  onAddToBag: (item: {
    productId: string;
    productName: string;
    selectedMaterial: string;
    materialPrice: number;
    engravingText: string;
    imageUrl: string;
  }) => void;
}

export function ProductDetailPage({ onAddToBag }: ProductDetailPageProps) {
  const { id } = useParams({ from: '/product/$id' });
  const { data: product, isLoading } = useGetProductById(id);

  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [engravingText, setEngravingText] = useState('');

  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-etchly-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-etchly-white pt-24 flex items-center justify-center">
        <p className="font-cormorant text-3xl text-etchly-charcoal/40">Product not found</p>
      </main>
    );
  }

  const selectedMaterial = product.materials[selectedMaterialIndex];
  const imageUrl = PRODUCT_IMAGES[product.id] || '/assets/generated/product-gold-medallion.dim_800x800.png';

  const handleAddToBag = () => {
    onAddToBag({
      productId: product.id,
      productName: product.name,
      selectedMaterial: selectedMaterial?.title ?? '',
      materialPrice: selectedMaterial?.priceUSD ?? 0,
      engravingText,
      imageUrl,
    });
  };

  return (
    <main className="min-h-screen bg-etchly-white pt-24 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-24">
            <ProductImageGallery
              productId={product.id}
              selectedMaterial={selectedMaterial?.title ?? ''}
              productName={product.name}
            />
          </div>

          {/* Right: Customization Studio */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className={`reveal ${rightVisible ? 'active' : ''} space-y-10`}
          >
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase mb-2">
                Customization Studio
              </p>
              <h1 className="font-cormorant text-4xl md:text-5xl text-etchly-charcoal leading-tight">
                {product.name}
              </h1>
              <p className="font-montserrat text-sm text-etchly-charcoal/60 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="w-full h-px bg-gold/20" />

            {/* Material Hub */}
            <MaterialHub
              materials={product.materials}
              selectedIndex={selectedMaterialIndex}
              onSelect={setSelectedMaterialIndex}
            />

            <div className="w-full h-px bg-gold/20" />

            {/* Photo Lab */}
            <PhotoLab
              uploadedPhoto={uploadedPhoto}
              onPhotoChange={setUploadedPhoto}
            />

            <div className="w-full h-px bg-gold/20" />

            {/* Engraving Preview */}
            <EngravingPreview
              engravingText={engravingText}
              onEngravingChange={setEngravingText}
            />
          </div>
        </div>
      </div>

      {/* Sticky Add to Bag */}
      {selectedMaterial && (
        <StickyAddToBagBar
          productName={product.name}
          selectedMaterial={selectedMaterial.title}
          materialPrice={selectedMaterial.priceUSD}
          engravingText={engravingText}
          productId={product.id}
          imageUrl={imageUrl}
          onAddToBag={handleAddToBag}
        />
      )}
    </main>
  );
}
