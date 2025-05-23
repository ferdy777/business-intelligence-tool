import type { Metadata } from "next";
import "./globals.css";
import RootLayoutInner from "@/layouts/root";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <RootLayoutInner>{children}</RootLayoutInner>
      </body>
    </html>
  );
}
