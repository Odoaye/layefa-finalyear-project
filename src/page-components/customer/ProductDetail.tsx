"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Heart, Share2, ChevronLeft, ChevronRight, ShoppingCart, Package, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerLayout from "@/layouts/CustomerLayout";
import PriceComparisonTable from "@/components/PriceComparisonTable";
import ReviewCard from "@/components/ReviewCard";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products, reviews, formatPrice, getCheapestListing, getVendorById } from "@/data/mockData";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find(p => p.id === id);
  const [imgIdx, setImgIdx] = useState(0);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) {
    return (
      <CustomerLayout>
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <Link href="/dashboard/marketplace"><Button>Back to Marketplace</Button></Link>
        </div>
      </CustomerLayout>
    );
  }

  const cheapest = getCheapestListing(product);
  const vendor = getVendorById(cheapest.vendorId);
  const productReviews = reviews.filter(r => r.productId === id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== id).slice(0, 4);

  return (
    <CustomerLayout>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard/marketplace"><span className="hover:text-primary cursor-pointer flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Marketplace</span></Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3] mb-3">
              <motion.img
                key={imgIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[imgIdx]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="product-main-image"
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? "border-primary" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-5">
            <div>
              <Badge variant="outline" className="mb-3">{product.category}</Badge>
              <h1 className="text-2xl font-bold leading-tight mb-3" data-testid="product-name">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.avgRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.avgRating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
              </div>
            </div>

            {/* Price highlight */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Best available price</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-primary" data-testid="product-best-price">{formatPrice(cheapest.price)}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">from <span className="font-semibold">{vendor?.name}</span></span>
                {vendor?.isVerified && <Badge variant="secondary" className="text-[10px] px-1.5">Verified</Badge>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ships in {cheapest.shippingDays} day{cheapest.shippingDays !== 1 ? "s" : ""} · {cheapest.stock} in stock</p>
            </div>

            {/* Tags */}
            <div className="flex gap-1.5 flex-wrap">
              {product.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button data-testid="btn-add-to-cart-main" className="flex-1 gap-2" size="lg" onClick={() => addToCart(product, cheapest)}>
                <ShoppingCart className="w-4 h-4" /> Add Best Price to Cart
              </Button>
              <Button data-testid="btn-wishlist" variant="outline" size="icon" className="h-11 w-11"
                onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}>
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11" data-testid="btn-share">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* PRICE COMPARISON TABLE — the crown jewel */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-lg" id="compare">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-xs">$</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">Compare Vendor Prices</h2>
              <p className="text-xs text-muted-foreground">Find the best deal across all verified vendors</p>
            </div>
          </div>
          <PriceComparisonTable product={product} />
        </motion.div>

        {/* Tabs: Description, Specs, Reviews */}
        <Tabs defaultValue="specs">
          <TabsList className="w-full" data-testid="product-tabs">
            <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
            <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews ({productReviews.length || reviews.slice(0, 3).length})</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-4">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className={`flex items-center px-4 py-3 text-sm ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                  <span className="w-40 shrink-0 font-medium text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="description" className="mt-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-3">
              {(productReviews.length > 0 ? productReviews : reviews.slice(0, 3)).map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
