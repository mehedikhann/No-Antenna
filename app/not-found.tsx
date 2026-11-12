import Link from "next/link";

export default function NotFound() {
  return <main className="not-found-page"><div className="container"><p className="section-label caption-3">NO ANTENNA / 404</p><h1 className="heading-1">This page is off the map.</h1><p className="body-3">The link may have changed. Head back and pick up where you left off.</p><Link className="primary-button button-md" href="/">Back to home ↗</Link></div></main>;
}
