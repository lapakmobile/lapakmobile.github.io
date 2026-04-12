export type Category = 'Game' | 'Digital' | 'Sosmed' | 'Streaming' | 'Apps' | 'Jasa';

export interface Product {
  id: string;
  name: string;
  category: Category;
  image: string;
  packages: {
    name: string;
    price: string;
  }[];
  isBestSeller?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
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
}
