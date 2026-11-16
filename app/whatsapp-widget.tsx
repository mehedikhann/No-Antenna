"use client";

import { useEffect, useState } from "react";
import { PaperPlaneTilt, WhatsappLogo, X } from "@phosphor-icons/react";

const number = "8801886500133";
const greeting = "Hello No Antenna, I'd like to discuss a project.";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message.trim() || greeting)}`;

  return <div className="whatsapp-widget">
    {open && <section className="whatsapp-panel" id="whatsapp-panel" aria-label="Contact No Antenna on WhatsApp">
      <div className="whatsapp-panel-head">
        <span className="whatsapp-panel-mark"><img src="/no-antenna-mark-white.png" alt="" /></span>
        <div><strong>No Antenna</strong><span><WhatsappLogo size={18} weight="fill" aria-hidden="true" /> We&apos;re here to help</span></div>
        <button type="button" className="whatsapp-close" aria-label="Close WhatsApp panel" onClick={() => setOpen(false)}><X size={22} weight="bold" /></button>
      </div>
      <div className="whatsapp-panel-body">
        <h2>Hello there! <span aria-hidden="true">👋</span></h2>
        <p>Planning a digital product or looking to improve an existing one?</p>
        <p>Tell us a little about it. We&apos;ll continue the conversation on WhatsApp.</p>
        <div className="whatsapp-compose">
          <label className="sr-only" htmlFor="whatsapp-message">Your message</label>
          <input id="whatsapp-message" type="text" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={500} placeholder="Type your message..." onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); document.getElementById("whatsapp-send")?.click(); } }} />
          <a id="whatsapp-send" href={url} target="_blank" rel="noopener noreferrer" aria-label="Continue with this message on WhatsApp"><PaperPlaneTilt size={22} weight="fill" aria-hidden="true" /></a>
        </div>
        <span className="whatsapp-note">WhatsApp opens to send your message.</span>
      </div>
    </section>}
    <button type="button" className="whatsapp-launch" aria-label={open ? "Close WhatsApp chat" : "Chat with No Antenna on WhatsApp"} aria-expanded={open} aria-controls="whatsapp-panel" onClick={() => setOpen(!open)}>
      {open ? <X size={26} weight="bold" aria-hidden="true" /> : <WhatsappLogo size={29} weight="fill" aria-hidden="true" />}
      <span>{open ? "Close" : "WhatsApp"}</span>
    </button>
  </div>;
}
