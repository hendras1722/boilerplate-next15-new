'use client'

import dynamic from "next/dynamic";
import LoadingPage from "./loadingPage";

const LoginPage = dynamic(() => import("./LoginPage"), {
  loading: () => <LoadingPage />,
  ssr: false,
});

export default function ViewPage() {
  return <LoginPage />;
}
