import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "No Antenna | Custom Software, SaaS, Web and Mobile Apps",
  description: "No Antenna develops custom software, SaaS products, and web and mobile applications for businesses in Bangladesh and beyond.",
  openGraph: {
    title: "No Antenna | Software built for what comes next",
    description: "Custom software, SaaS product development, and web and mobile applications.",
    type: "website",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
