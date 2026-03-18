import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative bg-amber-50 overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-full h-full bg-[url('/images/banners/sunflowers.webp')] bg-cover bg-center" />
      </div>

      <Container className="relative z-10 py-20 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight mb-6 font-serif">
            O a granel mais <span className="text-yellow-600">queridinho</span> da região.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-lg">
            Dê um giro na sua vida com os produtos naturais do Armazém Girassol. Qualidade, frescor e carinho em cada grão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-yellow-200/50">
                Ver Produtos
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm border-amber-900/30 hover:bg-white/80">
                Conheça Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
