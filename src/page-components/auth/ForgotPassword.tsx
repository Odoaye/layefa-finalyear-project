"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({ email: z.string().email("Enter a valid email address") });
type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const [sent, setSent] = useState(false);
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = () => setSent(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{sent ? "Check your email" : "Forgot your password?"}</h2>
          <p className="text-muted-foreground text-sm mt-2">
            {sent ? "We sent a password reset link to your email address." : "Enter your email and we'll send you a reset link."}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          {!sent ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input data-testid="input-email" type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button data-testid="button-send-reset" type="submit" className="w-full gap-2" size="lg">
                  <Send className="w-4 h-4" /> Send Reset Link
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground">If the email exists in our system, you'll receive a reset link shortly. Check your spam folder too.</p>
              <Button variant="outline" className="w-full" onClick={() => setLocation("/reset-password")} data-testid="button-go-reset">
                Go to Reset Password
              </Button>
            </div>
          )}
        </div>

        <Link href="/login">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4 cursor-pointer hover:text-primary transition-colors" data-testid="link-back-login">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
