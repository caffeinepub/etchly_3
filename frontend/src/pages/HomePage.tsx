import React from 'react';
import { VideoHero } from '../components/VideoHero';
import { HowItWorks } from '../components/HowItWorks';
import { TrendingCollections } from '../components/TrendingCollections';

export function HomePage() {
  return (
    <main>
      <VideoHero />
      <HowItWorks />
      <TrendingCollections />
    </main>
  );
}
