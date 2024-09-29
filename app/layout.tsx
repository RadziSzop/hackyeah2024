import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Toaster />
          <main className="min-h-screen bg-gray-100 flex flex-col items-center">
            <Navbar />
            <div className="h-[calc(100vh-72px)] mt-auto w-full">
              <Providers>{children}</Providers>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
