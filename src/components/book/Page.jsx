import { issue } from "@/data/content";

// One magazine page. n = page number (1 = front cover).
// Even pages sit on the left of a spread, odd pages on the right.
export default function Page({ n, tone = "paper", hard = false, section, folio = true, className = "", children }) {
  const side = n % 2 === 0 ? "left" : "right";
  return (
    <div
      className={`page page--${tone} page--${side} ${className}`}
      data-density={hard ? "hard" : "soft"}
      data-page={n}
    >
      <div className="page-inner">{children}</div>
      {folio && (
        <footer className="folio">
          <span className="folio-num">{n}</span>
          <span className="folio-text">{section ?? `${issue.name}, the 50th edition`}</span>
        </footer>
      )}
    </div>
  );
}
