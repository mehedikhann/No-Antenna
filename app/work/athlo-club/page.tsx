import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://www.noantenna.com";
const path = "/work/athlo-club";

const title = "Athlo Club case study: a sports platform built in 15 days | No Antenna";
const description =
  "How No Antenna designed and built Athlo Club, a community sports platform in Dhaka, in 15 days with React and Supabase. Reported results: 10,000+ players, 300+ venues, 100+ matches a week.";

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
        <h1 className="heading-2">Athlo Club: a sports platform built in 15 days</h1>
        <p className="body-3">
          Athlo Club is a community sports platform in Dhaka, designed and built by No Antenna. Players use it to
          find games, host their own matches, join groups, and book venues. You can see it live at{" "}
          <a href="https://www.athlo.club/" rel="noopener">athlo.club</a>.
        </p>

        <h2 className="heading-5">The problem</h2>
        <p className="body-3">
          Athlo Club describes its starting point as a problem every player knows: finding enough people, a
          venue, and a reason to keep coming back, with no reliable way to make it happen. The platform is
          built as a community, not only a booking screen.
        </p>

        <h2 className="heading-5">What we built</h2>
        <p className="body-3">
          No Antenna handled the whole product: the design, the frontend, and the backend. The first version
          took 15 days. We used React for the frontend and Supabase for the backend.
        </p>
        <p className="body-3">The public site offers these features, as we reviewed it on 23 November 2026:</p>
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

        <h2 className="heading-5">Results</h2>
        <p className="body-3">These figures were reported by No Antenna on 23 November 2026:</p>
        <ul className="body-3">
          <li>More than 10,000 players registered.</li>
          <li>More than 300 venues listed.</li>
          <li>More than 100 matches hosted each week.</li>
        </ul>
        <p className="body-3">
          These are our own figures and have not been audited by a third party. We do not publish revenue,
          retention, or other results for Athlo Club here.
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
