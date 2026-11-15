"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Page from "./Page";
import Photo from "./Photo";
import { wife } from "@/data/content";

// A cut diamond, from her letter.
function Diamond({ className = "" }) {
  return (
    <svg className={`diamond ${className}`} viewBox="0 0 40 32" aria-hidden="true">
      <path d="M8 1h24l7 9-19 21L1 10z" />
      <path d="M1 10h38M8 1l6 9 6-9 6 9 6-9M14 10l6 21 6-21" />
    </svg>
  );
}

export default function WifeLetter() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".pull-quote .diamond", {
        scale: 0.4,
        rotate: -20,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".pull-quote", start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Page id="wife" title="A letter from Mom" tone="ivory">
      <article className="wife" ref={root}>
        <header className="wife-head">
          <p className="wife-kicker">{wife.kicker}</p>
          <h2 className="wife-title">{wife.greeting}</h2>
          <p className="wife-to">{wife.to}</p>
        </header>

        <div className="wife-photos">
          {wife.photos.map((p, i) => (
            <figure key={p.photo} className={`wife-photo wife-photo--${i + 1}`}>
              <Photo name={p.photo} sizes="(max-width: 760px) 45vw, 24vw" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>

        <blockquote className="prayer">
          <p className="prayer-text">{wife.prayer}</p>
          <p className="prayer-meaning">{wife.prayerMeaning}</p>
        </blockquote>

        <div className="wife-body">
          {wife.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "dropcap" : undefined}>{p}</p>
          ))}

          <ul className="roles">
            {wife.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p>{wife.afterRoles}</p>
        </div>

        <figure className="pull-quote">
          <Diamond />
          <blockquote>{wife.pullQuote}</blockquote>
        </figure>

        <div className="wife-body">
          {wife.closingParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <footer className="wife-close">
          <p className="wife-signoff">{wife.signoff}</p>
          <p className="wife-finale">{wife.finale}</p>
          <p className="wife-grateful">{wife.grateful}</p>
          <p className="wife-motto">
            <span className="wife-motto-num">50 years of</span>
            {wife.motto.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
          <Diamond className="diamond--small" />
          <p className="wife-sparkle">{wife.sparkle}</p>
        </footer>
      </article>
    </Page>
  );
}
