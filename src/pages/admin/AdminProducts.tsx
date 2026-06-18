"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, CheckCircle, AlertTriangle, Eye, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/layouts/AdminLayout";
import { products, formatPrice, getCheapestListing } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Product Moderation</h1>
          <p className="text-muted-foreground text-sm">{products.length} products on platform</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Products", value: products.length, color: "bg-blue-100 text-blue-700" },
            { label: "Active", value: products.length - 2, color: "bg-green-100 text-green-700" },
            { label: "Flagged", value: 2, color: "bg-red-100 text-red-700" },
          ].map(stat => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color} border border-current/20`}>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input data-testid="search-products" placeholder="Search products..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Product</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Price Range</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3 hidden sm:table-cell">Rating</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Vendors</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => {
                const minPrice = Math.min(...product.vendorListings.map(v => v.price));
                const maxPrice = Math.max(...product.vendorListings.map(v => v.price));
                return (
                  <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-muted/20"
                    data-testid={`product-row-${product.id}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <p className="font-medium text-sm line-clamp-1 max-w-[180px]">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center text-xs">
                      <div className="text-xs">{formatPrice(minPrice)}</div>
                      <div className="text-muted-foreground">to {formatPrice(maxPrice)}</div>
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm">{product.avgRating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary" className="text-[10px]">{product.vendorListings.length}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"
                          onClick={() => toast({ title: "Product flagged", description: product.name })}
                          data-testid={`btn-flag-${product.id}`}>
                          <Ban className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
