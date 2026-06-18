"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VendorLayout from "@/layouts/VendorLayout";
import { categories } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(3),
  category: z.string().min(1),
  description: z.string().min(20),
  price: z.string().min(1),
  stock: z.string().min(1),
  shippingDays: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

export default function AddProduct() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", category: "", description: "", price: "", stock: "", shippingDays: "3" },
  });

  const onSubmit = () => {
    toast({ title: "Product added!", description: "Your product is now live on the marketplace." });
    setLocation("/vendor/products");
  };

  return (
    <VendorLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/vendor/products")} data-testid="btn-back">
            <ArrowLeft className="w-4 h-4 mr-1" /> Products
          </Button>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input data-testid="input-product-name" placeholder="iPhone 15 Pro 256GB" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger data-testid="select-category"><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                    <SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea data-testid="input-description" rows={4} placeholder="Describe the product..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Price (₦)</FormLabel><FormControl><Input data-testid="input-price" placeholder="450000" type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="stock" render={({ field }) => (
                  <FormItem><FormLabel>Stock Qty</FormLabel><FormControl><Input data-testid="input-stock" placeholder="10" type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="shippingDays" render={({ field }) => (
                  <FormItem><FormLabel>Shipping Days</FormLabel><FormControl><Input data-testid="input-shipping" placeholder="3" type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Button data-testid="btn-submit-product" type="submit" className="gap-2"><Plus className="w-4 h-4" /> Add Product to Marketplace</Button>
            </form>
          </Form>
        </div>
      </div>
    </VendorLayout>
  );
}
