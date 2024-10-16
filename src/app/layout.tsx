import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitso",  // Remove the type assertion
  description: "A comprehensive app about the journey from girlhood into womanhood.", // Remove the type assertion
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>  {/* No fallback needed */}
        <meta name="description" content={metadata.description} />  {/* No fallback needed */}
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-creamWhite`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
