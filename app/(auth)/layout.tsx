import AuthLayout from "@/layouts/auth";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
