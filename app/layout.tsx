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

const categories = ["FavoritedTV", "Tidy", "Favorited Games"];

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
        {/* Left sidebar: brand top, category list, copyright bottom. */}
        <aside className="fixed left-0 top-0 z-10 flex h-screen w-[200px] flex-col justify-between px-8 py-10">
          <div>
            <Link href="/" className="block font-sans text-[15px] font-semibold">
              Matt Harris
            </Link>
            <a
              href="mailto:matthew@biofare.org"
              className="mt-2 block text-[color:var(--muted)] hover:text-[color:var(--accent)]"
            >
              Contact
            </a>

            <ul className="mt-16 space-y-1">
              {categories.map((c) => (
                <li key={c} className="text-[color:var(--muted)]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-[color:var(--muted)]">
            © {new Date().getFullYear()}
          </div>
        </aside>

        {/* Main content: shifted to the right of the sidebar. */}
        <main className="ml-[200px] min-h-screen">{children}</main>

        {/* Intercepted-route modal slot. */}
        {modal}
      </body>
    </html>
  );
}
