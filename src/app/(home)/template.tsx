"use client";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="flex h-screen overflow-hidden">{children}</div>;
}
