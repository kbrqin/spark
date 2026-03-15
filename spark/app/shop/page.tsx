"use client";

import { useState } from "react";

export default function ShopPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8">shop</h1>

      <div className="w-[300px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">2x stars!</h2>

        <p className="text-gray-600 mb-4">
          double the stars you gain for each reward.
        </p>

        <p className="font-bold mb-4">$4.00 CAD</p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "redirecting..." : "buy"}
        </button>
      </div>
    </div>
  );
}