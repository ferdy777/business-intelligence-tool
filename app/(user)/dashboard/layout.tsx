"use client";

import { ReactNode } from "react";
import DashboardHeader from "@/components/common/dashboard-header/index"; // renamed from Navbar
import Sidebar from "@/components/common/sidebar";
import useRequireAuth from "@/hooks/useRequireAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  useRequireAuth();

  return (
    <div className="flex min-h-screen bg-white text-black">
      <div className="w-64 fixed inset-y-0 left-0 z-30 bg-white shadow-md">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 ml-64">
        <DashboardHeader />
        <main className="p-6 md:p-10 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
