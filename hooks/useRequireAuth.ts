// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "@/context/auth-context";

// export default function useRequireAuth() {
//   const { user } = useAuthContext();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.replace("/login");
//     }
//   }, [user, router]);

//   return user;
// }

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";

export default function useRequireAuth() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return user;
}
