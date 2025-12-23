export type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  description: string;
};

export type CartItem = {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
};
