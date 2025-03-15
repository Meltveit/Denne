// app/subscription/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<"plus" | "premium" | null>(null);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "3months" | "6months">("monthly");

  const getDiscountedPrice = (basePrice: number) => {
    switch (billingInterval) {
      case "3months":
        return Math.round(basePrice * 0.95);
      case "6months":
        return Math.round(basePrice * 0.9);
      default:
        return basePrice;
    }
  };

  const getTotalPrice = (basePrice: number) => {
    const discountedPrice = getDiscountedPrice(basePrice);
    switch (billingInterval) {
      case "3months":
        return discountedPrice * 3;
      case "6months":
        return discountedPrice * 6;
      default:
        return discountedPrice;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Velg Abonnementsplan</h1>

        <div className="mb-8 flex justify-center">
          <select
            value={billingInterval}
            onChange={(e) => setBillingInterval(e.target.value as "monthly" | "3months" | "6months")}
            className="p-2 border rounded-lg"
          >
            <option value="monthly">Månedlig</option>
            <option value="3months">Hver 3. måned (5% rabatt)</option>
            <option value="6months">Hver 6. måned (10% rabatt)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`p-6 bg-white rounded-lg shadow-md ${
              selectedPlan === "plus" ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setSelectedPlan("plus")}
          >
            <h2 className="text-2xl font-bold mb-2">Plus Plan</h2>
            <p className="text-xl">{getDiscountedPrice(299)} NOK/mnd</p>
            <p className="text-sm text-gray-600">
              Total: {getTotalPrice(299)} NOK for{" "}
              {billingInterval === "3months" ? "3 måneder" : billingInterval === "6months" ? "6 måneder" : "1 måned"}
            </p>
            <ul className="mt-4 space-y-2">
              <li>Økt synlighet i søkeresultater</li>
              <li>Prioritert rangering</li>
            </ul>
          </div>

          <div
            className={`p-6 bg-white rounded-lg shadow-md ${
              selectedPlan === "premium" ? "border-2 border-purple-500" : ""
            }`}
            onClick={() => setSelectedPlan("premium")}
          >
            <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>
            <p className="text-xl">{getDiscountedPrice(499)} NOK/mnd</p>
            <p className="text-sm text-gray-600">
              Total: {getTotalPrice(499)} NOK for{" "}
              {billingInterval === "3months" ? "3 måneder" : billingInterval === "6months" ? "6 måneder" : "1 måned"}
            </p>
            <ul className="mt-4 space-y-2">
              <li>Økt synlighet i søkeresultater</li>
              <li>Høyest prioritert rangering</li>
              <li>AI-genererte nyhetsbrev</li>
            </ul>
          </div>
        </div>

        <button
          disabled={!selectedPlan}
          className={`w-full mt-6 p-3 rounded-lg ${
            selectedPlan ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
          }`}
        >
          Gå til Betaling
        </button>
      </div>
    </div>
  );
}