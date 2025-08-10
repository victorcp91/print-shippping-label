"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/organisms/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-secondary min-h-screen flex flex-col`}
      >
        <Header />

        <main className="flex-1">
          <div className="max-w-[62rem] mx-auto px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-red-700">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium">Application error</span>
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight">
                Oops! Something went wrong.
              </h1>
              <p className="mt-2 text-balance text-gray-600">
                There was a problem loading this page.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <Link
                  href="/"
                  onClick={() =>
                    typeof reset === "function"
                      ? reset()
                      : window.location.assign("/")
                  }
                  className="rounded-md border border-gray-300 px-6 py-3 text-text-primary transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                >
                  Go to home
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-[62rem] mx-auto px-4">
            <div className="text-center text-sm text-gray-500">
              <p>2025 PrintLabel</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
