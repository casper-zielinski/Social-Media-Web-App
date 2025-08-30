import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import StoreProvider from "@/redux/StoreProvider";

// const inter = Inter({ subsets: ["latin"], });   ==> Font Style for Body
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ChatAI",
  description: "A Social Media App to check posts with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="relative w-full overflow-x-hidden min-h-screen p-0 m-0">
          <div className="grid grid-cols-12">{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}  
