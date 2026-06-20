"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VendorLayout from "@/layouts/VendorLayout";
import { orders, products, formatPrice } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  "out-for-delivery": "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_OPTIONS = ["all", "placed", "processing", "shipped", "out-for-delivery", "delivered", "cancelled"];

export default function VendorOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const filtered = orders
    .filter(o => statusFilter === "all" || o.status === statusFilter)
    .filter(o => {
      if (!search) return true;
      const product = products.find(p => p.id === o.productId);
      return product?.name.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    });

  const updateStatus = (orderId: string, newStatus: string) => {
    toast({ title: "Order updated", description: `Order ${orderId} marked as ${newStatus}` });
  };

  return (
    <VendorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-muted-foreground text-sm">{orders.length} total orders</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input data-testid="search-orders" placeholder="Search orders..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44" data-testid="filter-status"><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s === "all" ? "All Statuses" : s.replace(/-/g, " ")}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Pending", count: orders.filter(o => o.status === "placed").length, color: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "Processing", count: orders.filter(o => o.status === "processing").length, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
            { label: "Shipped", count: orders.filter(o => ["shipped", "out-for-delivery"].includes(o.status)).length, color: "bg-purple-50 text-purple-700 border-purple-200" },
            { label: "Delivered", count: orders.filter(o => o.status === "delivered").length, color: "bg-green-50 text-green-700 border-green-200" },
          ].map(stat => (
            <div key={stat.label} className={`rounded-xl border p-3 text-center ${stat.color}`}>
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Order</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase px-4 py-3 hidden sm:table-cell">Product</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Amount</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => {
                const product = products.find(p => p.id === order.productId);
                return (
                  <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="border-b border-border last:border-0 hover:bg-muted/20"
                    data-testid={`order-row-${order.id}`}>
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs font-semibold">{order.id}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(order.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {product && (
                        <div className="flex items-center gap-2">
                          <img src={product.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <p className="text-sm truncate max-w-[150px]">{product.name}</p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-sm">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`${statusColors[order.status]} text-[10px] capitalize`} variant="secondary">
                        {order.status.replace(/-/g, " ")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {order.status === "placed" && (
                        <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => updateStatus(order.id, "processing")} data-testid={`btn-process-${order.id}`}>
                          Process
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => updateStatus(order.id, "shipped")} data-testid={`btn-ship-${order.id}`}>
                          Mark Shipped
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <Badge variant="secondary" className="text-[10px]">Complete</Badge>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
}
