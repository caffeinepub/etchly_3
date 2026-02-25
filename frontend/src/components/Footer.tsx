import React from 'react';
import { Link } from '@tanstack/react-router';
import { PaymentIcons } from './PaymentIcons';
import { Heart } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'etchly');

  return (
    <footer className="bg-etchly-charcoal text-etchly-white/80 pt-16 pb-8 mt-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img
              src="/assets/generated/etchly-logo.dim_400x120.png"
              alt="ETCHLY"
              className="h-10 mb-4 brightness-0 invert"
            />
            <p className="font-montserrat text-sm text-etchly-white/60 leading-relaxed max-w-xs">
              Luxury laser-etched jewelry crafted with precision. Every piece tells your story.
            </p>
          </div>
          <div>
            <h4 className="font-cormorant text-lg text-gold mb-4 tracking-wide">Navigate</h4>
            <ul className="space-y-2 font-montserrat text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="hover:text-gold transition-colors">Collection</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/track" className="hover:text-gold transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-cormorant text-lg text-gold mb-4 tracking-wide">Support</h4>
            <ul className="space-y-2 font-montserrat text-sm">
              <li><span className="text-etchly-white/50 cursor-default">FAQ</span></li>
              <li><span className="text-etchly-white/50 cursor-default">Shipping</span></li>
              <li><span className="text-etchly-white/50 cursor-default">Returns Policy</span></li>
              <li><span className="text-etchly-white/50 cursor-default">Contact</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-etchly-white/10 pt-8 mb-6">
          <p className="font-montserrat text-xs text-etchly-white/40 text-center mb-4 uppercase tracking-widest">
            Secure Payments
          </p>
          <PaymentIcons />
        </div>

        <div className="border-t border-etchly-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-montserrat text-xs text-etchly-white/40">
            © {year} ETCHLY. All rights reserved.
          </p>
          <p className="font-montserrat text-xs text-etchly-white/40 flex items-center gap-1">
            Built with <Heart size={12} className="text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
