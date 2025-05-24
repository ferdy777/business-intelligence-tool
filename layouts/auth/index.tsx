"use client";

import { useAuthContext } from "@/context/auth-context";
import { Path } from "@/navigations/routes";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const [showContent, setShowContent] = useState(false);

  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let id: any;
    if (isAuthenticated) {
      id = setTimeout(() => {
        if (!isAuthenticated) {
          setShowContent(true);
          return;
        }
        router.replace(Path.Dashboard);
      }, 500);
    } else {
      id = setTimeout(() => {
        setShowContent(true);
      }, 500);
    }

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{showContent && <div>{children}</div>}</>;
};

export default AuthLayout;
