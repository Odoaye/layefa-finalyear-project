"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Heart, ShoppingCart, Package, Calculator, GitCompare, User, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/dashboard/cart", label: "Cart", icon: ShoppingCart, badge: "cart" },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart, badge: "wishlist" },
  { href: "/dashboard/orders", label: "My Orders", icon: Package },
  { href: "/dashboard/budget", label: "Budget Assistant", icon: Calculator },
  { href: "/dashboard/compare", label: "Compare Products", icon: GitCompare },
  { href: "/dashboard/profile", label: "My Profile", icon: User },
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const location = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user } = useAuth();

  const getBadge = (badge?: string) => {
    if (badge === "cart") return totalItems;
    if (badge === "wishlist") return wishlistItems.length;
    return 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 py-6 gap-6">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button size="icon" className="rounded-full shadow-xl w-12 h-12" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-64 lg:w-56 xl:w-64 bg-sidebar border-r border-sidebar-border lg:border-none lg:bg-transparent
          transform transition-transform duration-300 lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col shrink-0 top-16 lg:top-auto
        `}>
          <div className="p-4 border-b border-sidebar-border lg:hidden">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {user?.name?.charAt(0) ?? "U"}
              </div>
              <div>
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
          <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
              const count = item.badge ? getBadge(item.badge) : 0;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors group
                      ${isActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {count > 0 && (
                      <Badge variant={isActive ? "secondary" : "default"} className="h-5 min-w-5 px-1 text-[10px]">{count}</Badge>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
