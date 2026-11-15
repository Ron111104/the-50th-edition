"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Photo from "./Photo";
import Barcode from "./Barcode";
import { cover, issue, pageOf } from "@/data/content";

export default function Cover({ onOpen }) {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        // One orchestrated arrival: the photo settles, the masthead rises letter by letter, then the cover lines.
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".cover", { y: 40, opacity: 0, duration: 1.4 })
          .from(".cover .photo img", { scale: 1.12, duration: 2.6 }, 0)
          .from(".masthead span", { yPercent: 110, duration: 1.3, stagger: 0.07 }, 0.35)
          .from(".cover-kicker, .cover-date", { opacity: 0, duration: 1 }, 0.9)
          .from(".cover-lines li", { opacity: 0, x: -14, duration: 0.9, stagger: 0.12 }, 1.1)
          .from(".cover-foot > *, .open-issue", { opacity: 0, duration: 1, stagger: 0.1 }, 1.4);

        // Scrolling away turns the cover like a page, hinged on its left edge.
        gsap.to(".cover", {
          rotateY: -70,
          x: "-8%",
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cover-stage" ref={root} aria-label="Cover">
      <div className="cover-hinge">
        <article className="cover">
          <Photo name={cover.photo} priority className="cover-photo" sizes="(max-width: 760px) 100vw, 46vw" />
          <div className="cover-shade" />
          <p className="cover-kicker">{cover.kicker}</p>
          <h1 className="masthead" aria-label={issue.name}>
            {[...issue.name.toUpperCase()].map((c, i) => (
              <span key={i} aria-hidden="true">{c}</span>
            ))}
          </h1>
          <p className="cover-date">{issue.date}</p>
          <ul className="cover-lines">
            {cover.lines.map((l) => (
              <li key={l.id}>
                <span className="cover-line-page">{pageOf(l.id)}</span>
                {l.title}
              </li>
            ))}
          </ul>
          <div className="cover-foot">
            <p className="cover-issue">
              <span className="cover-issue-num">{issue.number}</span>
              <span>Issue</span>
            </p>
            <p className="cover-price">{cover.price}</p>
            <Barcode text={issue.born} label="1976  2026" className="cover-barcode" />
          </div>
        </article>
      </div>
      <button className="open-issue" onClick={onOpen}>Open the issue</button>
    </section>
  );
}
