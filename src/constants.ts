import { Product } from './types';

export const WHATSAPP_NUMBER = '6289650006000';

export const CATEGORIES = [
  'All',
  'AI Tools',
  'Prompt AI',
  'Streaming',
  'Apps',
  'Subscription',
  'Ebook',
  'Template',
  'Video Editing',
  'Marketing',
  'Social Media',
  'Software',
  'Course',
  'Games',
  'Services'
] as const;

export const AI_TOOLS_LIST = [
  { id: 'article', name: 'Artikel Generator', icon: 'FileText', description: 'Buat artikel SEO berkualitas dalam hitungan detik.' },
  { id: 'wa-link', name: 'Link WA Generator', icon: 'Link', description: 'Buat link WhatsApp dengan pesan otomatis & QR Code.' },
  { id: 'content', name: 'Content Idea Generator', icon: 'Lightbulb', description: 'Dapatkan ide konten viral untuk berbagai platform.' },
  { id: 'caption', name: 'Caption Generator', icon: 'MessageSquare', description: 'Buat caption menarik & viral untuk sosial media.' },
  { id: 'youtube', name: 'YouTube Description', icon: 'Youtube', description: 'Optimasi deskripsi video YouTube kamu agar naik di pencarian.' },
  { id: 'keyword', name: 'Keyword Generator', icon: 'Search', description: 'Temukan keyword SEO terbaik untuk niche kamu.' },
  { id: 'email', name: 'Email Copywriter', icon: 'Mail', description: 'Buat copy email profesional untuk sales & marketing.' },
  { id: 'audio', name: 'Audio to Text', icon: 'Mic', description: 'Konversi suara atau video menjadi teks dengan akurat.' }
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'openai-chatgpt-pro',
    name: 'ChatGPT Plus Premium',
    category: 'AI Tools',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 50.000',
    originalPrice: 'Rp 49.000',
    description: 'Akses penuh ke GPT-4, DALL-E, dan fitur Pro lainnya.',
    features: ['GPT-4 Access', 'DALL-E Integration', 'Fast Response'],
    rating: 4.9,
    sales: 1240,
    packages: [
      { id: 'gpt-1', name: '1 Bulan Shared', price: 'Rp 50.000' },
      { id: 'gpt-2', name: '1 Bulan Private', price: 'Rp 300.000' }
    ]
  },
  {
    id: 'google-gemini-pro',
    name: 'Gemini Advanced Pro',
    category: 'AI Tools',
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5c6a1d?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 35.000',
    originalPrice: 'Rp 280.000',
    description: 'Model AI tercanggih dari Google untuk kreativitas dan penalaran.',
    rating: 4.8,
    sales: 520,
    packages: [{ id: 'gemini-1', name: '1 Bulan Private', price: 'Rp 35.000' }]
  },
  {
    id: 'youtube-premium-ind',
    name: 'YouTube Premium No Ads',
    category: 'Streaming',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 10.000',
    originalPrice: 'Rp 59.000',
    description: 'Nonton YouTube tanpa iklan, putar di latar belakang, dan download.',
    rating: 4.9,
    sales: 8900,
    packages: [
      { id: 'yt-1', name: '1 Bulan Family', price: 'Rp 10.000' },
      { id: 'yt-2', name: '1 Bulan Individual', price: 'Rp 25.000' }
    ]
  },
  {
    id: 'spotify-premium-acc',
    name: 'Spotify Premium Individual',
    category: 'Streaming',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 12.000',
    originalPrice: 'Rp 54.990',
    description: 'Download musik, tanpa iklan, dan kualitas audio maksimal.',
    rating: 5.0,
    sales: 12500,
    packages: [
      { id: 'spot-1', name: '1 Bulan Plan', price: 'Rp 12.000' },
      { id: 'spot-2', name: '3 Bulan Plan', price: 'Rp 30.000' }
    ]
  },
  {
    id: 'disney-hotstar-acc',
    name: 'Disney+ Hotstar Premium',
    category: 'Streaming',
    image: 'https://images.unsplash.com/photo-1596720426673-e483d4924d63?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 15.000',
    originalPrice: 'Rp 49.000',
    description: 'Akses film Marvel, Disney, Pixar, dan series favorit lainnya.',
    rating: 4.7,
    sales: 4200,
    packages: [{ id: 'disney-1', name: '1 Bulan Sharing', price: 'Rp 15.000' }]
  },
  {
    id: 'getcontact-premium-acc',
    name: 'Getcontact Premium',
    category: 'Apps',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 15.000',
    originalPrice: 'Rp 49.000',
    description: 'Cek nama tag kontak, identifikasi spam, dan fitur premium lainnya.',
    features: ['Remove Spam', 'Identify Tags', 'Premium Badge'],
    rating: 4.6,
    sales: 2100,
    packages: [{ id: 'get-1', name: '1 Bulan Premium', price: 'Rp 15.000' }]
  },
  {
    id: 'canva-pro-invite',
    name: 'Canva Pro',
    category: 'Apps',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 10.000',
    originalPrice: 'Rp 49.000',
    description: 'Semua fitur premium Canva terbuka selamanya.',
    isBestSeller: true,
    features: ['Tanpa Watermark', 'Templates Premium', 'Invite Team'],
    rating: 5.0,
    sales: 5600,
    packages: [{ id: 'canva-1', name: 'Lifetime Access', price: 'Rp 10.000' }]
  },
  {
    id: 'seo-writing-masterclass',
    name: 'SEO Writing Masterclass 2024',
    category: 'Course',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1d1?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 99.000',
    originalPrice: 'Rp 499.000',
    description: 'Belajar cara menulis artikel yang tembus halaman 1 Google.',
    rating: 4.8,
    sales: 850,
    packages: [{ id: 'course-1', name: 'Full Access', price: 'Rp 99.000' }]
  },
  {
    id: 'ai-prompt-bundle',
    name: '1000+ AI Prompts for Business',
    category: 'Prompt AI',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 29.000',
    originalPrice: 'Rp 150.000',
    description: 'Kumpulan prompt sakti untuk ChatGPT, Midjourney, dan lainnya.',
    rating: 4.7,
    sales: 2100,
    packages: [{ id: 'prompt-1', name: 'Bundle Pack', price: 'Rp 29.000' }]
  },
  {
    id: 'capcut-pro-invite',
    name: 'Capcut Pro',
    category: 'Apps',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 15.000',
    originalPrice: 'Rp 49.000',
    description: 'Unlock semua fitur Pro CapCut tanpa watermark.',
    features: ['Semua Font Pro', 'Efek Eksklusif', 'Cloud Storage'],
    rating: 4.9,
    sales: 3200,
    packages: [{ id: 'capcut-1', name: '1 Tahun Access', price: 'Rp 15.000' }]
  },
  {
    id: 'topup-ml-bb',
    name: 'Mobile Legends: Bang Bang',
    category: 'Games',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 1.500',
    originalPrice: 'Rp 5.000',
    description: 'Top up Diamond Mobile Legends termurah dan tercepat.',
    features: ['Proses Instan', 'Lengkap & Murah', '24 Jam Nonstop'],
    rating: 5.0,
    sales: 45000,
    packages: [
      { id: 'ml-1', name: '5 Diamonds', price: 'Rp 1.500' },
      { id: 'ml-2', name: '12 Diamonds', price: 'Rp 3.500' },
      { id: 'ml-3', name: '28 Diamonds', price: 'Rp 8.000' }
    ]
  },
  {
    id: 'topup-hok-global',
    name: 'Honor of Kings Global',
    category: 'Games',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 1.200',
    originalPrice: 'Rp 4.500',
    description: 'Top up Tokens Honor of Kings Global murah meriah.',
    features: ['Auto Masuk', 'Banyak Promo', 'Aman 100%'],
    rating: 4.9,
    sales: 12000,
    packages: [{ id: 'hok-1', name: '8 Tokens', price: 'Rp 1.200' }]
  },
  {
    id: 'sewa-grup-fb-active',
    name: 'Sewa Grup Facebook Aktif',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 50.000',
    originalPrice: 'Rp 100.000',
    description: 'Sewa grup FB untuk jualan dengan member jutaan & aktif.',
    features: ['Grup Aktif & Rame', 'High Reach', 'Izin Post Jualan'],
    rating: 4.8,
    sales: 120,
    packages: [{ id: 'sewa-fb-1', name: '1 Bulan Sewa', price: 'Rp 50.000' }]
  },
  {
    id: 'jasa-rekber-trusted',
    name: 'Jasa Rekber Terpercaya',
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400',
    price: 'Rp 5.000',
    originalPrice: 'Rp 15.000',
    description: 'Jasa rekening bersama aman untuk transaksi digital kamu.',
    features: ['Sangat Aman', 'Terbukti Terpercaya', 'Fast Respond'],
    rating: 5.0,
    sales: 8500,
    packages: [{ id: 'rekber-1', name: 'Biaya admin', price: 'Rp 5.000' }]
  }
];

export const TESTIMONIALS = [
  { id: '1', name: 'Andi Pratama', role: 'Digital Marketer', text: 'Tools AI-nya sangat membantu buat artikel jualan saya. Hemat waktu banget!', avatar: 'https://i.pravatar.cc/150?u=andi', rating: 5 },
  { id: '2', name: 'Siti Sarah', role: 'Content Creator', text: 'Canva Pro-nya murah banget dan langsung aktif. Recomended!', avatar: 'https://i.pravatar.cc/150?u=siti', rating: 5 }
];

export const FAQS = [
  { question: 'Bagaimana cara mendapatkan produknya?', answer: 'Setelah pembayaran diverifikasi, link download atau detail akun akan dikirimkan langsung ke email atau WhatsApp kamu.' },
  { question: 'Apakah tools AI-nya gratis?', answer: 'Kami menyediakan beberapa tools AI dasar secara gratis untuk membantu kamu, namun ada juga produk premium dengan fitur lebih lengkap.' }
];
