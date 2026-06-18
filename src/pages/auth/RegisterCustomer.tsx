"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid Nigerian phone number"),
  password: z.string().min(8, "At least 8 characters"),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type FormData = z.infer<typeof schema>;

export default function RegisterCustomer() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: FormData) => {
    login({ id: "c1", name: data.name, email: data.email, role: "customer" });
    toast({ title: "Account created!", description: "Welcome to MarketCompare!" });
    setLocation("/verify-email");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold">MC</span>
          </div>
          <h2 className="text-2xl font-bold">Create Customer Account</h2>
          <p className="text-muted-foreground text-sm mt-1">Start comparing prices and saving money</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input data-testid="input-name" placeholder="Chinedu Okafor" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input data-testid="input-email" type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input data-testid="input-phone" placeholder="+234 800 000 0000" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem><FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input data-testid="input-password" type={showPassword ? "text" : "password"} placeholder="Minimum 8 characters" {...field} />
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
              <Button data-testid="button-register" type="submit" className="w-full gap-2" size="lg">
                <UserPlus className="w-4 h-4" /> Create Account
              </Button>
            </form>
          </Form>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link href="/login"><span className="text-primary font-medium cursor-pointer hover:underline">Sign in</span></Link>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Want to sell? <Link href="/register/vendor"><span className="text-primary cursor-pointer hover:underline">Register as Vendor</span></Link>
        </p>
      </motion.div>
    </div>
  );
}
