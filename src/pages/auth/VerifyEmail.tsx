"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, CheckCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmail() {
  const router = useRouter();
  const setLocation = (path: string) => router.push(path);
  const { user } = useAuth();
  const [verified, setVerified] = useState(false);
  const [resent, setResent] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            {verified ? <CheckCircle className="w-10 h-10 text-green-600" /> : <Mail className="w-10 h-10 text-primary" />}
          </div>
          <h2 className="text-2xl font-bold mb-2">{verified ? "Email Verified!" : "Verify your email"}</h2>
          <p className="text-muted-foreground text-sm mb-6">
            {verified
              ? "Your account is ready. Welcome to MarketCompare!"
              : `We sent a verification email to ${user?.email ?? "your email"}. Click the link in the email to activate your account.`}
          </p>

          {!verified ? (
            <div className="space-y-3">
              <Button className="w-full" size="lg" onClick={() => setVerified(true)} data-testid="button-verify">
                <CheckCircle className="w-4 h-4 mr-2" /> Confirm Email Verified (Demo)
              </Button>
              <Button variant="outline" className="w-full gap-2" disabled={resent} onClick={() => setResent(true)} data-testid="button-resend">
                <RefreshCw className="w-4 h-4" /> {resent ? "Email sent!" : "Resend verification email"}
              </Button>
            </div>
          ) : (
            <Button className="w-full" size="lg" onClick={() => setLocation("/dashboard")} data-testid="button-go-dashboard">
              Go to Dashboard
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
