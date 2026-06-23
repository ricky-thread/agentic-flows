import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magic Flows – Thread",
  description: "Automation flows for your service desk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
