"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Shield, Ban, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/layouts/AdminLayout";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  { id: "u1", name: "Chinedu Okafor", email: "chinedu@example.com", role: "customer", status: "active", joined: "2024-01-15", orders: 5 },
  { id: "u2", name: "Amaka Eze", email: "amaka@example.com", role: "customer", status: "active", joined: "2024-01-22", orders: 3 },
  { id: "u3", name: "Ibrahim Musa", email: "ibrahim@example.com", role: "customer", status: "active", joined: "2024-02-05", orders: 8 },
  { id: "u4", name: "Ngozi Adeyemi", email: "ngozi@example.com", role: "customer", status: "suspended", joined: "2024-02-10", orders: 1 },
  { id: "u5", name: "Emeka Nwosu", email: "emeka@example.com", role: "customer", status: "active", joined: "2024-01-30", orders: 12 },
  { id: "u6", name: "Fatima Abubakar", email: "fatima@example.com", role: "customer", status: "active", joined: "2024-02-15", orders: 4 },
  { id: "u7", name: "Tunde Babangida", email: "tunde@example.com", role: "customer", status: "active", joined: "2024-02-20", orders: 7 },
  { id: "u8", name: "Chioma Obi", email: "chioma@example.com", role: "customer", status: "active", joined: "2024-03-01", orders: 2 },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const filtered = mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-muted-foreground text-sm">{mockUsers.length} registered users</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: "74,231", icon: Users, color: "bg-blue-100 text-blue-700" },
            { label: "Active", value: "71,840", icon: Shield, color: "bg-green-100 text-green-700" },
            { label: "Suspended", value: "391", icon: Ban, color: "bg-red-100 text-red-700" },
          ].map(stat => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color} border border-current/20`}>
              <stat.icon className="w-5 h-5 mb-2" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input data-testid="search-users" placeholder="Search by name or email..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase px-4 py-3">User</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3 hidden sm:table-cell">Role</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Status</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3 hidden sm:table-cell">Orders</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-border last:border-0 hover:bg-muted/20"
                  data-testid={`user-row-${user.id}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{user.name.charAt(0)}</div>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <Badge variant="outline" className="text-[10px] capitalize">{user.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant="secondary" className={`text-[10px] ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className="text-sm font-medium">{user.orders}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`btn-view-user-${user.id}`}><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" data-testid={`btn-ban-user-${user.id}`}
                        onClick={() => toast({ title: user.status === "active" ? "User suspended" : "User reactivated", description: user.name })}>
                        <Ban className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
