"use client";

import { Icon } from "@iconify/react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  from-slate-900 to-slate-700">
      <Icon icon="lucide:loader-circle" className="w-4 h-4 animate-spin mr-5" />
      <p className="text-gray-300 text-sm font-medium tracking-wide">Loading...</p>
    </div>
  );
}
