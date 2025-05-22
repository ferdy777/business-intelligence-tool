"use client";

import { useAuthContext } from "@/context/auth-context";

export default function DashboardHeader() {
  const { user } = useAuthContext();

  return (
    <header className="bg-white px-6 py-6 flex justify-center text-gray-700 items-center ">
      <h1 className="text-lg font-bold text-center">
        Dashboard{user ? ` — Welcome, ${user}` : ""}
      </h1>
    </header>
  );
}
