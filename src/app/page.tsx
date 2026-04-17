import { getCategories, getFeaturedCollections } from "@/lib/data";
import Hero from "@/components/home/Hero";
import CategoryCard from "@/components/category/CategoryCard";
import FeaturedSection from "@/components/home/FeaturedSection";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { FaWhatsapp } from "react-icons/fa6";

export default async function Home() {
  const categories = await getCategories();
  const featuredCollections = await getFeaturedCollections();

  return (
    <>
      <Hero />

      <Section className="bg-transparent">
        <Container>
          <div className="flex flex-col items-center text-center mb-14 max-w-2xl mx-auto">
            <span className="text-[#2E8B57] font-bold tracking-wider uppercase text-sm mb-3">
              Categorias
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-950 font-serif leading-tight">
              Tudo o que a natureza tem de bom.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </Section>

      {featuredCollections.map((collection) => (
        <FeaturedSection
          key={collection.id}
          title={collection.title}
          subtitle={collection.subtitle}
          products={collection.products}
          bgColor="bg-transparent"
        />
      ))}

      <Section className="bg-green-700 text-white text-center">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Pronto para uma vida mais saudável?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Visite nossa loja física ou faça seu pedido online e receba no conforto da sua casa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5551999999999'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-medium bg-white text-green-800 hover:bg-green-50 transition-colors shadow-lg"
            >
              <FaWhatsapp className="w-6 h-6 text-green-600" />
              Pedir pelo WhatsApp
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
