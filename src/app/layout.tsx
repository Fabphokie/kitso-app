import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitso",  // Ensure this is a string
  description: "A comprehensive app about the journey from girlhood into womanhood.", // Ensure this is a string
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{typeof metadata.title === 'string' ? metadata.title : 'Default Title'}</title> {/* Added type check */}
        <meta name="description" content={typeof metadata.description === 'string' ? metadata.description : 'Default description'} /> {/* Added type check */}
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-creamWhite`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
