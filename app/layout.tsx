import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matt Harris — Product, design, engineering",
  description:
    "Former NASA engineer, now product at favorited. ex-Apple, Disney, Rebud, NAVSEA.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f2f2f2] font-mono text-[13px]">
        <Suspense fallback={null}>
          <Sidebar />
        </Suspense>
        <main className="ml-[220px] min-h-screen">{children}</main>
        {modal}
      </body>
    </html>
  );
}
