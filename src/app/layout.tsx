import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Penguin Database",
  description: "A beautiful collection of penguin dolls",
};

import { WalkingPenguinsOverlay } from "@/components/ui/WalkingPenguins";
import { getPenguins } from "@/lib/data";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const penguins = await getPenguins();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen pb-16`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <WalkingPenguinsOverlay penguins={penguins} />
        <Footer />
      </body>
    </html>
  );
}
