import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.slug}`} className="group block text-center">
      <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:border-yellow-300 group-hover:shadow-lg transition-all duration-300">
        <Image
          src={category.image.replace('/public', '')}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      <h3 className="font-medium text-gray-800 group-hover:text-amber-900 transition-colors">
        {category.name}
      </h3>
    </Link>
  );
}
