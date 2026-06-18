"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-black text-xl">MC</span>
          </div>
          <h1 className="text-3xl font-bold">Join MarketCompare</h1>
          <p className="text-muted-foreground mt-2">Choose how you want to use MarketCompare</p>
        </div>

        <div className="space-y-4">
          <Link href="/register/customer">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="border-2 border-border hover:border-primary rounded-xl p-6 cursor-pointer transition-colors group"
              data-testid="register-customer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Shop as a Customer</h3>
                  <p className="text-sm text-muted-foreground">Compare prices and find the best deals</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          </Link>

          <Link href="/register/vendor">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="border-2 border-border hover:border-primary rounded-xl p-6 cursor-pointer transition-colors group"
              data-testid="register-vendor">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40 rounded-xl flex items-center justify-center transition-colors">
                  <Store className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Sell as a Vendor</h3>
                  <p className="text-sm text-muted-foreground">List products and reach millions of buyers</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link href="/login"><span className="text-primary font-medium cursor-pointer hover:underline">Sign in</span></Link>
        </p>
      </motion.div>
    </div>
  );
}
