export interface Vendor {
  id: string;
  name: string;
  logo: string;
  location: string;
  rating: number;
  description: string;
  isVerified: boolean;
  joinedDate: string;
  totalSales: number;
  avgRating: number;
}

export interface VendorListing {
  vendorId: string;
  price: number;
  stock: number;
  shippingDays: number;
  isHighlighted?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  specs: Record<string, string>;
  images: string[];
  vendorListings: VendorListing[];
  avgRating: number;
  reviewCount: number;
  tags: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  productId: string;
  quantity: number;
  total: number;
  status: 'placed' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';
  date: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  date: string;
}

export interface VendorAnalytics {
  vendorId: string;
  revenueByMonth: { month: string; revenue: number }[];
  ordersByCategory: { category: string; count: number }[];
}
