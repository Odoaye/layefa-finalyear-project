"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Save, ShoppingBag, Package, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { orders, formatPrice } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function CustomerProfile() {
  const { user } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "", phone: "+234 800 000 0000", address: "123 Adeola Odeku Street, Victoria Island, Lagos" },
  });

  const onSubmit = () => {
    toast({ title: "Profile updated!", description: "Your changes have been saved." });
  };

  const totalSpent = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0);

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Profile</h1>

        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-amber-500 rounded-2xl p-6 text-primary-foreground flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-black">
            {user?.name?.charAt(0) ?? "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-primary-foreground/80 text-sm">{user?.email}</p>
            <p className="text-xs mt-1 text-primary-foreground/60 capitalize">Role: {user?.role}</p>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: ShoppingBag, label: "Total Spent", value: formatPrice(totalSpent) },
            { icon: Package, label: "Orders", value: `${orders.length}` },
            { icon: Heart, label: "Wishlist", value: `${wishlistItems.length}` },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Edit form */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-lg mb-5">Account Information</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> Full Name</FormLabel><FormControl><Input data-testid="input-name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</FormLabel><FormControl><Input data-testid="input-email" type="email" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Phone</FormLabel><FormControl><Input data-testid="input-phone" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Address</FormLabel><FormControl><Input data-testid="input-address" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Button data-testid="btn-save-profile" type="submit" className="gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </CustomerLayout>
  );
}
