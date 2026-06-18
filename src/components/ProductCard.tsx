"use client";

import { Heart, Star, ShoppingCart, TrendingDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice, getCheapestListing, getMostExpensiveListing, getVendorById } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const cheapest = getCheapestListing(product);
  const priciest = getMostExpensiveListing(product);
  const savings = priciest.price - cheapest.price;
  const vendor = getVendorById(cheapest.vendorId);
  const vendorCount = product.vendorListings.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative">
        <Link href={`/dashboard/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button
          data-testid={`btn-wishlist-${product.id}`}
          onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
        {vendorCount > 1 && (
          <Badge className="absolute top-3 left-3 text-xs" variant="secondary">
            {vendorCount} vendors
          </Badge>
        )}
        {savings > 0 && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> Save {formatPrice(savings)}
          </div>
        )}
      </div>

      <div className="p-4">
        <Badge variant="outline" className="text-[10px] mb-2">{product.category}</Badge>
        <Link href={`/dashboard/product/${product.id}`}>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 cursor-pointer hover:text-primary transition-colors mb-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium">{product.avgRating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary" data-testid={`text-price-${product.id}`}>{formatPrice(cheapest.price)}</span>
            {savings > 0 && <span className="text-xs text-muted-foreground line-through">{formatPrice(priciest.price)}</span>}
          </div>
          <p className="text-xs text-muted-foreground">
            Best price from <span className="font-medium text-foreground">{vendor?.name}</span>
          </p>
        </div>

        <Button
          data-testid={`btn-add-cart-${product.id}`}
          size="sm"
          className="w-full gap-2"
          onClick={() => addToCart(product, cheapest)}
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
