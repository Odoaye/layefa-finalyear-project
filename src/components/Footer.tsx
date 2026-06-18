"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MC</span>
              </div>
              <span className="font-bold text-lg">Market<span className="text-primary">Compare</span></span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Nigeria's smartest multi-vendor marketplace. Compare prices across vendors and always get the best deal.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">For Customers</h4>
            <ul className="space-y-2">
              {[
                { label: "Browse Marketplace", href: "/dashboard/marketplace" },
                { label: "Price Comparison", href: "/dashboard/marketplace" },
                { label: "Budget Assistant", href: "/dashboard/budget" },
                { label: "Track Orders", href: "/dashboard/orders" },
                { label: "My Wishlist", href: "/dashboard/wishlist" },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">For Vendors</h4>
            <ul className="space-y-2">
              {[
                { label: "Sell on MarketCompare", href: "/register/vendor" },
                { label: "Vendor Dashboard", href: "/vendor" },
                { label: "Manage Products", href: "/vendor/products" },
                { label: "Pricing Tools", href: "/vendor/pricing" },
                { label: "View Analytics", href: "/vendor/analytics" },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Contact & Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                123 Adeola Odeku Street, Victoria Island, Lagos, Nigeria
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                +234 800 MARKET
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                hello@marketcompare.ng
              </li>
            </ul>
            <div className="mt-4 space-y-1">
              <Link href="/about"><span className="block text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">About Project</span></Link>
              <Link href="/contact"><span className="block text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">Contact Us</span></Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            2024 MarketCompare Nigeria. Final Year Project — Multi-Vendor E-Commerce Platform with Price Comparison.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
