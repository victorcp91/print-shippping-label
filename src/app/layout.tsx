import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/Header";
import BreadcrumbNavigation from "@/components/organisms/BreadcrumbNavigation";
import Footer from "@/components/organisms/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Print a USPS Shipping Label",
  description:
    "Minimal web application prototype built with Next.js, React, and TypeScript that integrates with the EasyPost API to generate and print USPS shipping labels. Includes a step-by-step flow for entering shipment details, selecting USPS rates, and previewing labels for printing.",
};

const breadcrumbSteps = [
  { id: 1, label: "Shipment Details", mobileLabel: "Details" },
  { id: 2, label: "Select Rate", mobileLabel: "Rate" },
  { id: 3, label: "Print Label", mobileLabel: "Print" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-secondary`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <BreadcrumbNavigation steps={breadcrumbSteps} currentStep={1} />
          <main className="flex-1">
            <div className="max-w-[62rem] mx-auto px-4 py-8">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
