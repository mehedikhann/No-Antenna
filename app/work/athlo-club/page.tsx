import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://www.noantenna.com";
const path = "/work/athlo-club";

const title = "Athlo Club: a community sports platform in Dhaka | No Antenna";
const description =
  "Athlo Club is a sports platform made by No Antenna. Players in Dhaka find games, host matches, join groups, book venues, and follow community leaderboards.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "article" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}${path}#webpage`,
  url: `${siteUrl}${path}`,
  name: title,
  description,
  about: { "@type": "WebSite", name: "Athlo Club", url: "https://www.athlo.club/" },
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function AthloClubCaseStudy() {
  return (
    <main className="legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container">
        <Link className="legal-back button-md" href="/">Back to No Antenna</Link>
        <p className="section-label caption-3">NO ANTENNA / WORK</p>
        <h1 className="heading-2">Athlo Club: a community sports platform in Dhaka</h1>
        <p className="body-3">
          Athlo Club is a sports platform made by No Antenna. It helps players in Dhaka find people to play with,
          host their own games, and book venues. You can see it live at{" "}
          <a href="https://www.athlo.club/" rel="noopener">athlo.club</a>.
        </p>

        <h2 className="heading-5">The problem</h2>
        <p className="body-3">
          Athlo Club describes its starting point as a problem every player knows: finding enough people, a
          venue, and a reason to keep coming back, with no reliable way to make it happen. The platform is
          built as a community, not only a booking screen.
        </p>

        <h2 className="heading-5">What the platform does</h2>
        <p className="body-3">The public site, as we reviewed it on 23 November 2026, offers these features:</p>
        <ul className="body-3">
          <li>Join a game or host one, and create a group.</li>
          <li>
            Match listings with the venue, date, time, how many spots are filled, and the price in taka, or a
            free label for free games.
          </li>
          <li>Venue listings with ratings, and a way to book venues.</li>
          <li>
            Monthly community leaderboards for the players with the most matches and for the organizers who host
            the most games.
          </li>
          <li>
            Sports categories that include football, cricket, badminton, swimming, tennis, table tennis,
            running, and cycling.
          </li>
          <li>Written stories on sport in Bangladesh, and a paid Elite Club membership option.</li>
        </ul>

        <h2 className="heading-5">What this page does not claim</h2>
        <p className="body-3">
          We have not published user counts, growth figures, or results for Athlo Club here. When we have
          numbers we can verify, we will add them to this page.
        </p>

        <h2 className="heading-5">Building something similar</h2>
        <p className="body-3">
          Athlo Club is an example of the web and mobile products we build.{" "}
          <Link href="/web-and-mobile-app-development">See how we approach web and mobile app development</Link>,
          or <Link href="/#discussion">request a strategic discussion</Link>.
        </p>
      </div>
    </main>
  );
}
