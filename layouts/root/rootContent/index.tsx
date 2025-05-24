"use client";

import useMsw from "@/hooks/useMsw";
import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/info.css";

// specify the theme in toastConfig
toastConfig({
  theme: "dark",
  duration: 5000,
});

interface Props {
  children?: ReactNode;
}

const RootContent = ({ children }: Props) => {
  const { mswReady } = useMsw();

  if (!mswReady) return <></>;

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default RootContent;
