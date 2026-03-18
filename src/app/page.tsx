import { getCategories, getFeaturedCollections } from "@/lib/data";
import Hero from "@/components/home/Hero";
import CategoryCard from "@/components/category/CategoryCard";
import FeaturedSection from "@/components/home/FeaturedSection";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default async function Home() {
  const categories = await getCategories();
  const featuredCollections = await getFeaturedCollections();

  return (
    <>
      <Hero />

      <Section className="bg-white">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-amber-900 font-serif mb-2">
              Nossas Categorias
            </h2>
            <p className="text-gray-600">Explore nossa variedade de produtos naturais</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </Section>

      {featuredCollections.map((collection, index) => (
        <FeaturedSection
          key={collection.id}
          title={collection.title}
          subtitle={collection.subtitle}
          products={collection.products}
          bgColor={index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}
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
              href="https://wa.me/5551999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-medium bg-white text-green-800 hover:bg-green-50 transition-colors shadow-lg"
            >
              Pedir pelo WhatsApp
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
