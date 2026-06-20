"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import VendorLayout from "@/layouts/VendorLayout";
import { products, formatPrice } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function VendorProducts() {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const vendorProducts = products.filter(p => p.vendorListings.some(l => l.vendorId === "v1"));
  const filtered = vendorProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Products</h1>
            <p className="text-muted-foreground text-sm">{vendorProducts.length} products listed</p>
          </div>
          <Link href="/vendor/products/add">
            <Button data-testid="btn-add-product" className="gap-2"><Plus className="w-4 h-4" /> Add Product</Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input data-testid="search-products" placeholder="Search your products..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p>No products found</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full" data-testid="products-table">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3">Product</th>
                  <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Category</th>
                  <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3">Price</th>
                  <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Stock</th>
                  <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Rating</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => {
                  const myListing = product.vendorListings.find(l => l.vendorId === "v1");
                  if (!myListing) return null;
                  const isCheapest = myListing.price === Math.min(...product.vendorListings.map(l => l.price));
                  return (
                    <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-testid={`product-row-${product.id}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                          <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-bold text-sm">{formatPrice(myListing.price)}</span>
                        {isCheapest && <div className="flex items-center justify-center mt-0.5"><Badge className="text-[10px] px-1.5 h-4">Lowest</Badge></div>}
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`text-sm font-medium ${myListing.stock < 5 ? "text-amber-600" : "text-muted-foreground"}`}>{myListing.stock}</span>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm">{product.avgRating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`btn-edit-${product.id}`}><Edit className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" data-testid={`btn-delete-${product.id}`}
                            onClick={() => toast({ title: "Product removed", description: product.name })}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </VendorLayout>
  );
}
