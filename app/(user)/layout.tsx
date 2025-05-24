import { ReactNode } from "react";
import UserLayout from "@/layouts/user";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <UserLayout>{children}</UserLayout>;
}
