import type { Metadata, Viewport } from "next";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import RightAside from "./components/layout/RightAside";
import Footer from "./components/layout/Footer";
import PopUpModals from "./components/PopUpModals/PopUpModals";
import { ThemeProvider } from "next-themes";
import AuthProvider from "./components/providers/AuthProvider";
import ToasterProvider from "./components/providers/Toaster";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ChatAI",
    template: "%s | ChatAI",
  },
  description:
    "ChatAI is a Social Media App, with everything from posting to chatting in one app to AI Integration and much more",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL ||
      "https://social-media-web-app-weld.vercel.app",
  ),
  robots: { follow: true, index: true },
  openGraph: {
    title: "ChatAI - Social Media with AI Integration",
    description:
      "ChatAI is a Social Media App, with everything from posting to chatting in one app to AI Integration and much more",
    siteName: "ChatAI",
    url: "./",
    images: [
      {
        width: 1200,
        height: 630,
        url: `${process.env.NEXT_PUBLIC_URL}/opengraph-image.png`,
        alt: "ChatAI App Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
    title: "ChatAI",
    description:
      "ChatAI is a Social Media App, with everything from posting to chatting in one app to AI Integration and much more",
    creator: "@Jamal9459618031",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 min-w-[320px] min-h-full p-0 m-0 overflow-hidden">
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <AuthProvider>
              <div className="grid grid-cols-12 w-full min-h-screen">
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
              <ToasterProvider />
            </AuthProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
