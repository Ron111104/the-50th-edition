"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Page from "./Page";
import Photo from "./Photo";
import { snapped } from "@/data/content";

gsap.registerPlugin(Draggable);

// Where each print lands on the table (desktop only), as % of the table + rotation.
const SPOTS = [
  { left: 3, top: 4, rotate: -4 },
  { left: 60, top: 0, rotate: 3 },
  { left: 34, top: 44, rotate: -2 },
  { left: 66, top: 52, rotate: 5 },
];

export default function Snapped() {
  const root = useRef(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();
    // Desktop with a mouse: prints are scattered on a table and can be moved around.
    mm.add("(min-width: 900px) and (pointer: fine)", () => {
      let z = 10;
      const prints = root.current.querySelectorAll(".snap");
      const d = Draggable.create(prints, {
        bounds: root.current.querySelector(".table"),
        edgeResistance: 0.8,
        dragClickables: false,
        minimumMovement: 6,
        onPress() {
          gsap.set(this.target, { zIndex: ++z });
          gsap.to(this.target, { scale: 1.04, boxShadow: "0 30px 50px rgba(40,10,15,.35)", duration: 0.2 });
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, boxShadow: "0 10px 24px rgba(40,10,15,.22)", duration: 0.3 });
        },
      });
      return () => d.forEach((x) => x.kill());
    });
    return () => mm.revert();
  }, []);

  return (
    <Page id="snapped" title="Seen and snapped">
      <div className="snapped" ref={root}>
        <div className="snapped-head">
          <h2 className="display">Seen and snapped</h2>
          <p className="standfirst">{snapped.intro}</p>
          <p className="table-hint">Move the prints around. One of them has something on the back.</p>
        </div>
        <div className="table">
          {snapped.photos.map((p, i) => {
            const spot = SPOTS[i % SPOTS.length];
            const hasBack = Boolean(p.back);
            return (
              <figure
                key={p.photo}
                className={`snap ${hasBack ? "snap--flip" : ""} ${hasBack && flipped ? "is-flipped" : ""}`}
                style={{ "--left": `${spot.left}%`, "--top": `${spot.top}%`, "--rot": `${spot.rotate}deg` }}
              >
                <div className="snap-inner">
                  <div className="snap-front">
                    <Photo name={p.photo} sizes="(max-width: 900px) 90vw, 30vw" />
                    <figcaption>{p.caption}</figcaption>
                  </div>
                  {hasBack && <p className="snap-back">{p.back}</p>}
                </div>
                {hasBack && (
                  <button className="flip-btn" onClick={() => setFlipped((f) => !f)}>
                    {flipped ? "Turn back" : "Turn over"}
                  </button>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </Page>
  );
}
