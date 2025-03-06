import type { Metadata } from "next";
import { Bebas_Neue, Figtree } from "next/font/google";
import "./globals.css";
import "./styles/reset.css";
import "./styles/main.css";
import MainNav from "@/components/MainNav";

const bebas_neue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas_neue",
  subsets: ["latin"],
});

const figtree = Figtree({
  weight: ["300", "400", "600", "900"],
  variable: "--font-figtree-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas_neue.variable} ${figtree.variable} antialiased`}
      >
        <MainNav title="Los4lamos" />
        {children}
      </body>
    </html>
  );
}
