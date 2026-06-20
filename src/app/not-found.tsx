"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <div className="text-8xl font-black text-primary/20 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you are looking for does not exist or has been moved.</p>
        <div className="flex justify-center gap-3">
          <Link href="/"><Button className="gap-2"><Home className="w-4 h-4" /> Go Home</Button></Link>
          <Link href="/dashboard/marketplace"><Button variant="outline" className="gap-2"><Search className="w-4 h-4" /> Marketplace</Button></Link>
        </div>
      </motion.div>
    </div>
  );
}
