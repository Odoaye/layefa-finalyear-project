"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Truck, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  address: z.string().min(10, "Full address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  deliveryMethod: z.enum(["standard", "express", "same-day"]),
  paymentMethod: z.enum(["card", "bank-transfer", "ussd", "cash"]),
});
type FormData = z.infer<typeof schema>;

export default function Checkout() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState<"details" | "success">("details");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", phone: "", address: "", city: "", state: "", deliveryMethod: "standard", paymentMethod: "card" },
  });

  const onSubmit = () => {
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <CustomerLayout>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md mx-auto text-center py-12">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Order Placed!</h2>
          <p className="text-muted-foreground mb-2">Your order has been confirmed and the vendor has been notified.</p>
          <p className="text-muted-foreground text-sm mb-8">You'll receive a confirmation email shortly with your order details.</p>
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => setLocation("/dashboard/orders")} data-testid="btn-track-order">Track My Order</Button>
            <Button variant="outline" className="w-full" onClick={() => setLocation("/dashboard/marketplace")} data-testid="btn-continue-shopping">Continue Shopping</Button>
          </div>
        </motion.div>
      </CustomerLayout>
    );
  }

  if (items.length === 0) {
    setLocation("/dashboard/cart");
    return null;
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Shipping */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Shipping Address</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input data-testid="input-name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email</FormLabel><FormControl><Input data-testid="input-email" type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone</FormLabel><FormControl><Input data-testid="input-phone" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input data-testid="input-city" placeholder="Lagos" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem className="sm:col-span-2"><FormLabel>Street Address</FormLabel><FormControl><Input data-testid="input-address" placeholder="123 Adeola Odeku Street" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem><FormLabel>State</FormLabel><FormControl><Input data-testid="input-state" placeholder="Lagos State" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>

                {/* Delivery */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Delivery Method</h3>
                  </div>
                  <FormField control={form.control} name="deliveryMethod" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-2">
                          {[
                            { value: "standard", label: "Standard Delivery (3-5 days)", price: "FREE" },
                            { value: "express", label: "Express Delivery (1-2 days)", price: "₦2,500" },
                            { value: "same-day", label: "Same Day Delivery (Lagos only)", price: "₦5,000" },
                          ].map(opt => (
                            <label key={opt.value} className="flex items-center justify-between border border-border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value={opt.value} data-testid={`delivery-${opt.value}`} />
                                <span className="text-sm font-medium">{opt.label}</span>
                              </div>
                              <span className={`text-sm font-bold ${opt.price === "FREE" ? "text-green-600" : ""}`}>{opt.price}</span>
                            </label>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )} />
                </div>

                {/* Payment */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Payment Method</h3>
                  </div>
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-2">
                          {[
                            { value: "card", label: "Debit/Credit Card" },
                            { value: "bank-transfer", label: "Bank Transfer" },
                            { value: "ussd", label: "USSD" },
                            { value: "cash", label: "Pay on Delivery" },
                          ].map(opt => (
                            <label key={opt.value} className="flex items-center gap-2 border border-border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                              <RadioGroupItem value={opt.value} data-testid={`payment-${opt.value}`} />
                              <span className="text-sm font-medium">{opt.label}</span>
                            </label>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )} />
                </div>

                <Button data-testid="btn-place-order" type="submit" size="lg" className="w-full">
                  Place Order — {formatPrice(totalPrice)}
                </Button>
              </form>
            </Form>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
              <h3 className="font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.vendor.vendorId}`} className="flex gap-3">
                    <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold shrink-0">{formatPrice(item.vendor.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-1.5">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="text-green-600">FREE</span></div>
                <div className="flex justify-between font-bold pt-1"><span>Total</span><span className="text-primary">{formatPrice(totalPrice)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
