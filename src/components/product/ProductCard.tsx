import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image.replace('/public', '')}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-green-700 text-green-50 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            Mais Vendido
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col grow">
        <div className="grow">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
            {product.unit}
          </p>
          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-amber-900 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1 mb-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
          <span className="text-lg font-bold text-green-800">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </span>

          <Button size="sm" className="rounded-lg px-3!">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
