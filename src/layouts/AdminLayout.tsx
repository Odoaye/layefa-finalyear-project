"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Store, Package, CreditCard, BarChart2, Settings, Menu, X, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/vendors", label: "Vendors", icon: Store },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/transactions", label: "Transactions", icon: CreditCard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-1.5 px-4 text-center text-xs text-amber-700 dark:text-amber-400 font-medium flex items-center justify-center gap-2">
        <Shield className="w-3.5 h-3.5" /> Admin Control Panel — {user?.name}
      </div>
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 py-6 gap-6">
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button size="icon" className="rounded-full shadow-xl w-12 h-12" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-64 lg:w-56 xl:w-64 bg-sidebar border-r border-sidebar-border lg:border-none lg:bg-transparent
          transform transition-transform duration-300 lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col shrink-0 top-[72px] lg:top-auto
        `}>
          <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location === item.href || (item.href !== "/admin" && location?.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    data-testid={`admin-nav-${item.label.toLowerCase()}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors
                      ${isActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
