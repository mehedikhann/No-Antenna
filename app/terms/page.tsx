import Link from "next/link";

export const metadata = { title: "Terms | No Antenna" };

export default function Terms() {
  return <main className="legal-page">
    <div className="container">
      <Link className="legal-back button-md" href="/">← Back to No Antenna</Link>
      <p className="section-label caption-3">NO ANTENNA / TERMS</p>
      <h1 className="heading-2">Website terms</h1>
      <p className="body-3">The content on this website introduces No Antenna and its services. It is general information and does not create a project agreement, price, delivery commitment, or booking confirmation.</p>
      <h2 className="heading-5">Discussion requests</h2>
      <p className="body-3">A time submitted through the discussion form is a request. We will confirm availability and any next steps directly by email. Project scope and commercial terms are agreed separately.</p>
      <h2 className="heading-5">Content and links</h2>
      <p className="body-3">Please do not copy this website's brand assets or content without permission. The Athlo Club link leads to a separate product website with its own terms and practices.</p>
      <p className="body-6 legal-note">For questions, contact <a href="mailto:contact@noantenna.com">contact@noantenna.com</a>.</p>
    </div>
  </main>;
}
