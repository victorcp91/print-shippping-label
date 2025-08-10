"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  shipmentId: string;
}

export default function BuyOnceAndRefresh({ shipmentId }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const rateId = sp.get("rateId");
  const [status, setStatus] = useState<"idle" | "buying" | "done" | "error">(
    "idle"
  );

  useEffect(() => {
    if (!rateId || status !== "idle") return;

    setStatus("buying");
    fetch("/api/shipping/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shipmentId, rateId }),
      cache: "no-store",
    })
      .then(() => setStatus("done"))
      .catch(() => setStatus("error"))
      .finally(() => {
        router.replace(`/label/${shipmentId}`);
      });
  }, [rateId, router, shipmentId, status]);

  if (!rateId) {
    return (
      <div className="rounded bg-yellow-50 p-4 text-yellow-800">
        Select a rate to generate the label.
      </div>
    );
  }

  return (
    <div
      className="rounded bg-blue-50 p-4 text-blue-800"
      role="status"
      aria-live="polite"
    >
      {status === "buying" && "Generating label…"}
      {status === "done" && "Label generated. Refreshing…"}
      {status === "error" && "Failed to generate label. Please try again."}
    </div>
  );
}
