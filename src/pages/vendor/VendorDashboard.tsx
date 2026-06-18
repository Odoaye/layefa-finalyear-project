"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, Package, ShoppingCart, Star, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VendorLayout from "@/layouts/VendorLayout";
import StatsCard from "@/components/StatsCard";
import { analytics, orders, products, formatPrice, getVendorById } from "@/data/mockData";

const vendorAnalytics = analytics[0];
const vendorOrders = orders.slice(0, 5);
const vendorProducts = products.slice(0, 5);
const totalRevenue = vendorOrders.reduce((s, o) => s + o.total, 0);

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  "out-for-delivery": "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function VendorDashboard() {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground text-sm">TechStore NG — Overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={<DollarSign className="w-5 h-5" />} color="bg-green-100 dark:bg-green-900/30 text-green-600" change={15} changeLabel="this month" index={0} />
          <StatsCard title="Active Products" value={`${vendorProducts.length}`} icon={<Package className="w-5 h-5" />} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" index={1} />
          <StatsCard title="Total Orders" value={`${vendorOrders.length}`} icon={<ShoppingCart className="w-5 h-5" />} color="bg-purple-100 dark:bg-purple-900/30 text-purple-600" change={8} changeLabel="new" index={2} />
          <StatsCard title="Avg. Rating" value="4.8" icon={<Star className="w-5 h-5" />} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600" change={2} index={3} />
        </div>

        {/* Revenue Chart */}
        {vendorAnalytics && (
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold">Revenue by Month</h3>
              <Link href="/vendor/analytics"><Button variant="ghost" size="sm" className="gap-1 text-xs">Full Analytics <ArrowRight className="w-3.5 h-3.5" /></Button></Link>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={vendorAnalytics.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [formatPrice(v), "Revenue"]} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recent Orders</h3>
              <Link href="/vendor/orders"><Button variant="ghost" size="sm" className="gap-1 text-xs">View All <ArrowRight className="w-3.5 h-3.5" /></Button></Link>
            </div>
            <div className="space-y-3">
              {vendorOrders.map((order, i) => {
                const product = products.find(p => p.id === order.productId);
                return product ? (
                  <div key={order.id} className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(order.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold">{formatPrice(order.total)}</p>
                      <Badge className={`text-[10px] capitalize ${statusColors[order.status]}`} variant="secondary">
                        {order.status.replace(/-/g, " ")}
                      </Badge>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Top Products</h3>
              <Link href="/vendor/products"><Button variant="ghost" size="sm" className="gap-1 text-xs">Manage <ArrowRight className="w-3.5 h-3.5" /></Button></Link>
            </div>
            <div className="space-y-3">
              {vendorProducts.map(product => {
                const listing = product.vendorListings.find(l => l.vendorId === "v1");
                return listing ? (
                  <div key={product.id} className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-muted-foreground">{product.avgRating} · {listing.stock} in stock</span>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-primary shrink-0">{formatPrice(listing.price)}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
