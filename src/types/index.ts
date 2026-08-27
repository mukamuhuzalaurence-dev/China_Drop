export type CategoryType = 
  | 'All' 
  | 'Electronics' 
  | 'Fashion' 
  | 'Beauty' 
  | 'Home' 
  | 'Business' 
  | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  priceUSD: number;
  weightKg: number;
  image: string;
  rating: number;
  reviewsCount?: number;
  supplierName: string;
  verifiedSupplier: boolean;
  description: string;
  moq?: number;
  originCity: string;
}

export interface ShippingTier {
  weightKg: number;
  ratePerKg: number;
  label: string;
}

export interface ActiveDrop {
  id: string;
  title: string;
  status: 'ACTIVE' | 'CONSOLIDATING' | 'SHIPPED' | 'COMPLETED';
  buyersJoined: number;
  weightCollectedKg: number;
  targetWeightKg: number;
  endsAt: string; // ISO date string
  tiers: ShippingTier[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Purchased' | 'Shipped' | 'In Transit' | 'Delivered';

export interface TrackingStep {
  step: string;
  location: string;
  timestamp: string;
  completed: boolean;
  icon?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalWeightKg: number;
  productsTotalUSD: number;
  shippingTotalUSD: number;
  grandTotalUSD: number;
  status: OrderStatus;
  createdDate: string;
  deliveryHub: string;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING';
  trackingSteps: TrackingStep[];
}

export interface ChinaFriend {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  isOnline: boolean;
  rating: number;
  conversationsCount: number;
  bio: string;
}

export interface ChatMessage {
  id: string;
  friendId: string;
  sender: 'user' | 'china_friend' | 'system';
  text: string;
  timestamp: string;
  attachment?: {
    type: 'product' | 'image' | 'quote';
    title?: string;
    priceUSD?: number;
    weightKg?: number;
    image?: string;
    moq?: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  pointsBalance: number;
  referralCode: string;
  totalSavedUSD: number;
  totalImportedKg: number;
  avatar: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  weightKg: number;
  avatar: string;
  badge?: string;
}

export interface SourcingRequest {
  id: string;
  productUrlOrTitle: string;
  quantity: number;
  targetPrice?: number;
  notes: string;
  status: 'PENDING' | 'SEARCHING' | 'QUOTE_READY';
  quotePriceUSD?: number;
  chinaFriendName?: string;
  createdAt: string;
}
