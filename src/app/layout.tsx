import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/navigation";

import "./globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { PlayListProvider } from "@/context/playlist-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClickView Practical",
  description: "ClickView frontend practical assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <Container>
          <Toaster position="top-right" />
          <PlayListProvider>{children}</PlayListProvider>
        </Container>
      </body>
    </html>
  );
}
