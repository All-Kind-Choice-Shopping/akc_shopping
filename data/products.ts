export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  videoUrl: string;   // direct MP4 uploaded by vendor
  inStock: boolean;
  sold: number;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Phone Pro X',
    price: 85000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
      'https://images.unsplash.com/photo-1574755393849-623942496936?w=500&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&q=80',
    ],
    category: 'electronics',
    rating: 4.5,
    reviewCount: 128,
    description:
      'The Phone Pro X features a stunning 6.7-inch AMOLED display, 5000mAh battery, and a 108MP triple camera system. Comes with 128GB storage and 8GB RAM. Dual SIM, 5G ready.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    inStock: true,
    sold: 342,
  },
  {
    id: '2',
    name: 'Air Runner Sneakers',
    price: 12500,
    originalPrice: 16000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80',
    ],
    category: 'shoes',
    rating: 4.3,
    reviewCount: 87,
    description:
      'Lightweight and breathable Air Runner sneakers built for everyday comfort. Cushioned sole, anti-slip grip. Available in sizes 38–46. Ideal for running, walking, and casual wear.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    inStock: true,
    sold: 215,
  },
  {
    id: '3',
    name: 'Ankara Dress',
    price: 8200,
    originalPrice: 10000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4571?w=500&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    ],
    category: 'clothes',
    rating: 4.7,
    reviewCount: 203,
    description:
      'Beautiful handcrafted Ankara dress made from 100% premium cotton fabric. Features vibrant traditional African print patterns. Available in sizes XS–3XL. Machine washable.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    inStock: true,
    sold: 519,
  },
  {
    id: '4',
    name: 'Laptop 14"',
    price: 320000,
    originalPrice: 360000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80',
    ],
    category: 'electronics',
    rating: 4.6,
    reviewCount: 94,
    description:
      '14-inch Full HD IPS display, Intel Core i5 12th Gen, 16GB RAM, 512GB NVMe SSD. Windows 11 Pro. 10-hour battery, backlit keyboard, fingerprint reader.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    inStock: true,
    sold: 108,
  },
  {
    id: '5',
    name: 'Woven Bag',
    price: 4500,
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
    ],
    category: 'clothes',
    rating: 4.4,
    reviewCount: 156,
    description:
      'Handwoven Tanzanian bag crafted by local artisans using natural fibres. Spacious interior with inner zipper pocket. Strong handles for daily use.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    inStock: true,
    sold: 430,
  },
  {
    id: '6',
    name: 'Wireless Headphones',
    price: 22000,
    originalPrice: 28000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
    ],
    category: 'electronics',
    rating: 4.8,
    reviewCount: 312,
    description:
      'Premium over-ear wireless headphones with Active Noise Cancellation. 30-hour battery, fast charging, 40mm drivers, built-in microphone. Compatible with all Bluetooth devices.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    inStock: true,
    sold: 678,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getRelatedProducts(product: Product): Product[] {
  return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
}

export function formatPrice(amount: number): string {
  return 'MK ' + amount.toLocaleString();
}

export function getDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}