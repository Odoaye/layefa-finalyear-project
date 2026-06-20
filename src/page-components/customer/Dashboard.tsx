"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Package, Heart, TrendingDown, ArrowRight, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CustomerLayout from "@/layouts/CustomerLayout";
import StatsCard from "@/components/StatsCard";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { products, orders, formatPrice, getCheapestListing, getVendorById } from "@/data/mockData";

const recentOrders = orders.slice(0, 4);
const recommended = products.slice(0, 4);

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  "out-for-delivery": "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const totalSpent = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0);

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-amber-600 rounded-2xl p-6 text-primary-foreground">
          <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name?.split(" ")[0]}!</h1>
          <p className="text-primary-foreground/80 text-sm">You've saved money on {orders.filter(o => o.status === "delivered").length} purchases. Keep comparing!</p>
          <div className="flex gap-3 mt-4">
            <Link href="/dashboard/marketplace">
              <Button size="sm" variant="secondary" className="gap-2" data-testid="btn-browse-marketplace">
                <ShoppingBag className="w-4 h-4" /> Browse Products
              </Button>
            </Link>
            <Link href="/dashboard/budget">
              <Button size="sm" variant="outline" className="gap-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <TrendingDown className="w-4 h-4" /> Budget Assistant
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Spent" value={formatPrice(totalSpent)} icon={<ShoppingBag className="w-5 h-5" />} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" change={12} changeLabel="this month" index={0} />
          <StatsCard title="Orders" value={`${orders.length}`} icon={<Package className="w-5 h-5" />} color="bg-green-100 dark:bg-green-900/30 text-green-600" change={3} changeLabel="new" index={1} />
          <StatsCard title="Wishlist" value={`${wishlistItems.length}`} icon={<Heart className="w-5 h-5" />} color="bg-pink-100 dark:bg-pink-900/30 text-pink-600" index={2} />
          <StatsCard title="Savings" value={formatPrice(95000)} icon={<TrendingDown className="w-5 h-5" />} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600" change={8} changeLabel="vs avg" index={3} />
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <Link href="/dashboard/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">View All <ArrowRight className="w-3.5 h-3.5" /></Button>
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-10 bg-card border border-border rounded-xl">
              <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No orders yet</p>
              <Link href="/dashboard/marketplace"><Button size="sm" className="mt-3">Start Shopping</Button></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order, i) => {
                const product = products.find(p => p.id === order.productId);
                return product ? (
                  <motion.div key={order.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{product.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Ordered {new Date(order.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm">{formatPrice(order.total)}</p>
                      <Badge className={`text-[10px] px-2 capitalize ${statusColors[order.status] ?? ""}`} variant="secondary">
                        {order.status.replace(/-/g, " ")}
                      </Badge>
                    </div>
                  </motion.div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Recommended */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recommended for You</h2>
            <Link href="/dashboard/marketplace">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">View All <ArrowRight className="w-3.5 h-3.5" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recommended.map((product, i) => {
              const cheapest = getCheapestListing(product);
              const vendor = getVendorById(cheapest.vendorId);
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <Link href={`/dashboard/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover cursor-pointer" />
                  </Link>
                  <div className="p-3">
                    <p className="text-xs font-medium line-clamp-2 mb-1">{product.name}</p>
                    <div className="flex items-center gap-0.5 mb-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-muted-foreground">{product.avgRating}</span>
                    </div>
                    <p className="text-sm font-bold text-primary">{formatPrice(cheapest.price)}</p>
                    <p className="text-[10px] text-muted-foreground">{vendor?.name}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
