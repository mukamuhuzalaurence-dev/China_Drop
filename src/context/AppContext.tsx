import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import type {
  ActiveDrop,
  ChatMessage,
  ChinaFriend,
  LeaderboardUser,
  Order,
  OrderItem,
  Product,
  SourcingRequest,
  UserProfile
} from '../types';
import {
  INITIAL_CHAT_MESSAGES,
  INITIAL_CHINA_FRIENDS,
  INITIAL_DROP,
  INITIAL_LEADERBOARD,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_USER
} from '../data/initialData';

export type TabType = 'home' | 'products' | 'chinafriend' | 'orders' | 'rewards' | 'profile' | 'admin';

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currency: 'USD' | 'RWF';
  setCurrency: (c: 'USD' | 'RWF') => void;
  formatMoney: (usdAmount: number) => string;
  
  // Drop & Products
  activeDrop: ActiveDrop;
  setActiveDrop: React.Dispatch<React.SetStateAction<ActiveDrop>>;
  products: Product[];
  currentShippingRatePerKg: number;
  
  // Cart
  cartItems: OrderItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalWeightKg: number;
  cartProductsTotalUSD: number;
  cartEstShippingUSD: number;
  cartGrandTotalUSD: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // China Friend Chat
  chinaFriends: ChinaFriend[];
  activeFriendId: string;
  setActiveFriendId: (id: string) => void;
  messages: Record<string, ChatMessage[]>;
  sendMessage: (friendId: string, text: string, attachment?: ChatMessage['attachment']) => void;
  
  // Orders
  orders: Order[];
  createOrderFromCart: (deliveryHub: string, paymentMethod: string) => Order;
  
  // Sourcing
  sourcingRequests: SourcingRequest[];
  submitSourcingRequest: (req: Omit<SourcingRequest, 'id' | 'createdAt' | 'status'>) => void;
  
  // User & Rewards
  user: UserProfile;
  leaderboard: LeaderboardUser[];
  addPoints: (pts: number) => void;
  
  // View Settings
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean) => void;
  isDeviceFrameActive: boolean;
  setIsDeviceFrameActive: (val: boolean) => void;
  
  // Actions
  joinDropWithCart: () => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (p: Product | null) => void;
  isCustomSourcingModalOpen: boolean;
  setIsCustomSourcingModalOpen: (open: boolean) => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const RWF_EXCHANGE_RATE = 1350; // 1 USD = 1,350 RWF

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currency, setCurrency] = useState<'USD' | 'RWF'>('USD');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  
  const [activeDrop, setActiveDrop] = useState<ActiveDrop>(INITIAL_DROP);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<OrderItem[]>([
    { product: INITIAL_PRODUCTS[8], quantity: 1 }, // Bluetooth Speaker (0.8kg, $8.20)
    { product: INITIAL_PRODUCTS[9], quantity: 1 }, // Handbag (0.6kg, $6.50)
    { product: INITIAL_PRODUCTS[10], quantity: 1 } // Desk Lamp (1.1kg, $7.80)
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [chinaFriends] = useState<ChinaFriend[]>(INITIAL_CHINA_FRIENDS);
  const [activeFriendId, setActiveFriendId] = useState<string>('cf-1');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);
  
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [leaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);
  const [sourcingRequests, setSourcingRequests] = useState<SourcingRequest[]>([]);
  
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isCustomSourcingModalOpen, setIsCustomSourcingModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Determine current shipping rate per kg based on collected weight
  const getShippingRate = (collectedKg: number): number => {
    if (collectedKg >= 5000) return 5.00;
    if (collectedKg >= 2500) return 6.50;
    return 8.00;
  };

  const currentShippingRatePerKg = getShippingRate(activeDrop.weightCollectedKg);

  const formatMoney = (usdAmount: number): string => {
    if (currency === 'RWF') {
      const rwf = Math.round(usdAmount * RWF_EXCHANGE_RATE);
      return `${rwf.toLocaleString()} RWF`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  // Cart helper functions
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  // Calculated Cart values
  const cartTotalWeightKg = parseFloat(
    cartItems.reduce((acc, item) => acc + item.product.weightKg * item.quantity, 0).toFixed(2)
  );

  const cartProductsTotalUSD = parseFloat(
    cartItems.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0).toFixed(2)
  );

  const cartEstShippingUSD = parseFloat(
    (cartTotalWeightKg * currentShippingRatePerKg).toFixed(2)
  );

  const cartGrandTotalUSD = parseFloat(
    (cartProductsTotalUSD + cartEstShippingUSD).toFixed(2)
  );

  // Send message in China Friend Chat
  const sendMessage = (friendId: string, text: string, attachment?: ChatMessage['attachment']) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      friendId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment
    };

    setMessages(prev => ({
      ...prev,
      [friendId]: [...(prev[friendId] || []), userMsg]
    }));

    // Auto simulated response from China Friend
    setTimeout(() => {
      let responseText = "Thanks for your message! Let me double check with our factory supplier in China and update you shortly.";
      if (text.toLowerCase().includes('price') || text.toLowerCase().includes('bulk') || text.toLowerCase().includes('power bank')) {
        responseText = "I spoke directly with the manager at the Yiwu Industrial Park. For 100+ units, we can lower the wholesale price to $10.20/unit with custom branding!";
      } else if (text.toLowerCase().includes('sample') || text.toLowerCase().includes('quality')) {
        responseText = "I can do a live video inspection of the sample batch at our Yiwu consolidation center before packing!";
      }

      const friendMsg: ChatMessage = {
        id: `msg-resp-${Date.now()}`,
        friendId,
        sender: 'china_friend',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [friendId]: [...(prev[friendId] || []), friendMsg]
      }));
    }, 1200);
  };

  // Add Points & Rewards
  const addPoints = (pts: number) => {
    setUser(prev => ({ ...prev, pointsBalance: prev.pointsBalance + pts }));
  };

  // Submit sourcing request
  const submitSourcingRequest = (req: Omit<SourcingRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: SourcingRequest = {
      ...req,
      id: `src-${Date.now()}`,
      createdAt: new Date().toLocaleDateString(),
      status: 'SEARCHING',
      chinaFriendName: 'Lily - Your China Friend'
    };
    setSourcingRequests(prev => [newReq, ...prev]);
    addPoints(25); // Bonus points for sourcing request!

    // Also auto add a notification in China Friend Chat
    sendMessage('cf-1', `Sourcing Request submitted: "${req.productUrlOrTitle}" (Qty: ${req.quantity}). Please verify supplier.`);
  };

  // Join Drop / Place Order
  const createOrderFromCart = (deliveryHub: string, paymentMethod: string): Order => {
    const newOrder: Order = {
      id: `CD00${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cartItems],
      totalWeightKg: cartTotalWeightKg,
      productsTotalUSD: cartProductsTotalUSD,
      shippingTotalUSD: cartEstShippingUSD,
      grandTotalUSD: cartGrandTotalUSD,
      status: 'Pending',
      createdDate: new Date().toISOString().split('T')[0],
      deliveryHub,
      paymentMethod,
      paymentStatus: 'PAID',
      trackingSteps: [
        { step: 'Order Placed', location: 'China Drop Mobile App', timestamp: 'Just now', completed: true },
        { step: 'Order Purchased in China', location: 'Yiwu Supplier Hub', timestamp: 'In progress', completed: false },
        { step: 'Consolidated into Container', location: 'Yiwu Consolidation Warehouse', timestamp: 'Pending', completed: false },
        { step: 'Air Freight in Transit', location: 'Guangzhou -> Kigali Flight', timestamp: 'Pending', completed: false },
        { step: 'Ready for Pickup', location: deliveryHub, timestamp: 'Pending', completed: false }
      ]
    };

    // Update active drop weight and buyers counter
    setActiveDrop(prev => {
      const newWeight = prev.weightCollectedKg + cartTotalWeightKg;
      return {
        ...prev,
        buyersJoined: prev.buyersJoined + 1,
        weightCollectedKg: newWeight
      };
    });

    // Add to orders
    setOrders(prev => [newOrder, ...prev]);
    // Clear cart & add reward points
    clearCart();
    addPoints(50);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E50914', '#10B981', '#F59E0B', '#FFFFFF']
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }

    return newOrder;
  };

  const joinDropWithCart = () => {
    if (cartItems.length === 0) {
      setActiveTab('products');
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currency,
        setCurrency,
        formatMoney,
        activeDrop,
        setActiveDrop,
        products,
        currentShippingRatePerKg,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalWeightKg,
        cartProductsTotalUSD,
        cartEstShippingUSD,
        cartGrandTotalUSD,
        isCartOpen,
        setIsCartOpen,
        chinaFriends,
        activeFriendId,
        setActiveFriendId,
        messages,
        sendMessage,
        orders,
        createOrderFromCart,
        sourcingRequests,
        submitSourcingRequest,
        user,
        leaderboard,
        addPoints,
        isPhoneFrame,
        setIsPhoneFrame,
        isDeviceFrameActive: isPhoneFrame,
        setIsDeviceFrameActive: setIsPhoneFrame,
        joinDropWithCart,
        selectedProductDetail,
        setSelectedProductDetail,
        isCustomSourcingModalOpen,
        setIsCustomSourcingModalOpen,
        notificationCount,
        setNotificationCount,
        isSearchOpen,
        setIsSearchOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
