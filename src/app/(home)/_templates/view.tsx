"use client";

import dynamic from "next/dynamic";
import LoadingPage from "../_components/Loading";

const HomePage = dynamic(() => import("./HomePage"), {
  loading: () => <LoadingPage />,
  ssr: false,
});

export default function ViewPage() {
  return <HomePage />;
}
