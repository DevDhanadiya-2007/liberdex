import type { Metadata } from "next";
import "@web/styles/globals.css";
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
  title: "Liberdex",
  description: "Web 3 wallet manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
