import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { MapPin, Phone, Mail, Flower2 } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-50 border-t border-amber-100 pt-16 pb-8 text-amber-900/80">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flower2 className="w-8 h-8 text-amber-600" />
              <span className="text-xl font-bold text-amber-900 font-serif">
                Armazém Girassol
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Levando saúde e bem-estar para sua mesa com produtos naturais selecionados com carinho.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-amber-200/50 rounded-full flex items-center justify-center text-amber-900 hover:bg-amber-300 hover:text-amber-950 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="WhatsApp" className="w-10 h-10 bg-amber-200/50 rounded-full flex items-center justify-center text-amber-900 hover:bg-amber-300 hover:text-amber-950 transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-amber-900 mb-4">Loja</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-green-700 transition-colors">Todos os Produtos</Link></li>
              <li><Link href="/products?category=temperos" className="hover:text-green-700 transition-colors">Temperos</Link></li>
              <li><Link href="/products?category=graos" className="hover:text-green-700 transition-colors">Grãos e Sementes</Link></li>
              <li><Link href="/products?category=chas" className="hover:text-green-700 transition-colors">Chás</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-amber-900 mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-green-700 transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contact" className="hover:text-green-700 transition-colors">Contato</Link></li>
              <li><Link href="/faq" className="hover:text-green-700 transition-colors">Dúvidas Frequentes</Link></li>
              <li><Link href="/privacy" className="hover:text-green-700 transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-amber-900 mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <span>Rua das Flores, 123<br />Centro, Charqueadas - RS</span>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <Phone className="w-5 h-5 text-amber-700 shrink-0" />
                <span>(51) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <Mail className="w-5 h-5 text-amber-700 shrink-0" />
                <span>contato@armazemgirassol.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-200/50 pt-8 flex justify-center items-center text-sm text-center">
          <p>&copy; {currentYear} Armazém Girassol. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
