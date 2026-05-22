import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeDesign AI",
  description: "Turn any vibe into a beautiful website design system."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
