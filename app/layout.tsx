import type { Metadata } from "next";
import "./globals.css";
import WhatsAppWidget from "./whatsapp-widget";

const siteUrl = "https://www.noantenna.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "No Antenna",
      url: siteUrl,
      logo: `${siteUrl}/no-antenna-mark.png`,
      description: "No Antenna develops custom software, SaaS products, premium websites, web and mobile apps, games, and animated content for businesses in Bangladesh and beyond.",
      email: "contact@noantenna.com",
      sameAs: [
        "https://www.linkedin.com/company/noantenna/",
        "https://web.facebook.com/noantenna1/",
        "https://www.instagram.com/no.antenna",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "No Antenna",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  title: "No Antenna | Custom Software, SaaS, Websites and Apps",
  description: "No Antenna develops custom software, SaaS products, premium websites, web and mobile apps, games, and animated content for businesses in Bangladesh and beyond.",
  openGraph: {
    siteName: "No Antenna",
    locale: "en",
    title: "No Antenna | Software built for what comes next",
    description: "Custom software, SaaS, premium websites, web and mobile applications, game development, and animated content.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "No Antenna | Custom Software, SaaS, Websites and Apps",
    description: "Custom software, SaaS, premium websites, web and mobile applications, game development, and animated content.",
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
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        {children}<WhatsAppWidget />
      </body>
    </html>
  );
}
