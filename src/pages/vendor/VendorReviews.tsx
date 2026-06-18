"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import VendorLayout from "@/layouts/VendorLayout";
import ReviewCard from "@/components/ReviewCard";
import { reviews, products } from "@/data/mockData";

export default function VendorReviews() {
  const myProductIds = products.filter(p => p.vendorListings.some(l => l.vendorId === "v1")).map(p => p.id);
  const myReviews = reviews.filter(r => myProductIds.includes(r.productId));
  const allReviews = myReviews.length > 0 ? myReviews : reviews;

  const avgRating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(r => ({ rating: r, count: allReviews.filter(rev => rev.rating === r).length }));

  return (
    <VendorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Customer Reviews</h1>
          <p className="text-muted-foreground text-sm">{allReviews.length} reviews for your products</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-5xl font-black text-primary mb-2">{avgRating.toFixed(1)}</div>
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
              ))}
            </div>
            <p className="text-muted-foreground text-sm">{allReviews.length} total reviews</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="font-bold mb-3 text-sm">Rating Breakdown</h4>
            <div className="space-y-2">
              {ratingCounts.map(({ rating, count }) => {
                const pct = allReviews.length > 0 ? (count / allReviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-xs font-medium">{rating}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
                        className="bg-amber-400 h-2 rounded-full transition-all" />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review list */}
        <div className="space-y-3">
          {allReviews.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
      </div>
    </VendorLayout>
  );
}
