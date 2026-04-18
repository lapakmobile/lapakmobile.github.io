export type Category = 'Game' | 'Digital' | 'Sosmed' | 'Streaming' | 'Apps' | 'Jasa';

export interface Product {
  id: string;
  name: string;
  category: Category;
  image: string;
  packages: {
    name: string;
    price: string;
    isRealTime?: boolean;
  }[];
  isBestSeller?: boolean;
  isRealTime?: boolean;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  packageName: string;
  price: string;
  date: string;
  status: 'Pending' | 'Success' | 'Processing';
  paymentMethod?: string;
  transactionId?: string;
}
