"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { DATA_MANAGEMENT_MENU } from "@/const/menu";
import React, { useState, useCallback } from "react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const handleNotifications = useCallback(() => {
    console.log("Notifications clicked");
  }, []);

  const handleProfile = useCallback(() => {
    console.log("Profile clicked");
  }, []);

  const handleSettings = useCallback(() => {
    console.log("Settings clicked");
  }, []);

  const handleSupport = useCallback(() => {
    console.log("Support clicked");
  }, []);

  const handleLogout = useCallback(() => {
    console.log("Logout clicked");
  }, []);

  return (
    <div className="flex h-screen overflow-hidden w-full bg-background text-foreground">
      {!sidebarCollapsed && (
        <Button
          variant={"ghost"}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={handleToggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onClose={handleToggleSidebar}
        logoLabel="MSA Template"
        items={DATA_MANAGEMENT_MENU}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <AppHeader
          onMenuClick={handleToggleSidebar}
          avatarSrc="https://i.pravatar.cc/100?u=admin"
          avatarFallback="AU"
          userName="Admin User"
          onNotifications={handleNotifications}
          onProfile={handleProfile}
          onSettings={handleSettings}
          onSupport={handleSupport}
          onLogout={handleLogout}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Ini adalah konten halaman dashboard</p>
      </div>
    </DashboardLayout>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
