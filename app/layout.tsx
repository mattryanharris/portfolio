import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Matt Harris — software & design",
  description: "Software, design, and the occasional Apple TV app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-[color:var(--border)]">
          <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-mono text-sm tracking-tight hover:text-[color:var(--accent)] transition-colors"
            >
              Matt Harris
            </Link>
            <div className="flex items-center gap-6 font-mono text-sm">
              <Link
                href="/"
                className="hover:text-[color:var(--accent)] transition-colors"
              >
                Work
              </Link>
              <a
                href="mailto:matthew@biofare.org"
                className="hover:text-[color:var(--accent)] transition-colors"
              >
                Contact
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[color:var(--border)] mt-24">
          <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between font-mono text-xs text-[color:var(--muted)]">
            <span>© {new Date().getFullYear()} Matt Harris</span>
            <span>Built in Next.js · Deployed on Vercel</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
