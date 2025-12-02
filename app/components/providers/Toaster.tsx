"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // Default options
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          duration: 1500,
          iconTheme: {
            primary: "#4ade80",
            secondary: "#fff",
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
        custom: {
          duration: 2000,
          iconTheme: {
            primary: "#191316",
            secondary: "#FFFFFF",
          },
          
        },
      }}
    />
  );
}
