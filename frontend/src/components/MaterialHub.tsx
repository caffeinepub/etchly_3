import React from 'react';
import { Material } from '../backend';

interface MaterialHubProps {
  materials: Material[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const MATERIAL_COLORS: Record<string, string> = {
  '18K Gold': '#C9A84C',
  'Rose Gold': '#B76E79',
  '925 Silver': '#A8A9AD',
  'Platinum': '#E5E4E2',
  'Walnut': '#7B4F2E',
  'Hard Maple': '#D4A96A',
  'Lowball Glass': '#A8D8EA',
  'Highball Glass': '#B8D8E8',
  'Bamboo': '#C8B560',
  'Marble': '#E8E8E8',
  'Slate': '#708090',
  'Cork': '#C4A882',
};

export function MaterialHub({ materials, selectedIndex, onSelect }: MaterialHubProps) {
  return (
    <div>
      <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-etchly-charcoal/50 mb-4">
        Select Material
      </p>
      <div className="flex flex-wrap gap-3">
        {materials.map((material, i) => {
          const isSelected = i === selectedIndex;
          const color = MATERIAL_COLORS[material.title] || '#C9A84C';
          return (
            <button
              key={material.title}
              onClick={() => onSelect(i)}
              className={`group flex items-center gap-2.5 px-4 py-2.5 border transition-all duration-200 font-montserrat text-xs tracking-wide ${
                isSelected
                  ? 'border-gold bg-gold/5 text-etchly-charcoal shadow-gold'
                  : 'border-border text-etchly-charcoal/60 hover:border-gold/50 hover:text-etchly-charcoal'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0 border border-etchly-charcoal/10"
                style={{ backgroundColor: color }}
              />
              {material.title}
              {isSelected && (
                <span className="text-gold font-semibold ml-1">${material.priceUSD.toFixed(2)}</span>
              )}
            </button>
          );
        })}
      </div>
      {materials[selectedIndex] && (
        <p className="font-cormorant text-3xl text-etchly-charcoal mt-4">
          ${materials[selectedIndex].priceUSD.toFixed(2)}
        </p>
      )}
    </div>
  );
}
