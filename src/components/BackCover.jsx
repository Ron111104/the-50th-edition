"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Barcode from "./Barcode";
import { backCover, issue } from "@/data/content";

export default function BackCover({ onRestart }) {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 55%" } });
      tl.from(".back-fifty span", { yPercent: 100, duration: 1.6, stagger: 0.12, ease: "expo.out" })
        .from(".back-headline, .back-line", { opacity: 0, y: 20, duration: 1, stagger: 0.25 }, 0.6)
        .from(".back-foot", { opacity: 0, duration: 1 }, 1.4);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="back-cover" ref={root} aria-label="Back cover">
      <p className="back-fifty" aria-hidden="true">
        <span>5</span>
        <span>0</span>
      </p>
      <h2 className="back-headline">{backCover.headline}</h2>
      <p className="back-line">{backCover.line}</p>
      <div className="back-foot">
        <p>With love, {issue.from}</p>
        <p>{backCover.closing}</p>
        <Barcode text={issue.date} label={`${issue.born}`} className="back-barcode" />
        <button className="restart" onClick={onRestart}>Back to the cover</button>
      </div>
    </section>
  );
}
