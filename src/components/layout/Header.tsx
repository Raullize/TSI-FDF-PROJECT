import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { Flower2, ShoppingCart } from 'lucide-react';
import CartSidebar from '../cart/CartSidebar';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-yellow-100">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Flower2 className="w-8 h-8 text-amber-600" />
            <span className="text-xl md:text-2xl font-bold text-amber-900 font-serif">
              Armazém Girassol
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-amber-900 font-medium transition-colors">
              Início
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-amber-900 font-medium transition-colors">
              Produtos
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-amber-900 font-medium transition-colors">
              Sobre Nós
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-amber-900 p-2 rounded-full hover:bg-yellow-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            <CartSidebar>
              <button className="relative text-gray-600 hover:text-amber-900 p-2 rounded-full hover:bg-yellow-50 transition-colors group">
                <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-600 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
              </button>
            </CartSidebar>

            <div className="hidden md:block">
              <Button size="sm" variant="secondary">
                Ver Produtos
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
