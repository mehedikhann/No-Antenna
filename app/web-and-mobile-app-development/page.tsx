import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://www.noantenna.com";
const path = "/web-and-mobile-app-development";

const title = "Web and Mobile App Development from $500 to $10,000 | No Antenna";
const description =
  "No Antenna builds web apps, mobile apps, and customer portals for businesses in Bangladesh and abroad. Projects typically range from $500 to $10,000 USD, with the same pricing for every client.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

const tiers = [
  {
    name: "Starter",
    min: 500,
    max: 3000,
    label: "$500 to $3,000 USD",
    text: "A small, focused web or mobile app with a few core features.",
  },
  {
    name: "Full product",
    min: 3001,
    max: 10000,
    label: "$3,001 to $10,000 USD",
    text: "A multi-feature product, web and mobile together, or an app with integrations.",
  },
];

const faqs: [string, string][] = [
  [
    "How much does web and mobile app development cost at No Antenna?",
    "Projects typically range from $500 to $10,000 USD. Starter projects, such as a small app with a few core features, run from $500 to $3,000. Full products, such as multi-feature apps, web and mobile together, or apps with integrations, run from $3,001 to $10,000. We give a proposal and commercial terms once the scope is understood.",
  ],
  [
    "Do international clients pay different rates?",
    "No. The same pricing applies to clients in Bangladesh and in other countries, and prices are quoted in US dollars.",
  ],
  [
    "What affects the price of an app?",
    "The number of features and screens, whether you need a web app, a mobile app, or both, integrations with other systems, design needs, and the timeline. Smaller scopes fall in the Starter tier ($500 to $3,000) and larger ones in the Full product tier ($3,001 to $10,000).",
  ],
  [
    "Do I need a complete specification before I ask for a quote?",
    "No. A clear business problem or product idea is enough to begin. We use the first discussion to understand the goal, the users, and the scope.",
  ],
  [
    "Which technologies do you use?",
    "For web we can consider React, Next.js, and TypeScript. For mobile we can consider Flutter, React Native, Swift, and Kotlin. The choice depends on the goals and scope of each project.",
  ],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}${path}#service`,
      name: "Web and mobile app development",
      serviceType: "Web and mobile app development",
      description,
      url: `${siteUrl}${path}`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Worldwide",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: 500,
        highPrice: 10000,
        offerCount: tiers.length,
        offers: tiers.map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          description: tier.text,
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: tier.min,
            maxPrice: tier.max,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    },
  ],
};

export default function WebAndMobileAppDevelopment() {
  return (
    <main className="legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container">
        <Link className="legal-back button-md" href="/">Back to No Antenna</Link>
        <p className="section-label caption-3">NO ANTENNA / WEB &amp; MOBILE APPS</p>
        <h1 className="heading-2">Web and mobile app development</h1>
        <p className="body-3">
          No Antenna builds web apps, mobile apps, and customer portals for businesses in Bangladesh and in
          international markets. Projects typically range from <strong>$500 to $10,000 USD</strong>, and the
          pricing is the same for every client.
        </p>

        <h2 className="heading-5">What it costs</h2>
        <p className="body-3">
          Most projects fall between $500 and $10,000 USD, in two tiers. Prices are quoted in US dollars, and
          clients in Bangladesh and abroad pay the same rates.
        </p>
        {tiers.map((tier) => (
          <div key={tier.name}>
            <h3 className="title-2">{tier.name}: {tier.label}</h3>
            <p className="body-3">{tier.text}</p>
          </div>
        ))}
        <p className="body-3">
          We give a proposal and commercial terms once we understand your scope, so the number you receive is
          based on your project and not on a generic price list.
        </p>

        <h2 className="heading-5">What affects the price</h2>
        <p className="body-3">
          The main factors are the number of features and screens, whether you need a web app, a mobile app, or
          both, integrations with other systems, design needs, and the timeline.
        </p>

        <h2 className="heading-5">What we build</h2>
        <p className="body-3">
          Connected experiences for customers, teams, and the work between them: web apps, mobile apps, and
          portals. For web work we can consider React, Next.js, and TypeScript. For mobile work we can consider
          Flutter, React Native, Swift, and Kotlin. The tools depend on the goals and scope of each project.
        </p>
        <p className="body-3">
          An example of our own product work is <a href="https://www.athlo.club/" rel="noopener">Athlo Club</a>,
          a sports platform for players and venues, made by No Antenna.
        </p>

        <h2 className="heading-5">Common questions</h2>
        {faqs.map(([question, answer]) => (
          <div key={question}>
            <h3 className="title-2">{question}</h3>
            <p className="body-3">{answer}</p>
          </div>
        ))}

        <h2 className="heading-5">Start with a discussion</h2>
        <p className="body-3">
          You do not need a full specification. Share a short description of what you want to build and a
          preferred time, and we will confirm by email. <Link href="/#discussion">Request a strategic discussion</Link>
          {" "}or write to <a href="mailto:contact@noantenna.com">contact@noantenna.com</a>.
        </p>
      </div>
    </main>
  );
}
