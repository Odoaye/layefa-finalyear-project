"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, TrendingDown, Search, Star, Shield, Truck, BarChart2, ChevronDown, ChevronUp, Zap, Smartphone, Monitor, ShoppingBag, Home, Activity, Book, Heart, Gamepad } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, formatPrice, getCheapestListing, getVendorById } from "@/data/mockData";

function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const categories = [
  { name: "Electronics", icon: Zap, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", count: "284" },
  { name: "Phones & Tablets", icon: Smartphone, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", count: "156" },
  { name: "Computers", icon: Monitor, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", count: "98" },
  { name: "Fashion", icon: ShoppingBag, color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300", count: "412" },
  { name: "Home & Kitchen", icon: Home, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300", count: "234" },
  { name: "Sports", icon: Activity, color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", count: "178" },
  { name: "Books", icon: Book, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300", count: "89" },
  { name: "Gaming", icon: Gamepad, color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300", count: "112" },
];

const faqs = [
  { q: "How does price comparison work?", a: "We show you the same product listed by multiple vendors side-by-side. You can instantly see who has the lowest price, best rating, and fastest delivery." },
  { q: "Is MarketCompare free to use?", a: "Yes! Browsing, searching, and comparing prices is completely free. You only pay for the products you buy." },
  { q: "How do I know vendors are trustworthy?", a: "All vendors are verified through our registration process. Verified vendors have the blue checkmark badge. Customer ratings also help you make informed decisions." },
  { q: "What is the Budget Assistant?", a: "Enter your budget and our system will filter all products to show only what you can afford, with the cheapest vendor offer highlighted for each product." },
  { q: "Can I sell on MarketCompare?", a: "Absolutely! Register as a vendor, complete verification, and start listing your products. Our pricing tools even help you see competitor prices to stay competitive." },
];

const testimonials = [
  { name: "Chinwe Obi", city: "Lagos", text: "I saved ₦85,000 on my iPhone purchase! The price comparison table showed me exactly which vendor had the best deal. This platform is a game changer!", rating: 5 },
  { name: "Babatunde Adeyemi", city: "Abuja", text: "As a small business owner, the vendor dashboard helps me monitor competitor prices daily. My sales have increased 40% since I joined MarketCompare.", rating: 5 },
  { name: "Ngozi Eze", city: "Port Harcourt", text: "The Budget Assistant is my favourite feature. I set my budget and it shows me only what I can afford with the best price. Very useful!", rating: 5 },
  { name: "Ibrahim Musa", city: "Kano", text: "Found the cheapest PS5 in Nigeria here! Saved over ₦50,000 compared to where I was going to buy it. Fast delivery too.", rating: 4 },
  { name: "Amaka Nwosu", city: "Enugu", text: "I love how transparent the pricing is. You can see all vendor prices at a glance and pick the one that suits your budget and delivery timeline.", rating: 5 },
];

export default function Landing() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const featuredProducts = products.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/dashboard/marketplace${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background pt-16 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              Nigeria's #1 Price Comparison Marketplace
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Compare Prices.<br />
              <span className="text-primary">Save More.</span>{" "}
              <span className="text-foreground">Buy Smarter.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Shop from 10,000+ verified vendors. See all prices side-by-side and always get the best deal in Nigeria.
            </p>

            <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  data-testid="hero-search"
                  placeholder="Search for iPhone, laptops, shoes..."
                  className="pl-9 h-12 text-base"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <Button data-testid="hero-search-btn" type="submit" size="lg" className="h-12 px-6">
                Search <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              {["iPhone 15 Pro", "PS5", "MacBook Air M2", "Samsung TV", "HP EliteBook"].map(term => (
                <button key={term} onClick={() => setLocation(`/dashboard/marketplace?q=${encodeURIComponent(term)}`)}
                  className="px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-primary-foreground">
          {[
            { label: "Products Listed", target: 50000, suffix: "+" },
            { label: "Verified Vendors", target: 10000, suffix: "+" },
            { label: "Saved by Customers", target: 2400000000, prefix: "₦", suffix: "+" },
            { label: "Happy Customers", target: 500000, suffix: "+" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-3xl font-extrabold">
                <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-primary-foreground/80 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">How Price Comparison Works</h2>
            <p className="text-muted-foreground">Get the best deal in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: Search, title: "Search a Product", desc: "Type any product name — laptop, phone, shoes, or appliance — and see results from all our verified vendors." },
              { step: "02", icon: BarChart2, title: "Compare All Prices", desc: "Our price comparison table shows every vendor's price, rating, stock level, and shipping time in one view." },
              { step: "03", icon: TrendingDown, title: "Buy at Best Price", desc: "Pick the cheapest offer that meets your delivery needs and add to cart. We highlight the best deal automatically." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="text-5xl font-black text-primary/20 mb-4">{item.step}</div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Popular Categories</h2>
              <p className="text-muted-foreground text-sm mt-1">Browse by category and compare prices</p>
            </div>
            <Link href="/dashboard/marketplace">
              <Button variant="outline" size="sm">View All <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLocation(`/dashboard/marketplace?category=${encodeURIComponent(cat.name)}`)}
                className={`${cat.color} rounded-xl p-4 cursor-pointer transition-shadow hover:shadow-md`}
                data-testid={`category-${cat.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <cat.icon className="w-6 h-6 mb-2" />
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs opacity-70">{cat.count} products</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground text-sm mt-1">Best deals from multiple vendors</p>
            </div>
            <Link href="/dashboard/marketplace">
              <Button variant="outline" size="sm">View All <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => {
              const cheapest = getCheapestListing(product);
              const vendor = getVendorById(cheapest.vendorId);
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/dashboard/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.name} className="w-full h-44 object-cover cursor-pointer" />
                  </Link>
                  <div className="p-4">
                    <Badge variant="outline" className="text-[10px] mb-2">{product.vendorListings.length} vendors</Badge>
                    <Link href={`/dashboard/product/${product.id}`}>
                      <p className="font-semibold text-sm line-clamp-2 cursor-pointer hover:text-primary mb-2">{product.name}</p>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-base font-bold text-primary">{formatPrice(cheapest.price)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">from {vendor?.name}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why MarketCompare */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Why Choose MarketCompare?</h2>
            <p className="text-muted-foreground">Built for Nigeria's smart shoppers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: TrendingDown, title: "Lowest Price Guaranteed", desc: "Our algorithm instantly highlights the cheapest offer across all vendors, so you never overpay." },
              { icon: Shield, title: "Verified Vendors Only", desc: "Every vendor is vetted. Look for the blue checkmark to shop from trusted, reliable sellers." },
              { icon: Truck, title: "Multiple Delivery Options", desc: "Choose from various delivery timeframes and pick what works for your schedule and budget." },
              { icon: BarChart2, title: "Real-Time Comparison", desc: "Prices update in real-time. The savings calculator shows exactly how much you save on each purchase." },
              { icon: Search, title: "Budget Assistant", desc: "Set your budget and see only products you can afford, each with the cheapest vendor offer highlighted." },
              { icon: Star, title: "Vendor Ratings & Reviews", desc: "Make informed decisions with authentic ratings and reviews from real Nigerian customers." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">What Nigerians Are Saying</h2>
            <p className="text-muted-foreground">Real reviews from real customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">{t.name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden" data-testid={`faq-item-${i}`}>
                <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-5 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-primary-foreground/80 mb-8">Join 500,000+ Nigerians who shop smarter with MarketCompare</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/register/customer">
              <Button size="lg" variant="secondary" className="font-bold" data-testid="cta-register">
                Start Shopping Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/register/vendor">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="cta-vendor">
                Sell on MarketCompare
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
