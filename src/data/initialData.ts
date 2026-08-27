import type { ActiveDrop, ChinaFriend, ChatMessage, Order, Product, UserProfile, LeaderboardUser } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-rw-8812',
  name: 'Divine Ishimwe',
  phone: '+250 788 942 105',
  email: 'divine.ishimwe@gmail.com',
  pointsBalance: 230,
  referralCode: 'CHINADROP',
  totalSavedUSD: 142.50,
  totalImportedKg: 38.5,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  tier: 'GOLD'
};

export const INITIAL_DROP: ActiveDrop = {
  id: 'CHINA DROP #001',
  title: 'Rwanda Q3 Bulk Consignment #001',
  status: 'ACTIVE',
  buyersJoined: 2450,
  weightCollectedKg: 3800,
  targetWeightKg: 5000,
  endsAt: new Date(Date.now() + 2 * 24 * 3600 * 1000 + 14 * 3600 * 1000 + 32 * 60 * 1000).toISOString(),
  tiers: [
    { weightKg: 0, ratePerKg: 8.00, label: 'Base Rate' },
    { weightKg: 2500, ratePerKg: 6.50, label: 'Tier 1 Target' },
    { weightKg: 5000, ratePerKg: 5.00, label: 'Best Price Target' }
  ]
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Headphones',
    category: 'Electronics',
    priceUSD: 8.20,
    weightKg: 1.2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    description: 'Foldable active noise canceling bluetooth wireless headphones.',
    supplierName: 'Shenzhen Audio Tech Ltd.',
    verifiedSupplier: true,
    originCity: 'Shenzhen',
    rating: 4.9
  },
  {
    id: 'p-2',
    name: 'Smart Watch',
    category: 'Electronics',
    priceUSD: 12.50,
    weightKg: 0.5,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    description: 'HD Touchscreen smartwatch with heart rate & blood oxygen monitor.',
    supplierName: 'Yiwu Digital Electronics',
    verifiedSupplier: true,
    originCity: 'Yiwu',
    rating: 4.8
  },
  {
    id: 'p-3',
    name: 'Backpack',
    category: 'Fashion',
    priceUSD: 6.80,
    weightKg: 0.8,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    description: 'Waterproof laptop travel backpack with USB charging port.',
    supplierName: 'Guangzhou Leather Bags Factory',
    verifiedSupplier: true,
    originCity: 'Guangzhou',
    rating: 4.7
  },
  {
    id: 'p-4',
    name: 'Sneakers',
    category: 'Fashion',
    priceUSD: 9.90,
    weightKg: 1.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    description: 'Lightweight breathable sports sneakers for running & casual wear.',
    supplierName: 'Putian Shoe Industry',
    verifiedSupplier: true,
    originCity: 'Fujian',
    rating: 4.9
  },
  {
    id: 'p-5',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    priceUSD: 7.20,
    weightKg: 0.3,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    description: 'Ultra-lightweight Bluetooth earbuds with deep bass and compact charging case.',
    supplierName: 'Shenzhen AudioTech Co., Ltd.',
    verifiedSupplier: true,
    originCity: 'Shenzhen',
    rating: 4.9
  },
  {
    id: 'p6',
    name: 'Luxury Chronograph Men Watch',
    category: 'Accessories',
    priceUSD: 15.80,
    weightKg: 0.4,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 118,
    supplierName: 'Guangzhou Timepiece Mfg',
    verifiedSupplier: true,
    description: 'Stainless steel analog watch with sapphire glass face and date display.',
    moq: 1,
    originCity: 'Guangzhou'
  },
  {
    id: 'p7',
    name: 'Adjustable Metal Phone Stand Holder',
    category: 'Accessories',
    priceUSD: 2.30,
    weightKg: 0.2,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 430,
    supplierName: 'Yiwu Hardware Products Co.',
    verifiedSupplier: true,
    description: 'Foldable desktop phone holder compatible with smartphones and tablets.',
    moq: 1,
    originCity: 'Yiwu'
  },
  {
    id: 'p8',
    name: 'UV400 Polarized Sunglasses',
    category: 'Fashion',
    priceUSD: 3.60,
    weightKg: 0.2,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewsCount: 165,
    supplierName: 'Linhai Eyewear Factory',
    verifiedSupplier: true,
    description: 'Classic unisex sunglasses with anti-glare polarized lenses.',
    moq: 1,
    originCity: 'Taizhou'
  },
  {
    id: 'p9',
    name: 'Portable Bluetooth Outdoor Speaker',
    category: 'Electronics',
    priceUSD: 8.20,
    weightKg: 0.8,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 215,
    supplierName: 'Shenzhen Sound Systems',
    verifiedSupplier: true,
    description: 'Rugged IPX7 waterproof speaker with dual bass radiators.',
    moq: 1,
    originCity: 'Shenzhen'
  },
  {
    id: 'p10',
    name: 'Designer Leather Women Handbag',
    category: 'Fashion',
    priceUSD: 6.50,
    weightKg: 0.6,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 380,
    supplierName: 'Guangzhou Leatherware Ltd.',
    verifiedSupplier: true,
    description: 'Elegantly stitched PU leather shoulder tote bag with multiple zip compartments.',
    moq: 1,
    originCity: 'Guangzhou'
  },
  {
    id: 'p11',
    name: 'LED Touch Dimmable Desk Lamp',
    category: 'Home',
    priceUSD: 7.80,
    weightKg: 1.1,
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 94,
    supplierName: 'Zhongshan Lighting Co.',
    verifiedSupplier: true,
    description: 'Eye-caring rechargeable desk lamp with 3 color temperatures and phone charger dock.',
    moq: 1,
    originCity: 'Zhongshan'
  },
  {
    id: 'p12',
    name: '20,000mAh Dual Fast Charge Power Bank',
    category: 'Electronics',
    priceUSD: 11.50,
    weightKg: 0.45,
    image: 'https://images.unsplash.com/photo-1609592424074-b5f7b49466dd?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 640,
    supplierName: 'Shenzhen PowerTech Co.',
    verifiedSupplier: true,
    description: '22.5W Super Fast Charging bank with LED digital battery display.',
    moq: 1,
    originCity: 'Shenzhen'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Uwase A.',
    weightKg: 320,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80',
    badge: '👑 Top Importer'
  },
  {
    rank: 2,
    name: 'Jean P.',
    weightKg: 280,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    badge: '⚡ Drop Captain'
  },
  {
    rank: 3,
    name: 'Manzi E.',
    weightKg: 210,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    badge: '🔥 Bulk Champion'
  },
  {
    rank: 4,
    name: 'Keza M.',
    weightKg: 185,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
  },
  {
    rank: 5,
    name: 'Eric N.',
    weightKg: 160,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CHINA_FRIENDS: ChinaFriend[] = [
  {
    id: 'cf-1',
    name: 'Lily - Your China Friend',
    role: 'Sourcing Lead & Inspector',
    location: 'Yiwu, Zhejiang, China',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    rating: 4.98,
    conversationsCount: 1420,
    bio: 'Real person. Real answers. I help thousands of Rwandans buy directly from factories in Yiwu & Hangzhou.'
  },
  {
    id: 'cf-2',
    name: 'David - Electronics Expert',
    role: 'Tech & Components Sourcing',
    location: 'Shenzhen, Guangdong, China',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    rating: 4.95,
    conversationsCount: 980,
    bio: 'Based in Huaqiangbei, Shenzhen. Specializing in phone accessories, solar hardware, and custom electronics.'
  },
  {
    id: 'cf-3',
    name: 'Fashion Finder',
    role: 'Textiles & Apparel Agent',
    location: 'Guangzhou, Guangdong, China',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    rating: 4.92,
    conversationsCount: 760,
    bio: 'Guangzhou wholesale fashion markets. Unlocking factory pricing for Rwandan clothing boutiques.'
  },
  {
    id: 'cf-4',
    name: 'Shipping Assistant',
    role: 'Logistics & Warehouse Operations',
    location: 'Yiwu Consolidation Hub',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    isOnline: false,
    rating: 4.99,
    conversationsCount: 2310,
    bio: 'Tracks container loading, customs paperwork, and Kigali flight schedules.'
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'cf-1': [
    {
      id: 'm1',
      friendId: 'cf-1',
      sender: 'user',
      text: 'Hi Lily! I want to buy this product in bulk. Can you help me?',
      timestamp: '10:30 AM'
    },
    {
      id: 'm2',
      friendId: 'cf-1',
      sender: 'china_friend',
      text: 'Hello! Sure 😊 I can help you find the best factory and price. What quantity are you planning?',
      timestamp: '10:32 AM'
    },
    {
      id: 'm3',
      friendId: 'cf-1',
      sender: 'china_friend',
      text: 'Here is the verified sample quote from our Yiwu factory partner:',
      timestamp: '10:32 AM',
      attachment: {
        type: 'product',
        title: 'Portable Power Bank 20000mAh Black',
        priceUSD: 11.50,
        weightKg: 0.45,
        moq: 100,
        image: 'https://images.unsplash.com/photo-1609592424074-b5f7b49466dd?w=400&auto=format&fit=crop&q=80'
      }
    }
  ],
  'cf-2': [
    {
      id: 'm4',
      friendId: 'cf-2',
      sender: 'user',
      text: 'Can you help me find solar panel kits for Kigali electronics store?',
      timestamp: '9:30 AM'
    },
    {
      id: 'm5',
      friendId: 'cf-2',
      sender: 'china_friend',
      text: 'Yes! I have 3 Tier-1 manufacturers in Shenzhen with ISO certification. Sending catalog specs now!',
      timestamp: '9:31 AM'
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'CD0012456',
    items: [
      { product: INITIAL_PRODUCTS[8], quantity: 1 }, // Speaker (0.8kg, $8.20)
      { product: INITIAL_PRODUCTS[9], quantity: 1 }, // Handbag (0.6kg, $6.50)
      { product: INITIAL_PRODUCTS[10], quantity: 1 } // Lamp (1.1kg, $7.80)
    ],
    totalWeightKg: 2.5,
    productsTotalUSD: 22.50,
    shippingTotalUSD: 12.50, // at $5.00/kg rate or current drop rate
    grandTotalUSD: 35.00,
    status: 'Pending',
    createdDate: '2026-08-26',
    deliveryHub: 'Kigali City Tower Station',
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'PAID',
    trackingSteps: [
      { step: 'Order Placed', location: 'China Drop RW App', timestamp: 'Aug 26, 14:20', completed: true },
      { step: 'Order Purchased in China', location: 'Yiwu Supplier', timestamp: 'Aug 26, 18:00', completed: true },
      { step: 'Consolidated into Container', location: 'Yiwu Warehouse #3', timestamp: 'Aug 27, 08:30', completed: false },
      { step: 'Air Freight in Transit', location: 'Guangzhou -> Kigali Flight', timestamp: 'Estimated Aug 29', completed: false },
      { step: 'Ready for Pickup', location: 'Kigali City Tower Hub', timestamp: 'Estimated Sep 01', completed: false }
    ]
  }
];
