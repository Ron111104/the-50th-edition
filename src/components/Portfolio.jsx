"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Page from "./Page";
import { portfolio } from "@/data/content";

// A growth curve from 1976 to 2026: compounding, with the odd wobble.
const W = 600;
const H = 260;
const points = Array.from({ length: 51 }, (_, i) => {
  const t = i / 50;
  const wobble = Math.sin(i * 1.7) * 6 * (1 - t * 0.5);
  return [t * W, H - 18 - (Math.pow(t, 2.1) * (H - 46) + wobble * t)];
});
const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const area = `${path} L${W} ${H} L0 ${H} Z`;

export default function Portfolio() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const line = root.current.querySelector(".growth-line");
      const len = line.getTotalLength();
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".factsheet-chart", start: "top 75%" } });
      tl.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" })
        .from(".growth-area", { opacity: 0, duration: 1 }, 1.2)
        .from(".growth-end", { scale: 0, transformOrigin: "center", duration: 0.5, ease: "back.out(3)" }, 2);
      gsap.from(".alloc-bar span", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".alloc", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const [ex, ey] = points[points.length - 1];

  return (
    <Page id="portfolio" title="The portfolio" tone="haldi">
      <div className="factsheet" ref={root}>
        <div className="factsheet-head">
          <p className="factsheet-tag">Fund factsheet, November 2026</p>
          <h2 className="display">{portfolio.fund}</h2>
          <p className="factsheet-plan">{portfolio.plan}</p>
        </div>

        <figure className="factsheet-chart">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A line rising steadily from 1976 to 2026">
            <path className="growth-area" d={area} />
            <path className="growth-line" d={path} />
            <circle className="growth-end" cx={ex} cy={ey} r="7" />
          </svg>
          <div className="chart-axis">
            <span>1976</span>
            <span>2001</span>
            <span>2026</span>
          </div>
          <figcaption>Growth since inception. Not drawn to scale; nothing this good is.</figcaption>
        </figure>

        <dl className="facts">
          {portfolio.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="alloc">
          <h3>Asset allocation</h3>
          <div className="alloc-bar" aria-hidden="true">
            {portfolio.allocation.map((a) => (
              <span key={a.k} style={{ flexGrow: a.v }} />
            ))}
          </div>
          <ul className="alloc-legend">
            {portfolio.allocation.map((a) => (
              <li key={a.k}>
                <b>{a.v}%</b> {a.k}
              </li>
            ))}
          </ul>
        </div>

        <p className="verdict">{portfolio.verdict}</p>
        <p className="disclaimer">{portfolio.disclaimer}</p>
      </div>
    </Page>
  );
}
