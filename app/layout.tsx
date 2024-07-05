import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarApp from '@/components/NavbarApp'
import SessionProviderClientComponent from '../components/AuthProvider'
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INC. Tracker",
  description: "INC. - Tracker",
  icons: "icon"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" className={"bg-ghost-white " + inter.className}>
      <body className="bg-ghost-white min-h-80">
        <SessionProviderClientComponent session={session}>
          <div className="max-w-5xl mx-auto p-2">
            <NavbarApp />
            <div className="mt-4 max-w-*">{children}</div>
          </div>
        </SessionProviderClientComponent>
      </body>
    </html >
  );
}
