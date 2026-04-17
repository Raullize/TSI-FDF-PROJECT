import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-transparent overflow-hidden">
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
            <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-[#FDBA24] text-amber-950 font-bold text-lg px-8 py-3.5 rounded-full shadow-lg hover:bg-yellow-400 transition-colors w-full sm:w-auto">
              Ver Produtos
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center bg-[#FFFDF4] text-amber-950 font-bold text-lg px-8 py-3.5 rounded-full border border-amber-200/50 shadow-md hover:bg-white transition-colors w-full sm:w-auto">
              Conheça a loja
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
