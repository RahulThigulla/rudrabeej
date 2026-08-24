export type MukhiCount = 
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

export type ProductCategory = 
  | 'single-beads'
  | 'malas'
  | 'copper-chains'
  | 'gift-sets'
  | 'meditation'
  | 'rare-collector';

export type ProductBadge = 'NEW' | 'BESTSELLER' | 'LIMITED' | 'PREMIUM' | 'HANDPICKED' | 'RARE HEIRLOOM';

export interface ProductImage {
  url: string;
  alt: string;
  type: 'main' | 'packaging' | 'closeup' | 'lifestyle' | 'scale' | 'second-life';
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sanskritName?: string;
  shortDescription: string;
  description: string;
  story: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  thumbnail: string;
  category: ProductCategory;
  mukhi?: MukhiCount;
  size: string; // e.g. "18-20mm", "7mm (108+1 beads)"
  weight?: string; // e.g. "4.2g"
  origin: string; // e.g. "Himalayan Foothills"
  material: string; // e.g. "Natural Elaeocarpus ganitrus, Pure Copper"
  availability: 'in-stock' | 'low-stock' | 'pre-order';
  stock: number;
  rating: number;
  reviewCount: number;
  badges?: ProductBadge[];
  features: string[];
  traditionalSignificance: string[];
  howToUse: string[];
  careInstructions: string[];
  authenticityInformation: string[];
  packagingInformation: {
    description: string;
    secondLifeUse: string;
    materials: string[];
  };
  shippingInformation: {
    dispatchTime: string;
    deliveryTime: string;
    freeShippingThreshold: number;
  };
  specifications: ProductSpecification[];
  reviews: Review[];
  createdAt: string;
}

export interface MukhiInfo {
  mukhi: MukhiCount;
  name: string;
  sanskritTitle: string;
  summary: string;
  rulingDeity: string;
  traditionalAssociation: string;
  planetaryAssociation?: string;
  mantra: string;
  description: string;
  whoShouldWear: string;
  image: string;
  relatedProductSlug?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: 'Rudraksha' | 'Indian Traditions' | 'Craftsmanship' | 'Mindful Living' | 'Packaging' | 'Sustainability';
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export type OrderStatus = 'placed' | 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'authenticity' | 'care' | 'packaging' | 'orders' | 'gifting';
}

export interface BulkEnquiry {
  name: string;
  company?: string;
  email: string;
  phone: string;
  quantity: number;
  eventType: string;
  budgetRange: string;
  customizationDetails: string;
  message?: string;
}
