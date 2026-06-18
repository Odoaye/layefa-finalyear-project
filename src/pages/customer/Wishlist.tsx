"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice, getCheapestListing, getVendorById } from "@/data/mockData";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground text-sm">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
          </div>
          {items.length > 0 && (
            <Link href="/dashboard/marketplace">
              <Button variant="outline" size="sm" className="gap-1.5">Browse More <ArrowRight className="w-3.5 h-3.5" /></Button>
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save products you like to compare prices later</p>
            <Link href="/dashboard/marketplace"><Button size="lg" data-testid="btn-browse">Browse Products</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {items.map((product, i) => {
                const cheapest = getCheapestListing(product);
                const vendor = getVendorById(cheapest.vendorId);
                return (
                  <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                    data-testid={`wishlist-item-${product.id}`}>
                    <div className="relative">
                      <Link href={`/dashboard/product/${product.id}`}>
                        <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover cursor-pointer" />
                      </Link>
                      <button onClick={() => removeFromWishlist(product.id)} data-testid={`btn-remove-wishlist-${product.id}`}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-destructive hover:bg-background transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <Link href={`/dashboard/product/${product.id}`}>
                        <p className="font-semibold text-sm line-clamp-2 cursor-pointer hover:text-primary mb-2">{product.name}</p>
                      </Link>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-lg font-bold text-primary">{formatPrice(cheapest.price)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Best price from {vendor?.name}</p>
                      <p className="text-xs text-muted-foreground mb-3">{product.vendorListings.length} vendor{product.vendorListings.length !== 1 ? "s" : ""} selling this</p>
                      <Button size="sm" className="w-full gap-2" data-testid={`btn-add-cart-${product.id}`}
                        onClick={() => addToCart(product, cheapest)}>
                        <ShoppingCart className="w-3.5 h-3.5" /> Add Best Price to Cart
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
