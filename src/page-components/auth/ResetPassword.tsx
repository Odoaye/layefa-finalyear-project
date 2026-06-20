"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
  password: z.string().min(8, "At least 8 characters"),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });
type FormData = z.infer<typeof schema>;

export default function ResetPassword() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const [done, setDone] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { password: "", confirmPassword: "" } });

  const onSubmit = () => setDone(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {done ? <CheckCircle className="w-7 h-7 text-green-600" /> : <Lock className="w-7 h-7 text-primary" />}
          </div>
          <h2 className="text-2xl font-bold">{done ? "Password Reset!" : "Set New Password"}</h2>
          <p className="text-muted-foreground text-sm mt-2">{done ? "Your password has been changed successfully." : "Create a new secure password for your account."}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          {!done ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input data-testid="input-password" type={showPass ? "text" : "password"} placeholder="Minimum 8 characters" {...field} />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input data-testid="input-confirm-password" type="password" placeholder="Repeat new password" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button data-testid="button-reset" type="submit" className="w-full" size="lg">Reset Password</Button>
              </form>
            </Form>
          ) : (
            <div className="text-center space-y-4">
              <Button className="w-full" size="lg" onClick={() => setLocation("/login")} data-testid="button-go-login">Sign In with New Password</Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
