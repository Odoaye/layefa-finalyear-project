"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Clock, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CustomerLayout from "@/layouts/CustomerLayout";
import { orders, products, formatPrice } from "@/data/mockData";

const STATUS_TABS = ["all", "placed", "processing", "shipped", "out-for-delivery", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "out-for-delivery": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? orders : orders.filter(o => o.status === activeTab);

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-muted-foreground text-sm">{orders.length} total orders</p>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {STATUS_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              data-testid={`tab-${tab}`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors capitalize
                ${activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {tab === "all" ? "All Orders" : tab.replace(/-/g, " ")}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No orders in this category</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order, i) => {
              const product = products.find(p => p.id === order.productId);
              if (!product) return null;
              return (
                <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-4"
                  data-testid={`order-${order.id}`}>
                  <div className="flex items-start gap-4">
                    <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-sm line-clamp-1">{product.name}</p>
                        <Badge className={`${statusColors[order.status] ?? ""} text-[10px] capitalize shrink-0`} variant="secondary">
                          {order.status.replace(/-/g, " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Order #{order.id}</span>
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        <span>{new Date(order.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="font-bold text-primary text-sm">{formatPrice(order.total)}</p>
                        </div>
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Button size="sm" variant="outline" data-testid={`btn-view-order-${order.id}`}>View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
