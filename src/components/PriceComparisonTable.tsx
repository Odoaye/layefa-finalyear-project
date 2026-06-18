"use client";

import { Star, ShoppingCart, CheckCircle, Truck, Package } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, VendorListing, Vendor } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice, getVendorById } from "@/data/mockData";

interface PriceComparisonTableProps {
  product: Product;
}

export default function PriceComparisonTable({ product }: PriceComparisonTableProps) {
  const { addToCart } = useCart();
  const sortedListings = [...product.vendorListings].sort((a, b) => a.price - b.price);
  const cheapestPrice = sortedListings[0].price;
  const highestPrice = sortedListings[sortedListings.length - 1].price;
  const totalSavings = highestPrice - cheapestPrice;

  return (
    <div className="space-y-4" data-testid="price-comparison-table">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Price Comparison</h3>
          <p className="text-sm text-muted-foreground">{sortedListings.length} vendors selling this product</p>
        </div>
        {totalSavings > 0 && (
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Potential savings</div>
            <div className="text-lg font-bold text-green-600">{formatPrice(totalSavings)}</div>
          </div>
        )}
      </div>

      {/* Savings banner */}
      {totalSavings > 0 && (
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <div className="text-sm">
            <span className="font-semibold text-green-700 dark:text-green-400">Best price: {formatPrice(cheapestPrice)}</span>
            <span className="text-green-600 dark:text-green-500"> — Save {formatPrice(totalSavings)} vs most expensive offer!</span>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-border rounded-xl overflow-hidden">
        {/* Header row */}
        <div className="bg-muted/50 grid grid-cols-12 gap-2 px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border">
          <div className="col-span-4">Vendor</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center hidden sm:block">Stock</div>
          <div className="col-span-2 text-center hidden sm:block">Shipping</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Vendor rows */}
        {sortedListings.map((listing, i) => {
          const vendor = getVendorById(listing.vendorId);
          const isCheapest = listing.price === cheapestPrice;
          const savingsVsCheapest = listing.price - cheapestPrice;
          if (!vendor) return null;
          return (
            <VendorRow
              key={listing.vendorId}
              listing={listing}
              vendor={vendor}
              product={product}
              isCheapest={isCheapest}
              savingsVsCheapest={savingsVsCheapest}
              index={i}
              onAddToCart={() => addToCart(product, listing)}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary/20 border border-primary/50"></div>
          <span>Best Price</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Vendor rating</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5" />
          <span>Delivery days</span>
        </div>
      </div>
    </div>
  );
}

function VendorRow({ listing, vendor, product, isCheapest, savingsVsCheapest, index, onAddToCart }: {
  listing: VendorListing; vendor: Vendor; product: Product;
  isCheapest: boolean; savingsVsCheapest: number; index: number;
  onAddToCart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`grid grid-cols-12 gap-2 px-4 py-4 items-center border-b border-border last:border-0 transition-colors
        ${isCheapest ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"}`}
      data-testid={`vendor-row-${vendor.id}`}
    >
      {/* Vendor info */}
      <div className="col-span-4 flex items-center gap-3">
        <img src={vendor.logo} alt={vendor.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm truncate">{vendor.name}</span>
            {vendor.isVerified && <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-muted-foreground">{vendor.avgRating} · {vendor.location}</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-2 text-center">
        <div className={`font-bold text-sm ${isCheapest ? "text-primary" : "text-foreground"}`}>
          {formatPrice(listing.price)}
        </div>
        {isCheapest ? (
          <Badge className="text-[10px] px-1.5 h-4">Best Price</Badge>
        ) : savingsVsCheapest > 0 ? (
          <div className="text-[10px] text-muted-foreground">+{formatPrice(savingsVsCheapest)}</div>
        ) : null}
      </div>

      {/* Stock */}
      <div className="col-span-2 text-center hidden sm:block">
        <div className="flex items-center justify-center gap-1">
          <Package className="w-3 h-3 text-muted-foreground" />
          <span className={`text-xs ${listing.stock === 0 ? "text-destructive" : listing.stock < 5 ? "text-amber-600" : "text-muted-foreground"}`}>
            {listing.stock === 0 ? "Out of stock" : `${listing.stock} left`}
          </span>
        </div>
      </div>

      {/* Shipping */}
      <div className="col-span-2 text-center hidden sm:block">
        <div className="flex items-center justify-center gap-1">
          <Truck className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{listing.shippingDays}d</span>
        </div>
      </div>

      {/* Action */}
      <div className="col-span-2 flex justify-end">
        <Button
          data-testid={`btn-buy-vendor-${vendor.id}`}
          size="sm"
          variant={isCheapest ? "default" : "outline"}
          className="text-xs px-3 h-8"
          disabled={listing.stock === 0}
          onClick={onAddToCart}
        >
          {listing.stock === 0 ? "Unavail." : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
}
