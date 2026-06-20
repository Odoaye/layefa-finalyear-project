"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ShoppingCart, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import VendorLayout from "@/layouts/VendorLayout";
import StatsCard from "@/components/StatsCard";
import { analytics, orders, formatPrice } from "@/data/mockData";

const COLORS = ["hsl(var(--primary))", "#10b981", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"];
const vendorData = analytics[0];
const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

export default function VendorAnalytics() {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Sales Analytics</h1>
          <p className="text-muted-foreground text-sm">Performance overview for TechStore NG</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={<DollarSign className="w-5 h-5" />} color="bg-green-100 dark:bg-green-900/30 text-green-600" change={15} index={0} />
          <StatsCard title="Total Orders" value={`${orders.length}`} icon={<ShoppingCart className="w-5 h-5" />} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" change={8} index={1} />
          <StatsCard title="Growth Rate" value="+15%" icon={<TrendingUp className="w-5 h-5" />} color="bg-purple-100 dark:bg-purple-900/30 text-purple-600" change={5} index={2} />
          <StatsCard title="Avg. Rating" value="4.8" icon={<Star className="w-5 h-5" />} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600" index={3} />
        </div>

        {/* Revenue chart */}
        {vendorData && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold mb-5">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={vendorData.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [formatPrice(v), "Revenue"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders trend */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold mb-5">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={vendorData?.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [formatPrice(v), "Revenue"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category breakdown */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold mb-5">Orders by Category</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={vendorData?.ordersByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="count" nameKey="category" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {vendorData?.ordersByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [v, "Orders"]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </VendorLayout>
  );
}
