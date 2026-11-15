import { issue, pageOf } from "@/data/content";

// A magazine page: running header (folio) + content. `tone` switches the page colour.
export default function Page({ id, title, tone = "paper", children, className = "", pageNo }) {
  return (
    <section id={id} className={`page page--${tone} ${className}`} aria-label={title}>
      <header className="folio">
        <span>{issue.name}</span>
        <span className="folio-title">{title}</span>
        <span>{pageNo ?? pageOf(id)}</span>
      </header>
      {children}
    </section>
  );
}
