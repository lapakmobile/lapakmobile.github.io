export type Category = 'AI Tools' | 'Prompt AI' | 'Ebook' | 'Template' | 'Video Editing' | 'Marketing' | 'Social Media' | 'Software' | 'Course' | 'Subscription' | 'Game' | 'Games' | 'Digital' | 'Sosmed' | 'Streaming' | 'Apps' | 'Jasa' | 'Services';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description?: string;
  image: string;
  price?: string;
  originalPrice?: string;
  sales?: number;
  packages: {
    id: string;
    name: string;
    price: string;
    isRealTime?: boolean;
  }[];
  isBestSeller?: boolean;
  features?: string[];
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
