import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import {Toaster} from "sonner"
import { ConvexWithClerkClientProvider } from "@/components/providers/ConvexProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SynapseAI",
  description: "A cutting-edge AI-powered application for information retrieval and contextual analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ConvexWithClerkClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
          >
            {children}
            <Toaster position={"bottom-right"} />

          </ThemeProvider>
        </ConvexWithClerkClientProvider>
      </body>
    </html>
  );
}
