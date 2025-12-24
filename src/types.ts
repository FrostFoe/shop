export type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  licenseTypes?: string[];
  supportPeriods?: string[];
  description: string;
};

export type CartItem = {
  product: Product;
  selectedLicenseType?: string;
  selectedSupportPeriod?: string;
  quantity: number;
};