import { DataProvider } from "@/hooks/useData";
import { cookies } from "next/headers";

async function getData() {
  const cookieStore = await cookies();
  const token       = cookieStore.get("token")?.value || null;

  // This fetch can be slow, and streaming will ensure the UI is not blocked.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getme`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Explicitly opt-out of caching. User data should be fresh.
    // This is the default behavior when using `cookies()`, but it's good to be explicit.
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch user data:", res.status, await res.text());
    // In case of error, provide a default/empty value to avoid crashing the app
    return { user: null, error: `Failed to fetch data. Status: ${res.status}` };
  }

  return res.json();
}

export default async function AdminShell({ children }: { children: React.ReactNode }) {
  const data = await getData();
  return <DataProvider data={data}>{children}</DataProvider>;
}
