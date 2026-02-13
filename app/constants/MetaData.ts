import { Metadata } from "next";

/**
 * The Metadata for the layout, in a other file for readability
 */
export const layoutMetadata: Metadata = {
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
