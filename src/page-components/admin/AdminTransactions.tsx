"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CreditCard, TrendingUp, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "@/layouts/AdminLayout";
import { transactions, formatPrice } from "@/data/mockData";

export default function AdminTransactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = transactions.filter(t => {
    const matchSearch = t.id.includes(search) || t.orderId.includes(search);
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const totalSuccess = transactions.filter(t => t.status === "success").reduce((s, t) => s + t.amount, 0);
  const totalFailed = transactions.filter(t => t.status === "failed").reduce((s, t) => s + t.amount, 0);
  const totalPending = transactions.filter(t => t.status === "pending").reduce((s, t) => s + t.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Transaction Monitoring</h1>
          <p className="text-muted-foreground text-sm">{transactions.length} total transactions</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Successful", value: formatPrice(totalSuccess), count: transactions.filter(t => t.status === "success").length, icon: CreditCard, color: "bg-green-100 text-green-700 border-green-200" },
            { label: "Pending", value: formatPrice(totalPending), count: transactions.filter(t => t.status === "pending").length, icon: TrendingUp, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
            { label: "Failed", value: formatPrice(totalFailed), count: transactions.filter(t => t.status === "failed").length, icon: AlertCircle, color: "bg-red-100 text-red-700 border-red-200" },
          ].map(stat => (
            <div key={stat.label} className={`rounded-xl p-4 border ${stat.color}`}>
              <stat.icon className="w-5 h-5 mb-2" />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs">{stat.count} {stat.label.toLowerCase()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input data-testid="search-txn" placeholder="Search by transaction or order ID..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-36" data-testid="filter-txn-status"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Transaction ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase px-4 py-3 hidden sm:table-cell">Order ID</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Amount</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn, i) => (
                <motion.tr key={txn.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="border-b border-border last:border-0 hover:bg-muted/20"
                  data-testid={`txn-row-${txn.id}`}>
                  <td className="px-4 py-3 font-mono text-sm">{txn.id}</td>
                  <td className="px-4 py-3 font-mono text-sm text-muted-foreground hidden sm:table-cell">{txn.orderId}</td>
                  <td className="px-4 py-3 text-right font-bold">{formatPrice(txn.amount)}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant="secondary" className={`text-[10px] ${txn.status === "success" ? "bg-green-100 text-green-700" : txn.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                    {new Date(txn.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
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
