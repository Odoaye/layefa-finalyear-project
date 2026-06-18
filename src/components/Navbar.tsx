"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Heart, Search, Menu, X, Sun, Moon, ChevronDown, User, LogOut, Package, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout, setRole } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/dashboard/marketplace?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getDashboardLink = () => {
    if (user?.role === "vendor") return "/vendor";
    if (user?.role === "admin") return "/admin";
    return "/dashboard";
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer shrink-0" data-testid="navbar-logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MC</span>
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:block">Market<span className="text-primary">Compare</span></span>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-testid="navbar-search"
                placeholder="Search products, vendors..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              data-testid="theme-toggle"
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link href="/dashboard/wishlist">
                <Button data-testid="navbar-wishlist" variant="ghost" size="icon" className="relative">
                  <Heart className="w-4 h-4" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px]">{wishlistItems.length}</Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Cart */}
            {isAuthenticated && (
              <Link href="/dashboard/cart">
                <Button data-testid="navbar-cart" variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px]">{totalItems}</Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Demo Role Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex gap-1 text-xs" data-testid="demo-role-switcher">
                  Demo <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1 text-xs text-muted-foreground font-medium">Switch Demo Role</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { setRole("customer"); setLocation("/dashboard"); }}>
                  <User className="w-4 h-4 mr-2" /> Customer View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setRole("vendor"); setLocation("/vendor"); }}>
                  <Package className="w-4 h-4 mr-2" /> Vendor View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setRole("admin"); setLocation("/admin"); }}>
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Admin View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button data-testid="user-menu" variant="ghost" size="sm" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {user?.name?.charAt(0) ?? "U"}
                    </div>
                    <span className="hidden sm:block text-sm">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setLocation(getDashboardLink())}>
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/dashboard/profile")}>
                    <User className="w-4 h-4 mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); setLocation("/"); }} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button data-testid="navbar-login" variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button data-testid="navbar-register" size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {mobileOpen && (
          <div className="pb-4 md:hidden border-t border-border pt-3 space-y-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
            </form>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => { setRole("customer"); setLocation("/dashboard"); setMobileOpen(false); }}>Customer</Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={() => { setRole("vendor"); setLocation("/vendor"); setMobileOpen(false); }}>Vendor</Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={() => { setRole("admin"); setLocation("/admin"); setMobileOpen(false); }}>Admin</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
