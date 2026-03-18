export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  unit: string;
  isBestSeller: boolean;
  image: string;
  stock: number;
}

export interface FeaturedCollection {
  id: string;
  title: string;
  subtitle: string;
  productIds: number[];
}

export interface DbSchema {
  categories: Category[];
  products: Product[];
  featuredCollections: FeaturedCollection[];
}
