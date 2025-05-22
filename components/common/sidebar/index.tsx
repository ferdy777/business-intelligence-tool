"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";

// Add logout as a 'special' link
const links = [
  { href: "/dashboard", label: "Home", type: "link" },
  { label: "Log Out", type: "logout" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 py-6 px-2 h-full">
      <h2 className="text-lg font-bold mb-16 text-center">Menu</h2>

      <nav className="flex flex-col space-y-2 w-full">
        {links.map(({ href, label, type }) =>
          type === "logout" ? (
            <button
              key={label}
              onClick={handleLogout}
              className="w-full border border-gray-300 text-center p-2 rounded hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
            >
              {label}
            </button>
          ) : (
            <Link
              key={href}
              href={href!}
              className={`w-full border border-gray-300 text-center p-2 rounded transition-colors ${
                pathname === href
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
