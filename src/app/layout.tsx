import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jessica's Penguins",
  description: "A personal collection of adorable penguin dolls",
};

import { WalkingPenguinsOverlay } from "@/components/ui/WalkingPenguins";
import { getPenguins } from "@/lib/data";

import { SettingsProvider } from "@/context/SettingsContext";

import { ThemeProvider } from "@/components/theme/theme-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const penguins = await getPenguins();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <Navbar />
            <main className="min-h-screen pt-20 pb-20">
              {children}
            </main>
            <WalkingPenguinsOverlay penguins={penguins} />
            <Footer />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
