"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Page from "./Page";
import Photo from "./Photo";
import { archives } from "@/data/content";

export default function Archives() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Prints are laid down one at a time, like taking them out of an album.
      gsap.from(".print", {
        y: 80,
        rotate: (i) => (i % 2 ? 8 : -8),
        opacity: 0,
        duration: 1.3,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Page id="archives" title="From the archives" tone="sepia">
      <div className="archives" ref={root}>
        <h2 className="display archives-title">{archives.intro}</h2>
        <div className="prints">
          {archives.photos.map((p, i) => (
            <figure key={p.photo} className={`print print--${i + 1}`}>
              <Photo name={p.photo} sizes="(max-width: 760px) 80vw, 34vw" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Page>
  );
}
