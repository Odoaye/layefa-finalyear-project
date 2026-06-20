"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Store, Star, CheckCircle, Users, Package, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import VendorLayout from "@/layouts/VendorLayout";
import { vendors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const vendor = vendors[0];

const schema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
});
type FormData = z.infer<typeof schema>;

export default function VendorProfile() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: vendor.name, description: vendor.description, phone: "+234 802 123 4567", email: "vendor@demo.com", address: vendor.location },
  });

  return (
    <VendorLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Shop Profile</h1>

        {/* Profile hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500 to-primary rounded-2xl p-6 text-white">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
              <Store className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{vendor.name}</h2>
                {vendor.isVerified && <CheckCircle className="w-5 h-5" />}
              </div>
              <p className="text-white/80 text-sm">{vendor.location}</p>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-white text-white" />{vendor.avgRating}</div>
                <div className="flex items-center gap-1"><Users className="w-4 h-4" />{vendor.totalSales.toLocaleString()} sales</div>
                <div className="flex items-center gap-1"><Package className="w-4 h-4" />Since {new Date(vendor.joinedDate).getFullYear()}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verification status */}
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-700 dark:text-green-400 text-sm">Verified Vendor</p>
            <p className="text-xs text-muted-foreground">Your shop has been verified. Customers see the blue checkmark badge on your listings.</p>
          </div>
        </div>

        {/* Edit form */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold mb-5">Edit Shop Information</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => toast({ title: "Profile saved!" }))} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Shop Name</FormLabel><FormControl><Input data-testid="input-shop-name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Business Email</FormLabel><FormControl><Input data-testid="input-email" type="email" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input data-testid="input-phone" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Business Address</FormLabel><FormControl><Input data-testid="input-address" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem className="sm:col-span-2"><FormLabel>Shop Description</FormLabel><FormControl><Textarea data-testid="input-description" rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Button data-testid="btn-save-profile" type="submit" className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
            </form>
          </Form>
        </div>
      </div>
    </VendorLayout>
  );
}
