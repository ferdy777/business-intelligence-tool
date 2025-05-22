"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";

export default function HomePage() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard"); // If already logged in, go to dashboard
    } else {
      router.replace("/register"); // If not logged in, assume new user and go to register
    }
  }, [user, router]);

  return null; // No visible content on root route
}
