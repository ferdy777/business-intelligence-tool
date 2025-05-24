"use client";

import { useAuthContext } from "@/context/auth-context";
import { Path } from "@/navigations/routes";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Aside from "./aside";
import Main from "./main";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let id: any;
    if (!isAuthenticated) {
      id = setTimeout(() => {
        router.replace(Path.Login);
      }, 500);
    }

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleAsideOpen = () => setIsOpen(true);
  const handleAsideClose = () => setIsOpen(false);

  return (
    <>
      <>
        {isAuthenticated && (
          <div>
            <Aside isOpen={isOpen} handleAsideClose={handleAsideClose} />
            <Main handleAsideOpen={handleAsideOpen}>{children}</Main>
          </div>
        )}
      </>
    </>
  );
};

export default UserLayout;
