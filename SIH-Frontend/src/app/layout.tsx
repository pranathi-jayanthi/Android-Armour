"use client";

import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { NavigationProvider } from "@/components/Providers/NavigationProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavigationProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <SessionProvider>
            <SidebarProvider>
              {children}</SidebarProvider>
          </SessionProvider>
        </body>
      </html>
    </NavigationProvider>
  );
}
