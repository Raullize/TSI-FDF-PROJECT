import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import Button from '../ui/Button';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const rating = product.rating || 0;
  
  const discountPercentage = product.promotionalPrice 
    ? Math.round(((product.price - product.promotionalPrice) / product.price) * 100)
    : 0;
  
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
          <div className="absolute top-3 left-3 bg-green-700 text-green-50 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
            Mais Vendidos
          </div>
        )}
        
        {discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
            -{discountPercentage}%
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="grow">
          {/* Preços */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-medium text-gray-900">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice || product.price)}
            </span>
            {product.promotionalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </span>
            )}
          </div>

          {/* Título */}
          <h3 className="font-medium text-lg text-gray-900 mb-1 group-hover:text-amber-900 transition-colors">
            {product.name}
          </h3>

          {/* Avaliações (Estrelas) */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating 
                      ? 'fill-gray-900 text-gray-900' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              {product.reviewCount ? `(${product.reviewCount})` : 'Sem avaliações'}
            </span>
          </div>

          {/* Descrição e Unidade */}
          <p className="text-sm text-gray-500 line-clamp-1 mb-2">
            {product.description}
          </p>
          <p className="text-xs font-medium text-amber-700 bg-amber-50 inline-block px-2 py-1 rounded-md mb-2">
            {product.unit}
          </p>
        </div>
        
        {/* Botão de Compra */}
        <Button 
          variant="outline" 
          fullWidth 
          className="rounded-full border-gray-300 text-gray-900 hover:bg-gray-50 font-normal"
        >
          Comprar agora
        </Button>
      </div>
    </div>
  );
}
