"use client";

import { FormEvent, useEffect, useState } from "react";
import { BracketsCurly, FacebookLogo, LightbulbFilament, LinkedinLogo } from "@phosphor-icons/react";

const services = [
  ["01", "Custom software development", "Purpose built systems shaped around your operations, workflows, and growth plans.", "Internal platforms · Business tools · Integrations"],
  ["02", "SaaS product development", "Turn a product idea into a usable platform with a clear path for iteration.", "Product planning · MVPs · Subscription platforms"],
  ["03", "Premium Website Development", "Distinctive, responsive websites that explain your value and make the next step obvious.", "Corporate sites · Marketing sites · Web experiences"],
  ["04", "Web and mobile applications", "Connected experiences for customers, teams, and the work between them.", "Web apps · Mobile apps · Portals"],
  ["05", "Game Development", "Interactive games shaped around engaging mechanics, clear design, and the people who play them.", "Concepts · Prototypes · Production"],
  ["06", "Animated Content Development", "Animated content that explains products, tells stories, and brings ideas to life.", "Explainers · Brand motion · Digital content"],
];

const faqs = [
  ["What kind of projects can we discuss?", "We work across custom software, SaaS products, premium website development, web and mobile applications, game development, and animated content. If your idea crosses more than one category, share the full context in your request."],
  ["Can you work with a team outside Bangladesh?", "Yes. No Antenna is open to projects from businesses in Bangladesh and international markets. We can discuss a practical communication rhythm for your location and time zone."],
  ["Do I need a complete specification?", "No. A clear business problem or product idea is enough to begin. We can use the first discussion to understand the goal, users, scope, and immediate decisions."],
  ["How do you determine scope and pricing?", "We review your objectives, required features, integrations, design needs, and timeline. A proposal and commercial terms can follow once the scope is understood."],
  ["Can you improve an existing product?", "Yes. Tell us what is working, what is blocking progress, and what you want to change. We can discuss whether a focused improvement or broader rebuild makes sense."],
  ["What happens after I request a discussion?", "Share a preferred time and a short description of the project. Your slot is a request until we confirm it with you by email."],
];

const statement = "Good software starts with a clear understanding of what your business needs to do next.";

export default function SiteClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introStage, setIntroStage] = useState<"visible" | "exiting" | "done">("visible");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const exitTimer = window.setTimeout(() => setIntroStage("exiting"), 4250);
    const doneTimer = window.setTimeout(() => {
      setIntroStage("done");
      document.body.style.overflow = previousOverflow;
    }, 5000);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = document.querySelector<HTMLElement>(".statement-section");
    const mark = section?.querySelector<HTMLElement>(".statement-mark");
    const words = Array.from(section?.querySelectorAll<HTMLElement>(".statement-word") ?? []);
    if (!section || !mark || !words.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight * .82 + rect.height * .65;
      const progress = Math.max(0, Math.min(1, (window.innerHeight * .82 - rect.top) / travel));
      section.classList.add("is-scroll-animated");
      words.forEach((word, index) => {
        const reveal = Math.max(0, Math.min(1, (progress - index / words.length * .68) / .32));
        word.style.setProperty("--word-opacity", String(.58 + reveal * .42));
        word.style.setProperty("--word-shift", `${(1 - reveal) * 8}px`);
      });
      mark.style.setProperty("--mark-opacity", String(.35 + progress * .65));
      mark.style.setProperty("--mark-shift", `${36 - progress * 72}px`);
      mark.style.setProperty("--mark-turn", `${-8 + progress * 8}deg`);
      mark.style.setProperty("--mark-scale", String(.84 + progress * .16));
      mark.style.setProperty("--ring-turn", `${progress * 280}deg`);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setFormState("sending");
    setFormError("");
    try {
      const fields = Object.fromEntries(new FormData(form).entries());
      if (fields.website) {
        form.reset();
        setFormState("success");
        return;
      }
      const response = await fetch("https://formsubmit.co/ajax/antennano@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          company: fields.company || "Not provided",
          location: fields.market,
          service: fields.service,
          project_details: fields.brief,
          preferred_date_time_and_time_zone: fields.availability,
          _subject: "New No Antenna strategic discussion request",
          _template: "table",
          _captcha: "false",
          _honey: "",
          _url: window.location.href,
        }),
      });
      const result = await response.json() as { success?: boolean | string; message?: string };
      if (!response.ok || String(result.success) !== "true") {
        throw new Error(typeof result.message === "string" ? result.message.slice(0, 200) : "The request could not be delivered. Please try again.");
      }
      form.reset();
      setFormState("success");
    } catch (error) {
      setFormState("error");
      setFormError(error instanceof Error ? error.message : "The request could not be sent.");
    }
  }

  return (
    <>
      {introStage !== "done" && (
        <div className={"site-intro " + (introStage === "exiting" ? "is-exiting" : "")} role="status" aria-label="No Antenna introduction">
          <div className="intro-content">
            <p className="intro-overline caption-3">NO ANTENNA / DIGITAL PRODUCTS</p>
            <div className="intro-mark"><img src="/no-antenna-mark-white.png" alt="" /></div>
            <p className="intro-message heading-6">Thinking clearly. Building well.</p>
            <div className="intro-sequence caption-3" aria-hidden="true"><span>UNDERSTAND</span><span>SHAPE</span><span>BUILD</span></div>
            <div className="intro-progress" aria-hidden="true"><span /></div>
          </div>
        </div>
      )}
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="No Antenna home" onClick={() => setMenuOpen(false)}><img src="/no-antenna-wordmark.png" alt="No Antenna" /></a>
          <div className="desktop-links"><a href="#services">Services</a><a href="#product">Our product</a><a href="#approach">Approach</a><a href="#about">About</a><a href="#faq">FAQ</a></div>
          <a className="nav-cta button-sm" href="#discussion">Book a discussion</a>
          <button className={"menu-toggle " + (menuOpen ? "is-open" : "")} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </nav>
      </header>
      <div className={"mobile-panel " + (menuOpen ? "is-open" : "")} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {[["Services", "#services"], ["Our product", "#product"], ["Approach", "#approach"], ["About", "#about"], ["FAQ", "#faq"], ["Book a discussion", "#discussion"]].map(([label, href], index) => (
            <a key={href} href={href} style={{ transitionDelay: menuOpen ? (index * 60) + "ms" : "0ms" }} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>{label}</a>
          ))}
        </nav>
      </div>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-inner container">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow caption-1"><span className="status-dot" /> DIGITAL PRODUCTS, BUILT WITH PURPOSE</p>
              <h1 className="heading-1">Your next idea deserves <span>a stronger build.</span></h1>
              <p className="body-3 hero-description">No Antenna develops custom software, SaaS products, premium websites, web and mobile apps, games, and animated content for businesses in Bangladesh and beyond.</p>
              <a className="primary-button button-md" href="#discussion">Book a strategic discussion</a>
              <p className="hero-note caption-2">Tell us what you are building. We will start with the right questions.</p>
            </div>
            <div className="hero-art" role="img" aria-label="Animated illustration of code becoming a useful digital product" data-reveal>
              <div className="art-outer">
                <div className="art-topline"><span>NO ANTENNA / PROJECT THINKING</span><span>01 / 03</span></div>
                <div className="art-stage">
                  <span className="art-kicker">FROM IDEA TO WORKING SOFTWARE</span>
                  <div className="code-window" aria-hidden="true">
                    <div className="code-window-bar"><span className="window-dots"><i /><i /><i /></span><span>product.tsx</span><span>● BUILDING</span></div>
                    <div className="code-lines">
                      <div className="code-line"><span>01</span><code><b>const</b> idea <em>=</em> {'{'}</code></div>
                      <div className="code-line"><span>02</span><code>  <strong>purpose</strong>: <q>solve a real need</q>,</code></div>
                      <div className="code-line"><span>03</span><code>  <strong>experience</strong>: <q>make it useful</q></code></div>
                      <div className="code-line"><span>04</span><code>{'}'}</code></div>
                      <div className="code-line"><span>05</span><code><b>export</b> <em>default</em> <span className="code-function">build</span>(idea) <span className="code-cursor" /></code></div>
                    </div>
                    <div className="code-preview"><span className="code-preview-icon">&lt;/&gt;</span><span><strong>Thoughtful code.</strong><small>Useful outcomes.</small></span><span className="code-preview-check">✓</span></div>
                  </div>
                </div>
                <div className="art-steps"><div><span>01</span><strong>Understand</strong><small>Business and users</small></div><div><span>02</span><strong>Shape</strong><small>Scope and priorities</small></div><div><span>03</span><strong>Build</strong><small>Product and launch</small></div></div>
                <div className="art-bottom"><span>Strategy first. Thoughtful execution.</span></div>
              </div>
              <span className="art-caption caption-5">A simple view of how every project begins.</span>
            </div>
          </div>
          <div className="hero-footer container"><span>SOFTWARE DEVELOPMENT</span><span>DESIGN × ENGINEERING × BUSINESS</span><span>BANGLADESH / GLOBAL</span></div>
        </section>

        <section className="intro-section light-section" aria-labelledby="intro-heading">
          <div className="container intro-grid" data-reveal><div className="section-identity"><span className="section-icon idea-icon" aria-hidden="true"><LightbulbFilament size={32} weight="duotone" /></span><p className="section-label caption-3">01 / THE IDEA</p></div><div><h2 id="intro-heading" className="heading-3">Technology should move your business forward, without adding complexity.</h2><p className="body-3">Whether you are improving an established operation or launching something new, we start by understanding the problem behind the request. Then we turn that understanding into a practical digital experience.</p></div></div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-heading">
          <div className="container"><div className="section-header" data-reveal><div className="section-identity"><span className="section-icon build-icon" aria-hidden="true"><BracketsCurly size={32} weight="duotone" /></span><p className="section-label caption-3">02 / WHAT WE BUILD</p></div><div><h2 id="services-heading" className="heading-2">The right product for<br />the work ahead.</h2><p className="body-3">Six focused services, connected by one idea: the work should make a meaningful difference to the people using it.</p></div></div>
            <div className="service-grid">{services.map(([number, title, description, detail]) => (
              <article className="service-card" key={number} data-reveal><div className="service-top"><span className="caption-3">{number}</span></div><div><h3 className="heading-5">{title}</h3><p className="body-3">{description}</p></div><span className="service-detail caption-2">{detail}</span></article>
            ))}</div>
          </div>
        </section>

        <section className="product-section" id="product" aria-labelledby="product-heading">
          <div className="container product-grid">
            <div className="product-copy" data-reveal><p className="section-label caption-3">03 / OUR PRODUCT</p><p className="product-tag caption-3">FROM NO ANTENNA</p><h2 id="product-heading" className="heading-2">Meet Athlo Club.</h2><p className="body-3">Our sports platform brings players and venues closer to the game. It is one example of how we turn a focused idea into a digital product of our own.</p><a className="product-link button-md" href="https://www.athlo.club/" target="_blank" rel="noopener noreferrer">Explore Athlo Club</a></div>
            <div className="product-visual" data-reveal>
              <span className="caption-3">FEATURED PRODUCT / 001</span>
              <a className="athlo-feature" href="https://www.athlo.club/" target="_blank" rel="noopener noreferrer" aria-label="Visit www.athlo.club">
                <span className="athlo-motion-ring" aria-hidden="true" />
                <span className="athlo-logo-card"><img src="/athlo-club-logo.png" alt="Athlo Club, The Game is Always On" /></span>
                <span className="athlo-address button-md">www.athlo.club</span>
              </a>
              <div className="product-visual-footer"><span>ATHLO CLUB · THE GAME IS ALWAYS ON</span></div>
            </div>
          </div>
        </section>

        <section className="statement-section light-section" aria-label="Our point of view">
          <div className="container statement-inner" data-reveal>
            <p className="section-label caption-3">A SIMPLE PRINCIPLE</p>
            <div className="statement-content">
              <p className="heading-3 statement-copy">{statement.split(" ").map((word, i) => <span className="statement-word" key={i}>{word} </span>)}</p>
              <div className="statement-mark" aria-hidden="true"><span className="statement-ring" /><img src="/no-antenna-mark.png" alt="" /></div>
            </div>
            <div className="statement-rule"><span>CLARITY BEFORE CODE</span><span>NO ANTENNA</span></div>
          </div>
        </section>

        <section className="approach-section" id="approach" aria-labelledby="approach-heading">
          <div className="container"><div className="section-header" data-reveal><p className="section-label caption-3">04 / HOW WE WORK</p><div><h2 id="approach-heading" className="heading-2">From the first conversation<br />to the next release.</h2><p className="body-3">A straightforward process keeps business goals, product decisions, and delivery in the same conversation.</p></div></div>
            <div className="process-grid">
              <article data-reveal><span className="process-number">01</span><h3 className="heading-5">Discover the real need</h3><p className="body-3">We discuss users, current challenges, desired outcomes, and what success should look like.</p></article>
              <article data-reveal><span className="process-number">02</span><h3 className="heading-5">Define the right scope</h3><p className="body-3">We organize the work into priorities, decisions, and a delivery plan that fits the product.</p></article>
              <article data-reveal><span className="process-number">03</span><h3 className="heading-5">Design, build, improve</h3><p className="body-3">We create the experience, develop the product, review progress, and refine what matters.</p></article>
            </div>
          </div>
        </section>

        <section className="about-section light-section" id="about" aria-labelledby="about-heading">
          <div className="container about-grid"><div className="about-visual" data-reveal><span className="about-visual-label caption-3">A BUSINESS FIRST MINDSET</span><div className="decision-map"><div className="decision-point"><span className="decision-index">01</span><div><strong>Understand the challenge</strong><small>What needs to change, and for whom?</small></div></div><div className="decision-point"><span className="decision-index">02</span><div><strong>Choose the priorities</strong><small>What will create value first?</small></div></div><div className="decision-point"><span className="decision-index">03</span><div><strong>Build the right thing</strong><small>What can the team use and grow?</small></div></div></div><span className="about-visual-bottom caption-3">THINK CLEARLY. BUILD WELL.</span></div><div className="about-copy" data-reveal><p className="section-label caption-3">05 / WHO WE ARE</p><h2 id="about-heading" className="heading-2">A technology partner that starts with your business.</h2><p className="body-3">No Antenna is a software development company serving local and international clients. We bring product thinking to custom development, SaaS, websites, and applications so the work begins with a clear purpose.</p><a href="#discussion" className="text-link button-md">Start a conversation</a></div></div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="container faq-grid"><div data-reveal><p className="section-label caption-3">06 / GOOD TO KNOW</p><h2 id="faq-heading" className="heading-2">A few useful answers.</h2><p className="body-3">Have a different question? Bring it to the discussion.</p></div><div className="faq-list" data-reveal>{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><h3><button className="faq-trigger title-2" type="button" aria-expanded={openFaq === index} aria-controls={"faq-answer-" + index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<span aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button></h3><div className="faq-answer body-3" id={"faq-answer-" + index} hidden={openFaq !== index}>{answer}</div></div>)}</div></div>
        </section>

        <section className="discussion-section light-section" id="discussion" aria-labelledby="discussion-heading">
          <div className="container discussion-grid"><div className="discussion-copy" data-reveal><p className="section-label caption-3">07 / LET US TALK</p><h2 id="discussion-heading" className="heading-2">Let us make the first conversation count.</h2><p className="body-3">Tell us what you want to build or improve. Share a preferred time, and we will follow up to confirm the discussion by email.</p><div className="contact-box"><span className="caption-3">PREFER EMAIL?</span><a className="title-2" href="mailto:contact@noantenna.com">contact@noantenna.com</a></div></div>
            <div className="form-card" data-reveal><div className="form-heading"><span className="caption-3">STRATEGIC DISCUSSION</span><h3 className="heading-5">Request a time to talk.</h3><p className="body-6">A requested time is confirmed only when we reply by email.</p></div>
              {formState === "success" ? <div className="form-success" role="status"><span className="success-mark">✓</span><h4 className="heading-6">Your request was sent.</h4><p className="body-3">Thank you. We will review the details and contact you by email to confirm a time.</p><button type="button" className="text-link button-md" onClick={() => setFormState("idle")}>Send another request</button></div> : <form onSubmit={submitInquiry}>
                <div className="form-row"><label className="form-field"><span className="body-4">Your name *</span><input name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your full name" /></label><label className="form-field"><span className="body-4">Work email *</span><input name="email" type="email" autoComplete="email" maxLength={160} required placeholder="you@company.com" /></label></div>
                <div className="form-row"><label className="form-field"><span className="body-4">Company</span><input name="company" type="text" autoComplete="organization" maxLength={120} placeholder="Company or project name" /></label><label className="form-field"><span className="body-4">Location *</span><select name="market" defaultValue="" required><option value="" disabled>Select a location</option><option value="Bangladesh">Bangladesh</option><option value="International">Outside Bangladesh</option></select></label></div>
                <label className="form-field"><span className="body-4">What are you planning? *</span><select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{services.map((service) => <option key={service[0]} value={service[1]}>{service[1]}</option>)}<option value="Not sure yet">Not sure yet</option></select></label>
                <label className="form-field"><span className="body-4">Tell us about it *</span><textarea name="brief" minLength={15} maxLength={2000} required rows={4} placeholder="The problem, your idea, or the outcome you want" /></label>
                <label className="form-field"><span className="body-4">Preferred date, time, and time zone *</span><input name="availability" type="text" maxLength={180} required placeholder="For example, Tuesday afternoon, Bangladesh time" /></label>
                <label className="consent-field body-6"><input type="checkbox" name="consent" value="yes" required /><span>I agree that No Antenna may use these details to respond to my inquiry. See the <a href="/privacy">privacy notice</a>.</span></label>
                <div className="honeypot" aria-hidden="true"><label>Website <input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
                {formState === "error" && <p className="form-error body-6" role="alert">{formError} You can also email <a href="mailto:contact@noantenna.com">contact@noantenna.com</a>.</p>}
                <button className="primary-button button-md form-button" type="submit" disabled={formState === "sending"}>{formState === "sending" ? "Sending request…" : "Request a discussion"}</button>
              </form>}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><div className="container footer-top"><div><a className="footer-brand" href="#top" aria-label="No Antenna home"><img src="/no-antenna-wordmark.png" alt="No Antenna" /></a><p className="body-6">Software built for what comes next.</p></div><div className="footer-contact"><a className="footer-email title-2" href="mailto:contact@noantenna.com">contact@noantenna.com</a><nav className="footer-social" aria-label="Social media"><a href="https://web.facebook.com/noantenna1/" target="_blank" rel="noopener noreferrer"><FacebookLogo size={20} weight="fill" aria-hidden="true" />Facebook</a><a href="https://www.linkedin.com/company/noantenna/" target="_blank" rel="noopener noreferrer"><LinkedinLogo size={20} weight="fill" aria-hidden="true" />LinkedIn</a></nav></div></div><div className="container footer-bottom caption-5"><span>© 2026 No Antenna</span><span>Bangladesh · Working globally</span><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#top">Back to top</a></div></div></footer>
    </>
  );
}
