"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, CheckCircle, Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import VendorLayout from "@/layouts/VendorLayout";
import { products, formatPrice, getCheapestListing, getVendorById } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function VendorPricing() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const myProducts = products.filter(p => p.vendorListings.some(l => l.vendorId === "v1"));

  const savePrice = (productId: string) => {
    toast({ title: "Price updated!", description: `Price set to ₦${parseInt(editPrice).toLocaleString()}` });
    setEditingId(null);
    setEditPrice("");
  };

  return (
    <VendorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Pricing Management</h1>
          <p className="text-muted-foreground text-sm">Monitor competitor prices and stay competitive</p>
        </div>

        {/* Tips banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3">
          <TrendingDown className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Pricing Tip</p>
            <p className="text-xs text-muted-foreground">Products with the lowest price get the "Best Price" badge and rank higher in search results. Being competitive increases your sales by up to 3x.</p>
          </div>
        </div>

        <div className="space-y-4">
          {myProducts.map((product, i) => {
            const myListing = product.vendorListings.find(l => l.vendorId === "v1");
            if (!myListing) return null;
            const allPrices = product.vendorListings.map(l => l.price);
            const lowestPrice = Math.min(...allPrices);
            const highestPrice = Math.max(...allPrices);
            const avgPrice = Math.round(allPrices.reduce((s, p) => s + p, 0) / allPrices.length);
            const isCheapest = myListing.price === lowestPrice;
            const otherVendors = product.vendorListings.filter(l => l.vendorId !== "v1");

            return (
              <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-xl p-5"
                data-testid={`pricing-row-${product.id}`}>
                <div className="flex items-start gap-4">
                  <img src={product.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-semibold text-sm">{product.name}</p>
                        <Badge variant="outline" className="text-[10px] mt-0.5">{product.category}</Badge>
                      </div>
                      {isCheapest && (
                        <Badge className="text-xs gap-1 shrink-0"><CheckCircle className="w-3 h-3" /> Best Price</Badge>
                      )}
                    </div>

                    {/* My price + edit */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Your current price</p>
                        {editingId === product.id ? (
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₦</span>
                              <Input data-testid="input-edit-price" className="pl-7 w-36 h-8 text-sm" value={editPrice} onChange={e => setEditPrice(e.target.value.replace(/\D/g, ""))} placeholder={String(myListing.price)} autoFocus />
                            </div>
                            <Button size="sm" className="h-8 gap-1" onClick={() => savePrice(product.id)} data-testid="btn-save-price">
                              <Save className="w-3 h-3" /> Save
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8" onClick={() => setEditingId(null)}>Cancel</Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${isCheapest ? "text-primary" : "text-foreground"}`}>{formatPrice(myListing.price)}</span>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => { setEditingId(product.id); setEditPrice(String(myListing.price)); }} data-testid={`btn-edit-price-${product.id}`}>
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Market data */}
                    <div className="grid grid-cols-3 gap-3 bg-muted/50 rounded-lg p-3 mb-3">
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground">Market Low</p>
                        <p className="text-sm font-bold text-green-600">{formatPrice(lowestPrice)}</p>
                      </div>
                      <div className="text-center border-x border-border">
                        <p className="text-[10px] text-muted-foreground">Market Avg</p>
                        <p className="text-sm font-bold">{formatPrice(avgPrice)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground">Market High</p>
                        <p className="text-sm font-bold text-destructive">{formatPrice(highestPrice)}</p>
                      </div>
                    </div>

                    {/* Competitor prices */}
                    {otherVendors.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Competitor Prices ({otherVendors.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {otherVendors.map(listing => {
                            const vendor = getVendorById(listing.vendorId);
                            const isLower = listing.price < myListing.price;
                            return vendor ? (
                              <div key={listing.vendorId} className="flex items-center gap-1.5 bg-background border border-border rounded-lg px-2.5 py-1.5">
                                {isLower ? <TrendingDown className="w-3 h-3 text-red-500" /> : <TrendingUp className="w-3 h-3 text-green-500" />}
                                <span className="text-xs font-medium">{vendor.name}</span>
                                <span className={`text-xs font-bold ${isLower ? "text-red-600" : "text-green-600"}`}>{formatPrice(listing.price)}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </VendorLayout>
  );
}
