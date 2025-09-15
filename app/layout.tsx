import type { Metadata, Viewport } from "next";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import RightAside from "./components/layout/RightAside";
import Footer from "./components/layout/Footer";
import PopUpModals from "./components/PopUpModals/PopUpModals";

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
        <body className=" bg-gray-950 min-w-[320px] min-h-full p-0 m-0 overflow-x-hidden">
          <div className="grid grid-cols-12 w-full min-h-screen max-h-[900px]">
            {/* Modals for Login & Posting */}
            <PopUpModals />
            {/* 
            Right Side Bar with Buttons for Navigation like Home, Search, AI-Tools etc. 
            both visible on Mobile and on Desktop, but without Text on Mobile (only Button Icons)
            */}
            <RightAside />
            {children}
            {/* The Footer Interface for Smart Phones or, if User not Logged In, Shows Login or Sign Up Prop*/}
            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
