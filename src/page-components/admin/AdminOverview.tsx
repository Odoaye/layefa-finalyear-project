"use client";

import { motion } from "framer-motion";
import { Users, Store, Package, CreditCard, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/layouts/AdminLayout";
import StatsCard from "@/components/StatsCard";
import { vendors, products, orders, transactions, formatPrice } from "@/data/mockData";

const COLORS = ["hsl(var(--primary))", "#10b981", "#6366f1", "#f59e0b", "#ef4444"];

const userGrowth = [
  { month: "Aug", users: 12000 }, { month: "Sep", users: 18000 }, { month: "Oct", users: 24000 },
  { month: "Nov", users: 31000 }, { month: "Dec", users: 45000 }, { month: "Jan", users: 52000 },
  { month: "Feb", users: 61000 }, { month: "Mar", users: 74000 },
];

const categoryRevenue = [
  { name: "Electronics", value: 35 }, { name: "Phones", value: 28 },
  { name: "Computers", value: 18 }, { name: "Fashion", value: 12 }, { name: "Other", value: 7 },
];

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-700", processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700", "out-for-delivery": "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700", cancelled: "bg-red-100 text-red-700",
};

export default function AdminOverview() {
  const totalRevenue = transactions.filter(t => t.status === "success").reduce((s, t) => s + t.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Overview</h1>
          <p className="text-muted-foreground text-sm">Platform-wide metrics and insights</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Users" value="74,231" icon={<Users className="w-5 h-5" />} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" change={12} index={0} />
          <StatsCard title="Active Vendors" value={`${vendors.length}`} icon={<Store className="w-5 h-5" />} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600" change={5} index={1} />
          <StatsCard title="Total Products" value={`${products.length}`} icon={<Package className="w-5 h-5" />} color="bg-purple-100 dark:bg-purple-900/30 text-purple-600" change={8} index={2} />
          <StatsCard title="Revenue" value={formatPrice(totalRevenue)} icon={<CreditCard className="w-5 h-5" />} color="bg-green-100 dark:bg-green-900/30 text-green-600" change={18} index={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-bold">User Growth</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [v.toLocaleString(), "Users"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold mb-5">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categoryRevenue} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" nameKey="name">
                  {categoryRevenue.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, "Share"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {categoryRevenue.map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{cat.name} ({cat.value}%)</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Vendor Apps */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-primary" />
              <h3 className="font-bold">Recent Vendor Applications</h3>
            </div>
            <div className="space-y-3">
              {vendors.slice(0, 4).map((vendor, i) => (
                <div key={vendor.id} className="flex items-center gap-3">
                  <img src={vendor.logo} alt="" className="w-9 h-9 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor.location}</p>
                  </div>
                  {vendor.isVerified ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-[10px]"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-[10px]"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="font-bold">Recent Transactions</h3>
            </div>
            <div className="space-y-3">
              {transactions.slice(0, 4).map(txn => (
                <div key={txn.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs font-semibold">{txn.id}</p>
                    <p className="text-xs text-muted-foreground">{new Date(txn.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{formatPrice(txn.amount)}</p>
                    <Badge variant="secondary" className={`text-[10px] ${txn.status === "success" ? "bg-green-100 text-green-700" : txn.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
