import { AuthProvider } from "@/context/auth-context";
import React, { ReactNode } from "react";
import RootContent from "./rootContent";

interface Props {
  children?: ReactNode;
}

const RootLayoutInner = ({ children }: Props) => {
  return (
    <RootContent>
      <AuthProvider>{children}</AuthProvider>
    </RootContent>
  );
};

export default RootLayoutInner;
