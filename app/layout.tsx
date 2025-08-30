import type { Metadata, Viewport } from "next";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";

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
        <body className="relative w-full min-h-screen p-0 m-0">
          <div className="grid grid-cols-12">{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}  
