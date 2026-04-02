"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '../ui/Button';
import { MOCK_CART_ITEMS } from './mock';

export default function CartSidebar({ children }: { children: React.ReactNode }) {
  const subtotalOriginal = MOCK_CART_ITEMS.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const subtotalComDesconto = MOCK_CART_ITEMS.reduce((acc, item) => {
    const itemPrice = item.promotionalPrice || item.price;
    return acc + (itemPrice * item.quantity);
  }, 0);

  const totalDesconto = subtotalOriginal - subtotalComDesconto;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-yellow-100">
        <SheetHeader className="p-6 border-b border-gray-100 bg-white">
          <SheetTitle className="flex items-center gap-2 text-amber-900 font-serif text-2xl">
            <ShoppingCart className="w-6 h-6" />
            Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        {/* Lista de Produtos */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="flex flex-col gap-4">
            {MOCK_CART_ITEMS.map((item) => {
              const currentPrice = item.promotionalPrice || item.price;
              
              return (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative group">
                  <button className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1.5 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col grow justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 line-clamp-1 pr-4">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.unit}</p>
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg">
                        <button className="p-1.5 text-gray-500 hover:text-amber-900 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button className="p-1.5 text-gray-500 hover:text-amber-900 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right flex flex-col">
                        {item.promotionalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                          </span>
                        )}
                        <span className="font-bold text-green-800">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé / Checkout */}
        <SheetFooter className="p-6 bg-white border-t border-gray-100 flex-col gap-4">
          <div className="flex flex-col w-full gap-2 mb-2">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="line-through">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotalOriginal)}
              </span>
            </div>
            
            {totalDesconto > 0 && (
              <div className="flex justify-between items-center text-sm text-amber-600 font-medium">
                <span>Desconto aplicado</span>
                <span>
                  - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDesconto)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center w-full mt-2 pt-2 border-t border-gray-100">
              <span className="text-gray-900 font-bold">Total</span>
              <span className="text-2xl font-bold text-green-800">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotalComDesconto)}
              </span>
            </div>
          </div>
          
          <SheetClose asChild>
            <Link href="/cart" className="w-full">
              <Button className="w-full py-6 text-lg rounded-xl shadow-md">
                Ver Carrinho
              </Button>
            </Link>
          </SheetClose>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            Taxas e frete calculados no Carrinho
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}