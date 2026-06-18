"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Package, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CustomerLayout from "@/layouts/CustomerLayout";
import OrderTimeline from "@/components/OrderTimeline";
import { orders, products, formatPrice, getVendorById } from "@/data/mockData";

export default function OrderDetail() {
  const params = useParams();
  const id = params?.id as string;
  const order = orders.find(o => o.id === id) ?? orders[0];
  const product = products.find(p => p.id === order?.productId);
  const vendor = getVendorById(order?.vendorId ?? "");

  if (!order || !product) {
    return (
      <CustomerLayout>
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p>Order not found</p>
          <Link href="/dashboard/orders"><Button className="mt-3">View All Orders</Button></Link>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/orders">
            <Button variant="ghost" size="sm" className="gap-1.5"><ArrowLeft className="w-4 h-4" /> Orders</Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Order #{order.id}</h1>
            <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Product */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold mb-4">Product Ordered</h3>
              <div className="flex gap-4">
                <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {order.quantity}</p>
                  <p className="text-sm text-muted-foreground">Vendor: {vendor?.name}</p>
                  <p className="text-lg font-bold text-primary mt-2">{formatPrice(order.total)}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold mb-5">Order Status</h3>
              <OrderTimeline status={order.status} />
            </div>

            {/* Delivery info */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold mb-4">Delivery Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Shipping Address</p>
                    <p className="text-muted-foreground">123 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-muted-foreground">+234 800 000 0000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div>
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Order Status</p>
                <Badge className="capitalize text-sm px-3 py-1">{order.status.replace(/-/g, " ")}</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Sold By</p>
                <div className="flex items-center gap-2">
                  <img src={vendor?.logo} alt="" className="w-8 h-8 rounded-lg" />
                  <p className="font-medium text-sm">{vendor?.name}</p>
                </div>
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(order.total)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-green-600">FREE</span></div>
                <div className="flex justify-between font-bold pt-1"><span>Total</span><span className="text-primary">{formatPrice(order.total)}</span></div>
              </div>
              {order.status !== "cancelled" && order.status !== "delivered" && (
                <Button variant="outline" size="sm" className="w-full text-destructive border-destructive/30 hover:bg-destructive/5" data-testid="btn-cancel-order">
                  Cancel Order
                </Button>
              )}
              {order.status === "delivered" && (
                <Link href={`/dashboard/product/${product.id}`}>
                  <Button size="sm" className="w-full" data-testid="btn-reorder">Buy Again</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
