"use client";

import { useState } from "react";
import { sendTestNotification } from "@/actions/notification/sendTestNotification";


type TestPushResult = {
  success: boolean;
  error?: string;
};

export default function TestPushButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestPushResult | null>(null);

  const handleClick = async () => {
    setLoading(true);
    const res = await sendTestNotification();
    setResult(res);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Sending..." : "Send Test Notification"}
      </button>

      {result && (
        <pre style={{ marginTop: 12 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}