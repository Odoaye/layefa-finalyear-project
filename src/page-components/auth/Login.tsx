"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const { login, setRole } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormData) => {
    if (data.email.includes("vendor")) {
      login({ id: "v1", name: "TechStore NG", email: data.email, role: "vendor" });
      setLocation("/vendor");
    } else if (data.email.includes("admin")) {
      login({ id: "a1", name: "Admin", email: data.email, role: "admin" });
      setLocation("/admin");
    } else {
      login({ id: "c1", name: "Demo Customer", email: data.email, role: "customer" });
      setLocation("/dashboard");
    }
    toast({ title: "Welcome back!", description: "You are now signed in." });
  };

  const demoLogin = (role: "customer" | "vendor" | "admin") => {
    setRole(role);
    if (role === "vendor") setLocation("/vendor");
    else if (role === "admin") setLocation("/admin");
    else setLocation("/dashboard");
    toast({ title: "Demo mode active", description: `Signed in as ${role}` });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col items-center justify-center p-12 text-primary-foreground">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-md text-center">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-black">MC</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to MarketCompare</h1>
          <p className="text-primary-foreground/80 leading-relaxed">Nigeria's smartest marketplace. Compare prices across thousands of vendors and always get the best deal.</p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 lg:hidden">
              <span className="text-primary-foreground font-bold">MC</span>
            </div>
            <h2 className="text-2xl font-bold">Sign in to your account</h2>
            <p className="text-muted-foreground text-sm mt-1">Don't have an account? <Link href="/register"><span className="text-primary font-medium cursor-pointer">Register</span></Link></p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl><Input data-testid="input-email" type="email" placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="/forgot-password"><span className="text-xs text-primary cursor-pointer hover:underline">Forgot password?</span></Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input data-testid="input-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button data-testid="button-submit" type="submit" className="w-full gap-2" size="lg">
                <LogIn className="w-4 h-4" /> Sign In
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative text-center text-xs text-muted-foreground mb-4">
              <span className="px-2 bg-background">Or try a demo account</span>
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <span className="relative px-2 bg-background">Or try a demo account</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button data-testid="demo-customer" variant="outline" size="sm" onClick={() => demoLogin("customer")}>Customer</Button>
              <Button data-testid="demo-vendor" variant="outline" size="sm" onClick={() => demoLogin("vendor")}>Vendor</Button>
              <Button data-testid="demo-admin" variant="outline" size="sm" onClick={() => demoLogin("admin")}>Admin</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
