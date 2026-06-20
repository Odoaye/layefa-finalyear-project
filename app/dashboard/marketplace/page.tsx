import { Suspense } from "react";
import Marketplace from "@/page-components/customer/Marketplace";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading marketplace...</div>}>
      <Marketplace />
    </Suspense>
  );
}
