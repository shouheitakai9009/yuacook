import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/libs/utils";
import { QueryClientProvider } from "@/providers/QueryClientProvider";
import { ToastProvider } from "@/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "yuacook",
  description: "優愛のための料理レシピ管理アプリです。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn(inter.className, "bg-gray-50 dark:bg-slate-700")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <ToastProvider>{children}</ToastProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
