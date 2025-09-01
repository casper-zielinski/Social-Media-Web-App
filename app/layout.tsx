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
        <body className=" bg-gray-950 min-w-[320px] min-h-full p-0 m-0">
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
