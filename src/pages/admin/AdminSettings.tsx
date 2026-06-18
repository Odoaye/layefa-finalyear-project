"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Settings, Globe, Bell, Shield, CreditCard, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/layouts/AdminLayout";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();

  const save = () => toast({ title: "Settings saved!", description: "Platform settings have been updated." });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-bold">System Settings</h1>

        {[
          {
            title: "Platform Settings", icon: Globe, fields: [
              { label: "Platform Name", value: "MarketCompare" },
              { label: "Support Email", value: "support@marketcompare.ng" },
              { label: "Contact Phone", value: "+234 800 MARKET" },
            ]
          },
          {
            title: "Payment Settings", icon: CreditCard, fields: [
              { label: "Commission Rate (%)", value: "2.5" },
              { label: "Min Withdrawal (₦)", value: "5000" },
              { label: "Payout Schedule", value: "Weekly (Fridays)" },
            ]
          },
        ].map((section, si) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }}
            className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <section.icon className="w-5 h-5 text-primary" />
              <h3 className="font-bold">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.fields.map(field => (
                <div key={field.label} className="grid grid-cols-2 gap-4 items-center">
                  <Label className="text-sm font-medium">{field.label}</Label>
                  <Input data-testid={`input-${field.label.toLowerCase().replace(/\s+/g, "-")}`} defaultValue={field.value} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Toggle settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-bold">Notification & Feature Flags</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Email notifications for new orders", defaultChecked: true },
              { label: "Allow vendor self-registration", defaultChecked: true },
              { label: "Price comparison feature enabled", defaultChecked: true },
              { label: "Budget assistant feature enabled", defaultChecked: true },
              { label: "Customer reviews enabled", defaultChecked: true },
              { label: "Vendor analytics enabled", defaultChecked: true },
            ].map(toggle => (
              <div key={toggle.label} className="flex items-center justify-between py-1">
                <Label className="text-sm cursor-pointer">{toggle.label}</Label>
                <Switch defaultChecked={toggle.defaultChecked} data-testid={`toggle-${toggle.label.toLowerCase().replace(/\s+/g, "-")}`} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-bold">Security</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Two-factor authentication for admins", defaultChecked: true },
              { label: "Rate limiting on API endpoints", defaultChecked: true },
              { label: "Automatic fraud detection", defaultChecked: false },
            ].map(toggle => (
              <div key={toggle.label} className="flex items-center justify-between py-1">
                <Label className="text-sm cursor-pointer">{toggle.label}</Label>
                <Switch defaultChecked={toggle.defaultChecked} data-testid={`toggle-${toggle.label.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`} />
              </div>
            ))}
          </div>
        </motion.div>

        <Button data-testid="btn-save-settings" size="lg" className="gap-2" onClick={save}>
          <Save className="w-4 h-4" /> Save All Settings
        </Button>
      </div>
    </AdminLayout>
  );
}
