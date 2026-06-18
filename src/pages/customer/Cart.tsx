"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useCart } from "@/context/CartContext";
import { formatPrice, getVendorById } from "@/data/mockData";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);

  if (items.length === 0) {
    return (
      <CustomerLayout>
        <div className="text-center py-20">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Compare prices and add products to get started</p>
          <Link href="/dashboard/marketplace"><Button size="lg" data-testid="btn-browse">Browse Products</Button></Link>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground text-sm">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={clearCart} data-testid="btn-clear-cart">
            <Trash2 className="w-4 h-4 mr-2" /> Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map(item => {
                const vendor = getVendorById(item.vendor.vendorId);
                return (
                  <motion.div key={`${item.product.id}-${item.vendor.vendorId}`}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-card border border-border rounded-xl p-4 flex gap-4"
                    data-testid={`cart-item-${item.product.id}`}>
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Link href={`/dashboard/product/${item.product.id}`}>
                        <p className="font-semibold hover:text-primary cursor-pointer line-clamp-2 text-sm mb-1">{item.product.name}</p>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-2">Vendor: {vendor?.name}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 border border-border rounded-lg">
                          <button data-testid="btn-decrease" onClick={() => updateQuantity(item.product.id, item.vendor.vendorId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-l-lg">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button data-testid="btn-increase" onClick={() => updateQuantity(item.product.id, item.vendor.vendorId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-r-lg">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button data-testid="btn-remove" onClick={() => removeFromCart(item.product.id, item.vendor.vendorId)} className="text-destructive hover:text-destructive/80 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-primary">{formatPrice(item.vendor.price * item.quantity)}</p>
                      <p className="text-xs text-muted-foreground">{formatPrice(item.vendor.price)} each</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal ({totalItems} items)</span><span className="font-medium">{formatPrice(totalPrice)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery fee</span><span className="font-medium text-green-600">FREE</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-bold"><span>Total</span><span className="text-primary text-lg">{formatPrice(totalPrice)}</span></div>
              </div>
              <Button data-testid="btn-checkout" size="lg" className="w-full gap-2" onClick={() => setLocation("/dashboard/checkout")}>
                Checkout <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/dashboard/marketplace">
                <Button variant="ghost" size="sm" className="w-full mt-2 gap-2" data-testid="btn-continue-shopping">
                  <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
