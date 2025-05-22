"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  startInactivityTimer,
  resetInactivityTimer,
} from "@/lib/inactivityHandler";

type AuthContextType = {
  user: string | null;
  loading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  remember: boolean;
  register: (
    fullName: string,
    email: string,
    password: string,
    remember: boolean
  ) => Promise<void>;
};

type StoredUser = {
  email: string;
  password: string;
  fullName: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <-- Add loading state
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const logout = useCallback(() => {
    setUser(null);
    setRemember(false);
    localStorage.removeItem("user");
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
      setRemember(true);
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberFlag: boolean
  ): Promise<void> => {
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as StoredUser[];
    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      throw new Error("Account does not exist.");
    }

    if (existingUser.password !== password) {
      throw new Error("Invalid email or password.");
    }

    setUser(email);
    setRemember(rememberFlag);

    if (rememberFlag) {
      localStorage.setItem("user", email);
    } else {
      localStorage.removeItem("user");
    }

    startInactivityTimer(logout, rememberFlag);
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    rememberFlag: boolean
  ): Promise<void> => {
    if (!fullName.trim()) throw new Error("Full name is required");
    if (!email.trim()) throw new Error("Email is required");
    if (password.length < 6)
      throw new Error("Password must be at least 6 characters long");

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as StoredUser[];
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) throw new Error("Email is already registered.");

    const newUser: StoredUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    await login(email, password, rememberFlag);
  };

  const resetTimer = useCallback(() => {
    resetInactivityTimer(logout, remember);
  }, [logout, remember]);

  useEffect(() => {
    if (!user) return;

    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    const reset = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, reset));
    return () => {
      events.forEach((event) => window.removeEventListener(event, reset));
    };
  }, [user, resetTimer]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, remember, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
