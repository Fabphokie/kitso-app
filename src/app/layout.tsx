import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitso",
  description: "A comprehensive app about the journey from girlhood into womanhood.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title ?? 'Default Title'}</title> {/* Added fallback */}
        <meta name="description" content={metadata.description ?? 'Default description'} /> {/* Added fallback */}
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-creamWhite`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
