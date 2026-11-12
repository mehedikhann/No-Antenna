import Link from "next/link";

export const metadata = { title: "Privacy | No Antenna" };

export default function Privacy() {
  return <main className="legal-page">
    <div className="container">
      <Link className="legal-back button-md" href="/">← Back to No Antenna</Link>
      <p className="section-label caption-3">NO ANTENNA / PRIVACY</p>
      <h1 className="heading-2">Privacy notice</h1>
      <p className="body-3">When you request a strategic discussion, we collect the information you enter: your name, email, company, location category, service interest, project description, and preferred time. We use it to review your inquiry and respond to you.</p>
      <h2 className="heading-5">How your inquiry is handled</h2>
      <p className="body-3">Your inquiry is delivered by email to No Antenna using an email delivery provider. Access is limited to the team members who handle inquiries and the provider needed to deliver the message. We do not publish your inquiry or use it as a testimonial. The website does not currently use advertising cookies or analytics trackers.</p>
      <h2 className="heading-5">Questions or deletion requests</h2>
      <p className="body-3">Email <a href="mailto:contact@noantenna.com">contact@noantenna.com</a> to ask about your submitted information or request its removal. Include the email address used in your inquiry so we can locate it.</p>
      <p className="body-6 legal-note">This notice describes the current website inquiry form. It should be reviewed before public launch if the data handling process changes.</p>
    </div>
  </main>;
}
