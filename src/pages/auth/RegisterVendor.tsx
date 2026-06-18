"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  shopName: z.string().min(2, "Shop name required"),
  businessType: z.string().min(1, "Select a business type"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  address: z.string().min(10, "Enter a full address"),
  cacNumber: z.string().min(5, "Enter a valid CAC number"),
  description: z.string().min(20, "Describe your business (min 20 chars)"),
  password: z.string().min(8, "At least 8 characters"),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type FormData = z.infer<typeof schema>;

export default function RegisterVendor() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { shopName: "", businessType: "", email: "", phone: "", address: "", cacNumber: "", description: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: FormData) => {
    login({ id: "v_new", name: data.shopName, email: data.email, role: "vendor" });
    toast({ title: "Vendor Application Submitted!", description: "We'll review your details within 24 hours." });
    setLocation("/vendor");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Store className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Register as a Vendor</h2>
          <p className="text-muted-foreground text-sm mt-1">Reach millions of price-conscious Nigerian shoppers</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="shopName" render={({ field }) => (
                  <FormItem><FormLabel>Shop Name</FormLabel><FormControl><Input data-testid="input-shop-name" placeholder="TechStore NG" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="businessType" render={({ field }) => (
                  <FormItem><FormLabel>Business Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger data-testid="select-business-type"><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="sole">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="ltd">Limited Company</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Business Email</FormLabel><FormControl><Input data-testid="input-email" type="email" placeholder="shop@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input data-testid="input-phone" placeholder="+234 800 000 0000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem><FormLabel>Business Address</FormLabel><FormControl><Input data-testid="input-address" placeholder="123 Computer Village, Ikeja, Lagos" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="cacNumber" render={({ field }) => (
                <FormItem><FormLabel>CAC Registration Number</FormLabel><FormControl><Input data-testid="input-cac" placeholder="RC-123456" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Business Description</FormLabel><FormControl><Textarea data-testid="input-description" placeholder="Tell customers about your business..." rows={3} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input data-testid="input-password" type={showPassword ? "text" : "password"} placeholder="Min 8 chars" {...field} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input data-testid="input-confirm-password" type="password" placeholder="Repeat password" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Button data-testid="button-register-vendor" type="submit" className="w-full gap-2 bg-amber-500 hover:bg-amber-600" size="lg">
                <Store className="w-4 h-4" /> Submit Vendor Application
              </Button>
            </form>
          </Form>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already a vendor? <Link href="/login"><span className="text-primary font-medium cursor-pointer hover:underline">Sign in</span></Link>
        </p>
      </motion.div>
    </div>
  );
}
