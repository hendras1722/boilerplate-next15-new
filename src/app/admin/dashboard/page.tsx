"use client";

import { useEffect, useState } from "react";
import BaseButton from "@/components/base/Button";
import BaseCard from "@/components/base/Card";
import { Icon } from "@iconify/react";
import { Template } from "use-react-utilities";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://auth.syahendra.com/v1/auth/login");

        if (!res.ok) {
          let errorMessage = `HTTP ${res.status}`;
          try {
            const errorData = await res.json();
            errorMessage += ` - ${JSON.stringify(errorData)}`;
          } catch {
            const text = await res.text();
            errorMessage += ` - ${text}`;
          }

          throw new Error(errorMessage);
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);

        fetch("/api/log-error", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            context: "Fetch JSONPlaceholder",
            error: err.message,
          }),
        });
      }
    };

    fetchData();
  }, []);

  return (
    <BaseCard>
      <Template name="header">Hello, Admin!</Template>

      <BaseButton className="text-white">
        <Template name="trailing">
          <Icon icon="lucide:banana" />
        </Template>
        Helloworld
      </BaseButton>

      <div className="mt-4">
        {error ? (
          <div className="text-red-500">❌ Error: {error}</div>
        ) : data ? (
          <div className="text-green-500">
            ✅ Success: {data.title || "No title"}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </BaseCard>
  );
}
