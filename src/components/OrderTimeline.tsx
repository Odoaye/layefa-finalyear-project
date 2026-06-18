"use client";

import { CheckCircle, Clock, Package, Truck, Home } from "lucide-react";

type OrderStatus = 'placed' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';

const steps = [
  { key: 'placed', label: 'Order Placed', icon: CheckCircle, desc: 'Your order has been received' },
  { key: 'processing', label: 'Processing', icon: Clock, desc: 'Vendor is preparing your order' },
  { key: 'shipped', label: 'Shipped', icon: Package, desc: 'Order is on its way' },
  { key: 'out-for-delivery', label: 'Out for Delivery', icon: Truck, desc: 'Delivery agent is on route' },
  { key: 'delivered', label: 'Delivered', icon: Home, desc: 'Order successfully delivered' },
];

const statusIndex: Record<string, number> = {
  placed: 0, processing: 1, shipped: 2, 'out-for-delivery': 3, delivered: 4, cancelled: -1
};

interface OrderTimelineProps {
  status: OrderStatus;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = statusIndex[status] ?? 0;

  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
        <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
          <span className="text-destructive text-lg font-bold">!</span>
        </div>
        <div>
          <p className="font-semibold text-destructive">Order Cancelled</p>
          <p className="text-sm text-muted-foreground">This order has been cancelled and refund is being processed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" data-testid="order-timeline">
      {/* Connecting line */}
      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
      <div
        className="absolute left-5 top-5 w-0.5 bg-primary transition-all duration-700"
        style={{ height: `${(currentIndex / (steps.length - 1)) * 100}%` }}
      />

      <div className="space-y-6 relative">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isDone = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={step.key} className="flex items-center gap-4" data-testid={`timeline-step-${step.key}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300
                ${isDone ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border-2 border-border"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={`font-medium text-sm ${isDone ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                  {isCurrent && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Current</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
