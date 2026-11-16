import Link from "next/link";
import type { ReactNode } from "react";

export default function BlogShell({ children }: { children: ReactNode }) {
  return <div className="blog-page">
    <a className="skip-link" href="#blog-main">Skip to content</a>
    <header className="blog-header"><nav className="nav-shell" aria-label="Blog navigation">
      <Link className="brand" href="/" aria-label="No Antenna home"><img src="/no-antenna-wordmark.png" alt="No Antenna" /></Link>
      <div className="blog-nav"><Link href="/">Home</Link><Link href="/blog" aria-label="All blog articles">Blog</Link></div>
      <Link className="nav-cta button-sm" href="/#discussion">Book a discussion</Link>
    </nav></header>
    <main id="blog-main">{children}</main>
    <footer className="blog-page-footer"><div className="container"><Link href="/" aria-label="No Antenna home"><img src="/no-antenna-wordmark.png" alt="No Antenna" /></Link><p>Software built for what comes next.</p><div><Link href="/blog">Blog</Link><Link href="/#discussion">Contact</Link><a href="https://www.instagram.com/no.antenna" target="_blank" rel="noopener noreferrer">Instagram</a><Link href="/privacy">Privacy</Link></div><small>© 2026 No Antenna</small></div></footer>
  </div>;
}
