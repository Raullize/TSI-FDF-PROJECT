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

      <Section className="bg-[#FCF9EE]">
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

      {featuredCollections.map((collection, index) => (
        <FeaturedSection
          key={collection.id}
          title={collection.title}
          subtitle={collection.subtitle}
          products={collection.products}
          bgColor={index % 2 === 0 ? "bg-transparent" : "bg-[#FCF9EE]"}
        />
      ))}
    </>
  );
}
