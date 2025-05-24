"use client";

import {
  ACTIVITY_KEY,
  AUTO_LOGOUT_KEY,
  TIMEOUT_DURATION,
  USER_STORAGE_KEY,
} from "@/constants";
import useToast from "@/hooks/useToast";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface IUser {
  name: string;
  email: string;
}

type AuthContextType = {
  user: IUser | undefined;
  isAuthenticated: boolean;
  handleLoginSuccess: (data: IUser) => void;
  handleLogout: () => void;
  handleSetAutoLogout: () => void;
  isAutoLogoutActive: boolean;
  timeLeft: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAutoLogoutActive, setIsAutoLogoutActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const { handleInfoToast, handleSuccessToast } = useToast();

  useEffect(() => {
    handleCheckUserInStorage();
    handleCheckAutoLogoutInStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Activity event listeners
  useEffect(() => {
    if (!isAuthenticated || !isAutoLogoutActive) return;

    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    const throttledUpdateActivity = (() => {
      let timeout: NodeJS.Timeout | undefined | null;
      return () => {
        if (timeout) return;
        timeout = setTimeout(() => {
          const now = Date.now();
          setLastActivity(now);
          setTimeLeft(60);
          localStorage.setItem(ACTIVITY_KEY, now.toString());
          timeout = null;
        }, 1000); // Throttle to once per second
      };
    })();

    // Add event listeners
    activityEvents.forEach((event) => {
      document.addEventListener(event, throttledUpdateActivity, true);
    });

    // Cleanup
    return () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, throttledUpdateActivity, true);
      });
    };
  }, [isAuthenticated, isAutoLogoutActive]);

  // Timer countdown
  useEffect(() => {
    if (!isAuthenticated || !isAutoLogoutActive) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      const remaining = Math.ceil(
        (TIMEOUT_DURATION - timeSinceActivity) / 1000
      );

      if (remaining <= 0) {
        handleLogout();

        handleInfoToast("Session timeout. Kindly login.");
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAutoLogoutActive, lastActivity]);

  const handleCheckUserInStorage = () => {
    try {
      const userInStorage = localStorage.getItem(USER_STORAGE_KEY);
      if (!userInStorage) return;

      const parsedUser = JSON.parse(userInStorage) as IUser;
      setUser(parsedUser);
      setIsAuthenticated(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  const handleLoginSuccess = (data: IUser) => {
    const stringifiedUser = JSON.stringify(data);
    localStorage.setItem(USER_STORAGE_KEY, stringifiedUser);

    setIsAuthenticated(true);
    setUser(data);
  };

  const handleCheckAutoLogoutInStorage = () => {
    try {
      const autoLogoutSession = localStorage.getItem(AUTO_LOGOUT_KEY);
      const savedActivity = localStorage.getItem(ACTIVITY_KEY);

      if (autoLogoutSession === "active" && savedActivity) {
        const timeSinceActivity = Date.now() - parseInt(savedActivity);

        if (timeSinceActivity < TIMEOUT_DURATION) {
          setIsAuthenticated(true);
          setIsAutoLogoutActive(true);
          setLastActivity(parseInt(savedActivity));
          setTimeLeft(Math.ceil((TIMEOUT_DURATION - timeSinceActivity) / 1000));
        } else {
          // Session expired
          handleLogout();
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  const handleSetAutoLogout = () => {
    const now = Date.now();

    localStorage.setItem(ACTIVITY_KEY, now.toString());
    localStorage.setItem(AUTO_LOGOUT_KEY, "active");
    setIsAutoLogoutActive(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(AUTO_LOGOUT_KEY);
    localStorage.removeItem(ACTIVITY_KEY);

    handleSuccessToast("Logout Successful");

    setUser(undefined);
    setIsAuthenticated(false);
    setIsAutoLogoutActive(false);
    setTimeLeft(60);
    setLastActivity(Date.now());
  };

  const value: AuthContextType = {
    handleLoginSuccess,
    handleLogout,
    isAuthenticated,
    user,
    handleSetAutoLogout,
    isAutoLogoutActive,
    timeLeft,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
