"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import CustomerLayout from "@/layouts/CustomerLayout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/mockData";

const SORT_OPTIONS = [
  { value: "cheapest", label: "Cheapest First" },
  { value: "priciest", label: "Most Expensive" },
  { value: "rating", label: "Best Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "vendors", label: "Most Vendors" },
];

export default function Marketplace() {
  const searchParams = useSearchParams();
  const initialQ = searchParams ? searchParams.get("q") ?? "" : "";
  const initialCategory = searchParams ? searchParams.get("category") ?? "" : "";

  const [query, setQuery] = useState(initialQ);
  const [activeQ, setActiveQ] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("cheapest");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [minVendors, setMinVendors] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeQ) {
      const q = activeQ.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)));
    }
    if (selectedCategory) {
      list = list.filter(p => p.category === selectedCategory || p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    if (minVendors) list = list.filter(p => p.vendorListings.length >= 2);
    list = list.filter(p => {
      const cheapest = Math.min(...p.vendorListings.map(v => v.price));
      return cheapest >= priceRange[0] && cheapest <= priceRange[1];
    });
    return list.sort((a, b) => {
      if (sortBy === "cheapest") return Math.min(...a.vendorListings.map(v => v.price)) - Math.min(...b.vendorListings.map(v => v.price));
      if (sortBy === "priciest") return Math.min(...b.vendorListings.map(v => v.price)) - Math.min(...a.vendorListings.map(v => v.price));
      if (sortBy === "rating") return b.avgRating - a.avgRating;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      if (sortBy === "vendors") return b.vendorListings.length - a.vendorListings.length;
      return 0;
    });
  }, [activeQ, selectedCategory, sortBy, priceRange, minVendors]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setActiveQ(query); };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground text-sm">Compare prices from {products.length}+ products across verified vendors</p>
        </div>

        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input data-testid="marketplace-search" placeholder="Search products..." className="pl-9" value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <Button type="submit" data-testid="btn-search">Search</Button>
          </form>
          <div className="flex gap-2 shrink-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44" data-testid="sort-select"><SelectValue /></SelectTrigger>
              <SelectContent>{SORT_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)} data-testid="btn-filters">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Category */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Category</h4>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setSelectedCategory("")}
                  className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${!selectedCategory ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                  All
                </button>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                    className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${selectedCategory === cat.name ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Price Range (₦)</h4>
              <Slider
                min={0} max={2000000} step={10000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2"
                data-testid="price-slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₦{priceRange[0].toLocaleString()}</span>
                <span>₦{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Other filters */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Other Filters</h4>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={minVendors} onCheckedChange={v => setMinVendors(!!v)} data-testid="filter-multi-vendor" />
                <span className="text-sm">Multiple vendors only</span>
              </label>
            </div>
          </motion.div>
        )}

        {/* Active filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">{filtered.length} products found</span>
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("")}><X className="w-3 h-3" /></button>
            </Badge>
          )}
          {activeQ && (
            <Badge variant="secondary" className="gap-1">
              "{activeQ}"
              <button onClick={() => { setActiveQ(""); setQuery(""); }}><X className="w-3 h-3" /></button>
            </Badge>
          )}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
