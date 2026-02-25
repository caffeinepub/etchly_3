import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Collection' },
    { to: '/about', label: 'Our Story' },
    { to: '/track', label: 'Track Order' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-etchly-white/95 backdrop-blur-md shadow-xs border-b border-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/generated/etchly-logo.dim_400x120.png"
            alt="ETCHLY"
            className={`h-8 transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-montserrat text-xs tracking-widest uppercase transition-colors duration-200 ${
                scrolled
                  ? 'text-etchly-charcoal hover:text-gold'
                  : 'text-etchly-white hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onCartOpen}
            className={`relative p-2 transition-colors ${
              scrolled ? 'text-etchly-charcoal hover:text-gold' : 'text-etchly-white hover:text-gold'
            }`}
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-etchly-white text-[10px] font-montserrat font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className={`md:hidden p-2 transition-colors ${
              scrolled ? 'text-etchly-charcoal' : 'text-etchly-white'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-etchly-white border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="font-montserrat text-xs tracking-widest uppercase text-etchly-charcoal hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
