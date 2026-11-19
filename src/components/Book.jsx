"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { issue } from "@/data/content";
import Pages from "./book/Pages";
import MusicButton from "./MusicButton";

// Two pages side by side on wide screens, one page at a time on phones and upright tablets.
const pickMode = () => (window.innerWidth >= 900 && window.innerWidth / window.innerHeight >= 1.15 ? "spread" : "single");

// The largest book that fits the stage: two pages (spread) or one page (single), at a fixed page shape.
function fitBook(stage, book, mode, ratio) {
  const cs = getComputedStyle(stage);
  const W = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const H = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  const pages = mode === "spread" ? 2 : 1;
  const ph = Math.floor(Math.min(H, W / pages / ratio));
  const pw = Math.floor(ph * ratio);
  book.style.width = `${pw * pages}px`;
  book.style.height = `${ph}px`;
  return pw;
}

export default function Book() {
  const stageRef = useRef(null);
  const bookRef = useRef(null);
  const flipRef = useRef(null);
  const audioRef = useRef(null);
  const [mode, setMode] = useState(null);
  const [page, setPage] = useState(0); // index of the current page (0 = front cover)
  const [total, setTotal] = useState(20);
  const [shift, setShift] = useState(0);
  const [opened, setOpened] = useState(false);
  const ratioRef = useRef(0.7);

  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => setMode(pickMode()), []);

  // Build the flip-book once the layout mode is known.
  useEffect(() => {
    if (!mode || flipRef.current) return;
    let cancelled = false;
    let pf;
    (async () => {
      const { PageFlip } = await import("page-flip");
      if (cancelled) return;
      const stage = stageRef.current;
      const ratio =
        mode === "spread" ? 0.7 : Math.min(0.72, Math.max(0.56, stage.clientWidth / stage.clientHeight));
      ratioRef.current = ratio;
      const pw0 = fitBook(stage, bookRef.current, mode, ratio);
      pf = new PageFlip(bookRef.current, {
        width: Math.round(1000 * ratio),
        height: 1000,
        size: "stretch",
        // one page at a time when the book is narrower than two minimum pages
        minWidth: mode === "single" ? Math.max(100, pw0) : 1,
        maxWidth: 5000,
        minHeight: 1,
        maxHeight: 5000,
        showCover: true,
        usePortrait: mode === "single",
        autoSize: true,
        drawShadow: true,
        maxShadowOpacity: 0.35,
        flippingTime: 850,
        mobileScrollSupport: false,
        disableFlipByClick: true,
        clickEventForward: true,
        showPageCorners: true,
      });
      pf.loadFromHTML(bookRef.current.querySelectorAll(".page"));
      // page-flip turns minWidth into a CSS min-width on the book; we only use it to pick one-page mode
      bookRef.current.style.minWidth = "0px";
      bookRef.current.style.minHeight = "0px";
      fitBook(stage, bookRef.current, mode, ratio);
      pf.update();
      // page-flip only lets a programmatic flip start on a page corner when tap-to-flip is off,
      // and in one-page mode its "previous" start point misses the corner. Lift that check for
      // the arrow buttons, swipes and contents links (tapping a page still never flips it).
      const settings = pf.getSettings();
      for (const name of ["flipPrev", "flipNext", "flip"]) {
        const original = pf[name].bind(pf);
        pf[name] = (...args) => {
          settings.disableFlipByClick = false;
          try {
            original(...args);
          } finally {
            settings.disableFlipByClick = true;
          }
        };
      }
      flipRef.current = pf;
      window.__flip = pf; // handy for debugging in the browser console
      setTotal(pf.getPageCount());

      const markVisible = (i) => {
        const shown = mode === "spread" ? [i, i + 1] : [i];
        bookRef.current.querySelectorAll(".page").forEach((el, k) => el.classList.toggle("is-visible", shown.includes(k)));
      };
      const recentre = (i) => {
        if (mode !== "spread") return setShift(0);
        const w = pf.getBoundsRect().pageWidth;
        const last = pf.getPageCount() - 1;
        setShift(i === 0 ? -w / 2 : i >= last ? w / 2 : 0);
      };
      pf.on("flip", (e) => {
        setPage(e.data);
        markVisible(e.data);
        recentre(e.data);
      });
      pf.on("update", () => recentre(pf.getCurrentPageIndex()));
      markVisible(0);
      recentre(0);
      document.documentElement.classList.add("book-ready");
    })();
    return () => {
      cancelled = true;
    };
  }, [mode]);

  // Switching between one-page and two-page layouts needs a fresh book.
  useEffect(() => {
    if (!mode) return;
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (pickMode() !== mode) window.location.reload();
        else if (flipRef.current) {
          fitBook(stageRef.current, bookRef.current, mode, ratioRef.current);
          flipRef.current.update();
          const i = flipRef.current.getCurrentPageIndex();
          const w = flipRef.current.getBoundsRect().pageWidth;
          const last = flipRef.current.getPageCount() - 1;
          setShift(mode === "spread" ? (i === 0 ? -w / 2 : i >= last ? w / 2 : 0) : 0);
        }
      }, 250);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mode]);

  // ---- Music: songs play one after another.
  useEffect(() => {
    Promise.all(
      issue.playlist.map((t) =>
        fetch(t.src, { method: "HEAD" })
          .then((r) => (r.ok && (r.headers.get("content-type") || "").includes("audio") ? t : null))
          .catch(() => null)
      )
    ).then((found) => setTracks(found.filter(Boolean)));
  }, []);

  const play = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.play()
      .then(() => {
        setPlaying(true);
        let v = 0;
        const fade = setInterval(() => {
          v = Math.min(0.7, v + 0.05);
          a.volume = v;
          if (v >= 0.7) clearInterval(fade);
        }, 200);
      })
      .catch(() => {});
  }, []);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) play();
    else {
      a.pause();
      setPlaying(false);
    }
  };

  const nextTrack = () => {
    const a = audioRef.current;
    if (!a || !tracks.length) return;
    const n = (track + 1) % tracks.length;
    setTrack(n);
    a.src = tracks[n].src;
    a.volume = 0.7;
    a.play().catch(() => {});
  };

  // ---- Navigation
  const next = useCallback(() => {
    const pf = flipRef.current;
    if (!pf) return;
    if (!opened) {
      setOpened(true);
      play();
    }
    pf.flipNext();
  }, [opened, play]);
  const prev = useCallback(() => flipRef.current?.flipPrev(), []);
  const goTo = useCallback(
    (n) => {
      const pf = flipRef.current;
      if (!pf) return;
      if (!opened) {
        setOpened(true);
        play();
      }
      pf.flip(n - 1);
    },
    [opened, play]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Taps inside the pages: contents links and the print that turns over.
  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;
    const onClick = (e) => {
      const go = e.target.closest("[data-goto]");
      if (go) {
        e.stopPropagation();
        goTo(Number(go.dataset.goto));
        return;
      }
      const turn = e.target.closest("[data-flip-print]");
      if (turn) {
        e.stopPropagation();
        const snap = turn.closest(".snap");
        snap.classList.toggle("is-flipped");
        turn.textContent = snap.classList.contains("is-flipped") ? "Turn back" : "Turn over";
      }
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [goTo]);

  const last = total - 1;
  const label =
    page === 0
      ? null
      : mode === "spread" && page > 0 && page < last
        ? `Pages ${page + 1}–${Math.min(page + 2, total)} of ${total}`
        : `Page ${page + 1} of ${total}`;

  return (
    <main className={`reader reader--${mode ?? "loading"}`}>
      <div className="stage" ref={stageRef}>
        <div className="book-shell" style={{ transform: `translateX(${shift}px)` }}>
          <div className="book" ref={bookRef}>
            <Pages />
          </div>
        </div>
      </div>

      <nav className="controls" aria-label="Turn the pages">
        <button type="button" className="ctl ctl--arrow" onClick={prev} disabled={page === 0} aria-label="Previous page">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        {page === 0 ? (
          <button type="button" className="ctl ctl--open" onClick={next}>
            Open the issue
          </button>
        ) : (
          <p className="ctl-label" aria-live="polite">{label}</p>
        )}
        <button type="button" className="ctl ctl--arrow" onClick={next} disabled={page >= last} aria-label="Next page">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
        {tracks.length > 0 && (
          <>
            <audio ref={audioRef} src={tracks[0].src} loop={tracks.length === 1} preload="none" onEnded={nextTrack} />
            <MusicButton playing={playing} onToggle={toggleMusic} title={tracks[track].title} />
          </>
        )}
      </nav>

      <div className="rotate-hint" role="note">
        <p>Turn your phone upright to read the magazine.</p>
      </div>
    </main>
  );
}
