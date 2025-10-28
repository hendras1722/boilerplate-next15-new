"use client";

import dynamic from "next/dynamic";
import LoadingPage from "./LoadingPage";

const View = dynamic(() => import("./FetchPage"), {
  loading: () => <LoadingPage />,
  ssr: false,
});

export default function ViewPage() {
  return <View />;
}
