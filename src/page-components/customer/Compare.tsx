"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitCompare, Plus, X, Star, TrendingDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useCart } from "@/context/CartContext";
import { products, formatPrice, getCheapestListing, getVendorById } from "@/data/mockData";

export default function Compare() {
  const [selected, setSelected] = useState<string[]>([products[0].id, products[1].id]);
  const { addToCart } = useCart();

  const compareProducts = selected.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;

  const addSlot = () => {
    if (selected.length < 4) setSelected([...selected, ""]);
  };

  const removeSlot = (i: number) => setSelected(selected.filter((_, idx) => idx !== i));
  const setSlot = (i: number, id: string) => {
    const updated = [...selected];
    updated[i] = id;
    setSelected(updated);
  };

  const allSpecs = [...new Set(compareProducts.flatMap(p => Object.keys(p.specs)))];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Compare Products</h1>
          <p className="text-muted-foreground text-sm">Compare up to 4 products side-by-side</p>
        </div>

        {/* Product selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {selected.map((id, i) => (
            <div key={i} className="relative">
              <Select value={id} onValueChange={v => setSlot(i, v)}>
                <SelectTrigger data-testid={`compare-select-${i}`} className="w-full">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(p => (
                    <SelectItem key={p.id} value={p.id} disabled={selected.includes(p.id) && p.id !== id}>
                      {p.name.slice(0, 30)}...
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selected.length > 2 && (
                <button onClick={() => removeSlot(i)} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs z-10">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          {selected.length < 4 && (
            <Button variant="outline" className="h-10 gap-2" onClick={addSlot} data-testid="btn-add-compare">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          )}
        </div>

        {compareProducts.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" data-testid="compare-table">
              <thead>
                <tr>
                  <td className="w-40 p-3 text-xs font-semibold text-muted-foreground uppercase">Product</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-3 align-top">
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-4 text-center">
                        <img src={p.images[0]} alt={p.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                        <p className="font-semibold text-sm line-clamp-2 mb-2">{p.name}</p>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs">{p.avgRating}</span>
                        </div>
                        <p className="text-lg font-bold text-primary">{formatPrice(getCheapestListing(p).price)}</p>
                        <p className="text-xs text-muted-foreground mb-3">{p.vendorListings.length} vendor{p.vendorListings.length !== 1 ? "s" : ""}</p>
                        <Button size="sm" className="w-full gap-1.5" data-testid={`btn-compare-cart-${p.id}`}
                          onClick={() => addToCart(p, getCheapestListing(p))}>
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </Button>
                      </motion.div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Best price row */}
                <tr className="border-t border-border">
                  <td className="p-3 text-xs font-semibold text-muted-foreground bg-muted/30">Best Price</td>
                  {compareProducts.map(p => {
                    const cheapest = getCheapestListing(p);
                    const vendor = getVendorById(cheapest.vendorId);
                    const isBestOverall = cheapest.price === Math.min(...compareProducts.map(prod => getCheapestListing(prod).price));
                    return (
                      <td key={p.id} className={`p-3 text-center ${isBestOverall ? "bg-green-50 dark:bg-green-950/20" : ""}`}>
                        <span className={`font-bold ${isBestOverall ? "text-green-600" : ""}`}>{formatPrice(cheapest.price)}</span>
                        {isBestOverall && <div className="flex items-center justify-center gap-1 mt-1"><TrendingDown className="w-3 h-3 text-green-500" /><span className="text-xs text-green-600">Best Deal</span></div>}
                        <p className="text-[10px] text-muted-foreground mt-0.5">{vendor?.name}</p>
                      </td>
                    );
                  })}
                </tr>
                {/* Category */}
                <tr className="border-t border-border">
                  <td className="p-3 text-xs font-semibold text-muted-foreground">Category</td>
                  {compareProducts.map(p => <td key={p.id} className="p-3 text-center"><Badge variant="outline" className="text-xs">{p.category}</Badge></td>)}
                </tr>
                {/* Rating */}
                <tr className="border-t border-border bg-muted/30">
                  <td className="p-3 text-xs font-semibold text-muted-foreground">Rating</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{p.avgRating}</span>
                        <span className="text-xs text-muted-foreground">({p.reviewCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Specs */}
                {allSpecs.map((spec, si) => (
                  <tr key={spec} className={`border-t border-border ${si % 2 === 0 ? "" : "bg-muted/30"}`}>
                    <td className="p-3 text-xs font-semibold text-muted-foreground">{spec}</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 text-center text-sm">{p.specs[spec] ?? <span className="text-muted-foreground text-xs">—</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
