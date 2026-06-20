"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Filter, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useCart } from "@/context/CartContext";
import { products, categories, formatPrice, getCheapestListing, getMostExpensiveListing, getVendorById } from "@/data/mockData";

export default function BudgetAssistant() {
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sortBy, setSortBy] = useState("best-value");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart } = useCart();

  const budgetNum = parseInt(budget.replace(/,/g, ""), 10) || 0;

  const affordableProducts = useMemo(() => {
    if (!submitted || budgetNum <= 0) return [];
    let list = products.filter(p => {
      const cheapest = getCheapestListing(p).price;
      return cheapest <= budgetNum;
    });
    if (selectedCategory) list = list.filter(p => p.category === selectedCategory);
    return list.sort((a, b) => {
      if (sortBy === "best-value") return b.avgRating - a.avgRating;
      if (sortBy === "cheapest") return getCheapestListing(a).price - getCheapestListing(b).price;
      if (sortBy === "biggest-savings") {
        const savA = getMostExpensiveListing(a).price - getCheapestListing(a).price;
        const savB = getMostExpensiveListing(b).price - getCheapestListing(b).price;
        return savB - savA;
      }
      return 0;
    });
  }, [submitted, budgetNum, sortBy, selectedCategory]);

  const totalSavings = affordableProducts.reduce((sum, p) => {
    return sum + (getMostExpensiveListing(p).price - getCheapestListing(p).price);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetNum > 0) setSubmitted(true);
  };

  const formatBudgetInput = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num ? parseInt(num).toLocaleString() : "";
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Budget Assistant</h1>
          <p className="text-muted-foreground text-sm">Enter your budget and we'll show you everything you can afford with the best prices</p>
        </div>

        {/* Budget input */}
        <div className="bg-gradient-to-r from-primary/10 to-amber-500/10 border border-primary/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold">What is your budget?</h2>
              <p className="text-sm text-muted-foreground">We'll filter products to show only what you can afford</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-xl">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-lg">₦</span>
              <Input
                data-testid="input-budget"
                className="pl-8 text-lg h-12"
                placeholder="50,000"
                value={budget}
                onChange={e => setBudget(formatBudgetInput(e.target.value))}
              />
            </div>
            <Button data-testid="btn-find-products" type="submit" size="lg" className="h-12 px-8">
              Find Products
            </Button>
          </form>

          {/* Quick budget presets */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {[50000, 100000, 200000, 500000, 1000000].map(amt => (
              <button key={amt} onClick={() => { setBudget(amt.toLocaleString()); setSubmitted(true); }}
                className="px-3 py-1 rounded-full text-xs bg-background border border-border hover:border-primary hover:text-primary transition-colors">
                {formatPrice(amt)}
              </button>
            ))}
          </div>
        </div>

        {submitted && budgetNum > 0 && (
          <>
            {/* Results summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">{affordableProducts.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Products within budget</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{formatPrice(totalSavings)}</p>
                <p className="text-xs text-muted-foreground mt-1">Total potential savings</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold">{formatPrice(budgetNum)}</p>
                <p className="text-xs text-muted-foreground mt-1">Your budget</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm text-muted-foreground">{affordableProducts.length} results</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44" data-testid="sort-budget"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="best-value">Best Value</SelectItem>
                  <SelectItem value="cheapest">Cheapest First</SelectItem>
                  <SelectItem value="biggest-savings">Biggest Savings</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-44" data-testid="filter-category-budget"><SelectValue placeholder="All Categories" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {affordableProducts.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-xl">
                <TrendingDown className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-semibold">No products found in this category within your budget</p>
                <button onClick={() => setSelectedCategory("")} className="text-primary text-sm mt-2 hover:underline">Clear category filter</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {affordableProducts.map((product, i) => {
                  const cheapest = getCheapestListing(product);
                  const priciest = getMostExpensiveListing(product);
                  const savings = priciest.price - cheapest.price;
                  const vendor = getVendorById(cheapest.vendorId);
                  const remaining = budgetNum - cheapest.price;
                  return (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                      data-testid={`budget-product-${product.id}`}>
                      <Link href={`/dashboard/product/${product.id}`}>
                        <img src={product.images[0]} alt={product.name} className="w-full h-44 object-cover cursor-pointer" />
                      </Link>
                      <div className="p-4">
                        <Badge variant="outline" className="text-[10px] mb-2">{product.category}</Badge>
                        <Link href={`/dashboard/product/${product.id}`}>
                          <p className="font-semibold text-sm line-clamp-2 cursor-pointer hover:text-primary mb-2">{product.name}</p>
                        </Link>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-lg font-bold text-primary">{formatPrice(cheapest.price)}</span>
                          {savings > 0 && <span className="text-xs text-muted-foreground line-through">{formatPrice(priciest.price)}</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">Best price from {vendor?.name}</p>
                        {savings > 0 && (
                          <div className="flex items-center gap-1 mb-2">
                            <TrendingDown className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">Save {formatPrice(savings)}</span>
                          </div>
                        )}
                        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg px-2.5 py-1.5 mb-3">
                          <p className="text-xs text-green-700 dark:text-green-400 font-medium">{formatPrice(remaining)} left in budget after purchase</p>
                        </div>
                        <Button size="sm" className="w-full gap-2" data-testid={`btn-add-budget-${product.id}`}
                          onClick={() => addToCart(product, cheapest)}>
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </CustomerLayout>
  );
}
