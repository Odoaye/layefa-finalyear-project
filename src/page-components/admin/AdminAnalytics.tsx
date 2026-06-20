"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import AdminLayout from "@/layouts/AdminLayout";
import StatsCard from "@/components/StatsCard";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { transactions, formatPrice } from "@/data/mockData";

const COLORS = ["hsl(var(--primary))", "#10b981", "#6366f1", "#f59e0b", "#ef4444"];

const monthlyData = [
  { month: "Aug", revenue: 18500000, users: 12000, orders: 840 },
  { month: "Sep", revenue: 24100000, users: 18000, orders: 1200 },
  { month: "Oct", revenue: 28800000, users: 24000, orders: 1540 },
  { month: "Nov", revenue: 35200000, users: 31000, orders: 1980 },
  { month: "Dec", revenue: 52800000, users: 45000, orders: 2940 },
  { month: "Jan", revenue: 41500000, users: 52000, orders: 2300 },
  { month: "Feb", revenue: 48100000, users: 61000, orders: 2680 },
  { month: "Mar", revenue: 56200000, users: 74000, orders: 3120 },
];

const topCategories = [
  { name: "Electronics", revenue: 18500000 }, { name: "Phones", revenue: 14200000 },
  { name: "Computers", revenue: 9800000 }, { name: "Fashion", revenue: 6400000 }, { name: "Home", revenue: 4100000 },
];

const platformMetrics = [
  { name: "Customers", value: 68 }, { name: "Vendors", value: 18 }, { name: "Admins", value: 14 },
];

const totalRevenue = transactions.filter(t => t.status === "success").reduce((s, t) => s + t.amount, 0);

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground text-sm">Full-platform performance data</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={<DollarSign className="w-5 h-5" />} color="bg-green-100 dark:bg-green-900/30 text-green-600" change={18} index={0} />
          <StatsCard title="Total Users" value="74,231" icon={<Users className="w-5 h-5" />} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" change={12} index={1} />
          <StatsCard title="Total Orders" value="14,820" icon={<ShoppingCart className="w-5 h-5" />} color="bg-purple-100 dark:bg-purple-900/30 text-purple-600" change={8} index={2} />
          <StatsCard title="Growth Rate" value="+18%" icon={<TrendingUp className="w-5 h-5" />} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600" change={3} index={3} />
        </div>

        {/* Revenue + Orders over time */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold mb-5">Revenue & Orders Over Time</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="revenue" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `₦${(v / 1000000).toFixed(0)}M`} />
              <YAxis yAxisId="orders" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip formatter={(v: number, name: string) => [name === "revenue" ? formatPrice(v) : v.toLocaleString(), name === "revenue" ? "Revenue" : "Orders"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Area yAxisId="revenue" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" strokeWidth={2} />
              <Line yAxisId="orders" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top categories */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold mb-5">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topCategories} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `₦${(v / 1000000).toFixed(0)}M`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip formatter={(v: number) => [formatPrice(v), "Revenue"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* User types */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold mb-5">Platform User Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={platformMetrics} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="name" label={({ name, value }) => `${name}: ${value}%`} labelLine={false} fontSize={11}>
                  {platformMetrics.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, "Share"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
