import type { Metadata } from "next";
import Link from "next/link";
import BlogShell from "./blog-shell";

export const metadata: Metadata = {
  title: "Blog | No Antenna",
  description: "Practical thinking from No Antenna on custom software, business automation, SaaS, and digital product development.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogShell>
    <div className="blog-index-hero"><div className="container">
      <p className="caption-3">NO ANTENNA / INSIGHTS</p>
      <h1>Thinking beyond<br /><em>the template.</em></h1>
      <p>Ideas on building software that fits the work, the people, and the future of a business.</p>
    </div></div>
    <section className="blog-index-list" aria-labelledby="latest-heading"><div className="container">
      <div className="blog-index-rule"><h2 id="latest-heading" className="caption-3">LATEST WRITING</h2><span className="caption-3">01 ARTICLE</span></div>
      <article className="blog-index-card"><Link href="/blog/beyond-the-box-custom-software-business-automation" className="blog-index-image" aria-label="Read Beyond the Box"><img src="/business-automation.jpg" alt="Connected software dashboards and workflows illustrated in blue, teal, and violet" /></Link><div><p className="caption-3">CUSTOM SOFTWARE &nbsp;·&nbsp; NOVEMBER 16, 2026</p><h3><Link href="/blog/beyond-the-box-custom-software-business-automation">Beyond the Box: Why Custom Software is the Ultimate Engine for Business Automation</Link></h3><p>Stop bending your business to fit generic tools. Explore how tailored software can connect workflows and support growth.</p><Link className="text-link button-md" href="/blog/beyond-the-box-custom-software-business-automation">Read article</Link></div></article>
    </div></section>
  </BlogShell>;
}
