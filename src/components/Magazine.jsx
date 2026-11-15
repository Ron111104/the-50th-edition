"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { issue } from "@/data/content";
import Cover from "./Cover";
import Contents from "./Contents";
import Profile from "./Profile";
import Portfolio from "./Portfolio";
import Archives from "./Archives";
import Family from "./Family";
import StyleFile from "./StyleFile";
import Travel from "./Travel";
import Snapped from "./Snapped";
import WifeLetter from "./WifeLetter";
import BackCover from "./BackCover";
import MusicButton from "./MusicButton";

gsap.registerPlugin(ScrollTrigger);

export default function Magazine() {
  const lenisRef = useRef(null);
  const audioRef = useRef(null);
  const [tracks, setTracks] = useState([]); // songs whose files exist
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const hasMusic = tracks.length > 0;

  // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Keep only the songs whose files exist; the music button appears if at least one does.
  useEffect(() => {
    Promise.all(
      issue.playlist.map((t) =>
        fetch(t.src, { method: "HEAD" })
          .then((r) => (r.ok && (r.headers.get("content-type") || "").includes("audio") ? t : null))
          .catch(() => null)
      )
    ).then((found) => setTracks(found.filter(Boolean)));
  }, []);

  // When a song ends, play the next one (and loop back to the first).
  const nextTrack = () => {
    const a = audioRef.current;
    if (!a || !tracks.length) return;
    const n = (track + 1) % tracks.length;
    setTrack(n);
    a.src = tracks[n].src;
    a.volume = 0.7;
    a.play().catch(() => {});
  };

  const scrollTo = (target) => {
    const el = typeof target === "string" ? document.getElementById(target) : target;
    if (el == null) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.6 });
    else if (typeof el === "number") window.scrollTo({ top: el, behavior: "smooth" });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const play = () => {
    const a = audioRef.current;
    if (!a || !hasMusic) return;
    a.volume = 0;
    a.play().then(() => {
      setPlaying(true);
      gsap.to(a, { volume: 0.7, duration: 3, ease: "power1.in" });
    }).catch(() => {});
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) play();
    else {
      gsap.to(a, { volume: 0, duration: 0.6, onComplete: () => a.pause() });
      setPlaying(false);
    }
  };

  const openIssue = () => {
    play();
    scrollTo("contents");
  };

  return (
    <main className="magazine">
      <Cover onOpen={openIssue} />
      <Contents onJump={scrollTo} />
      <Profile />
      <Portfolio />
      <Archives />
      <Family />
      <StyleFile />
      <Travel />
      <Snapped />
      <WifeLetter />
      <BackCover onRestart={() => scrollTo(0)} />
      {hasMusic && (
        <>
          <audio
            ref={audioRef}
            src={tracks[0].src}
            loop={tracks.length === 1}
            preload="none"
            onEnded={nextTrack}
          />
          <MusicButton playing={playing} onToggle={toggleMusic} title={tracks[track].title} />
        </>
      )}
    </main>
  );
}
