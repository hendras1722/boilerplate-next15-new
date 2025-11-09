import type { Metadata } from "next";
import ViewPage from "./_templates/view";

export const metadata: Metadata = {
  title: "fetch data",
};

export default function Page() {
  return <ViewPage />;
}
