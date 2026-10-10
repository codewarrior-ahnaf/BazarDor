import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর | নিত্যপণ্যের নির্ভরযোগ্য বাজারদর",
  description: "নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের বাজার দর জানুন সহজে। বাজার অবস্থার ওপর নির্ভর করে সকল সম্ভাব্য দর এক নজরে।",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#f7faf7] text-gray-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#ffffff",
              color: "#1e293b",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              fontFamily: "inherit",
              fontSize: "0.925rem",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
