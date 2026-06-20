"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, Clock, XCircle, Star, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/layouts/AdminLayout";
import { vendors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function AdminVendors() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "verified" ? v.isVerified : !v.isVerified);
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Vendor Management</h1>
          <p className="text-muted-foreground text-sm">{vendors.length} registered vendors</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Vendors", value: vendors.length, icon: Store, color: "bg-blue-100 text-blue-700" },
            { label: "Verified", value: vendors.filter(v => v.isVerified).length, icon: CheckCircle, color: "bg-green-100 text-green-700" },
            { label: "Pending Review", value: vendors.filter(v => !v.isVerified).length, icon: Clock, color: "bg-yellow-100 text-yellow-700" },
          ].map(stat => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color} border border-current/20`}>
              <stat.icon className="w-5 h-5 mb-2" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input data-testid="search-vendors" placeholder="Search vendors..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1.5">
            {["all", "verified", "pending"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((vendor, i) => (
            <motion.div key={vendor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-5"
              data-testid={`vendor-card-${vendor.id}`}>
              <div className="flex items-start gap-3 mb-4">
                <img src={vendor.logo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-sm truncate">{vendor.name}</p>
                    {vendor.isVerified && <CheckCircle className="w-4 h-4 text-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{vendor.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{vendor.avgRating}</span>
                    <span className="text-xs text-muted-foreground">· {vendor.totalSales.toLocaleString()} sales</span>
                  </div>
                </div>
              </div>

              <Badge variant="secondary" className={`mb-4 text-[10px] ${vendor.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {vendor.isVerified ? "Verified" : "Pending Review"}
              </Badge>

              <div className="flex gap-2">
                {!vendor.isVerified ? (
                  <>
                    <Button size="sm" className="flex-1 gap-1.5 h-8 text-xs" data-testid={`btn-approve-${vendor.id}`}
                      onClick={() => toast({ title: "Vendor approved!", description: vendor.name })}>
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs text-destructive border-destructive/30" data-testid={`btn-reject-${vendor.id}`}
                      onClick={() => toast({ title: "Vendor rejected", description: vendor.name })}>
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-xs" data-testid={`btn-revoke-${vendor.id}`}
                    onClick={() => toast({ title: "Verification revoked", description: vendor.name })}>
                    Revoke Verification
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
