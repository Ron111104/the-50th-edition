import Page from "./Page";
import Photo from "../Photo";
import {
  issue, cover, contents, profile, portfolio, archives, family, style, travel, snapped, wife, backCover,
} from "@/data/content";

// A cut diamond: the small recurring ornament, taken from Mom's letter.
export function Diamond({ className = "" }) {
  return (
    <svg className={`diamond ${className}`} viewBox="0 0 40 32" aria-hidden="true">
      <path d="M8 1h24l7 9-19 21L1 10z" />
      <path d="M1 10h38M8 1l6 9 6-9 6 9 6-9M14 10l6 21 6-21" />
    </svg>
  );
}

function Kicker({ children }) {
  return (
    <p className="kicker">
      <Diamond className="diamond--tiny" />
      {children}
    </p>
  );
}

function Continued({ children = "Continued overleaf" }) {
  return <p className="continued">{children}</p>;
}

/* ---------------------------------------------------------------- 1. Cover */
function Cover() {
  return (
    <Page n={1} tone="cover" hard folio={false}>
      <div className="cover-bg" aria-hidden="true" />
      <p className="cover-kicker">{cover.kicker}</p>
      <div className="cover-photo">
        <Photo name={cover.photo} priority sizes="(max-width: 900px) 100vw, 45vw" className="cover-img" />
        <h1 className="masthead">{issue.name}</h1>
        <img
          className="cover-cutout"
          src={`/photos/${cover.cutout}-1280.webp`}
          srcSet={`/photos/${cover.cutout}-640.webp 640w, /photos/${cover.cutout}-1280.webp 1280w`}
          sizes="(max-width: 900px) 100vw, 45vw"
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      </div>
      <div className="cover-foot">
        <p className="cover-date">{issue.date}</p>
        <ul className="cover-lines">
          {cover.lines.map((l) => (
            <li key={l.title}>
              <button type="button" data-goto={l.page}>{l.title}</button>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------------- 2. Contents */
function Contents() {
  return (
    <Page n={2} section="Contents">
      <h2 className="title">Contents</h2>
      <p className="lede">
        Issue {issue.number}, published {issue.date}, fifty years to the day after the first edition.
      </p>
      <ol className="toc">
        {contents.map((c) => (
          <li key={c.page}>
            <button type="button" data-goto={c.page}>
              <span className="toc-num">{String(c.page).padStart(2, "0")}</span>
              <span className="toc-text">
                <span className="toc-title">{c.title}</span>
                <span className="toc-deck">{c.deck}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </Page>
  );
}

/* ---------------------------------------------------------------- 3–4. Profile */
function ProfileOpener() {
  return (
    <Page n={3} section="Profile">
      <Kicker>Profile</Kicker>
      <h2 className="title title--xl">{profile.headline}</h2>
      <figure className="fig fig--center profile-portrait">
        <Photo name={profile.photo} sizes="(max-width: 900px) 90vw, 40vw" />
      </figure>
      <p className="lede">{profile.standfirst}</p>
    </Page>
  );
}

function Traits() {
  return (
    <Page n={4} section="Profile">
      <h2 className="title">Three things he always does</h2>
      <ol className="traits">
        {profile.traits.map((t) => (
          <li key={t.word} className="trait">
            <div className="trait-photo">
              <Photo name={t.photo} sizes="(max-width: 900px) 40vw, 18vw" />
            </div>
            <div className="trait-text">
              <h3>{t.word}</h3>
              <p>{t.line}</p>
            </div>
          </li>
        ))}
      </ol>
    </Page>
  );
}

/* ---------------------------------------------------------------- 5. Archives */
function Archives() {
  return (
    <Page n={5} tone="sepia" section="From the archives">
      <Kicker>From the archives</Kicker>
      <h2 className="title archives-title">{archives.intro}</h2>
      <div className="prints">
        {archives.photos.map((p, i) => (
          <figure key={p.photo} className={`print print--${i + 1}`}>
            <Photo name={p.photo} sizes="(max-width: 900px) 45vw, 20vw" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------------- 6–7. Portfolio */
const CW = 600;
const CH = 260;
const pts = Array.from({ length: 51 }, (_, i) => {
  const t = i / 50;
  const wobble = Math.sin(i * 1.7) * 6 * (1 - t * 0.5);
  return [t * CW, CH - 18 - (Math.pow(t, 2.1) * (CH - 46) + wobble * t)];
});
const linePath = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const [ex, ey] = pts[pts.length - 1];

function PortfolioOne() {
  return (
    <Page n={6} tone="haldi" section="The portfolio">
      <Kicker>Fund factsheet, November 2026</Kicker>
      <h2 className="title">{portfolio.fund}</h2>
      <p className="lede lede--plain">{portfolio.plan}</p>
      <figure className="chart">
        <svg viewBox={`0 0 ${CW} ${CH}`} role="img" aria-label="A line rising steadily from 1976 to 2026">
          <path className="growth-area" d={`${linePath} L${CW} ${CH} L0 ${CH} Z`} />
          <path className="growth-line" d={linePath} pathLength="1" />
          <circle className="growth-end" cx={ex} cy={ey} r="7" />
        </svg>
        <div className="chart-axis">
          <span>1976</span>
          <span>2001</span>
          <span>2026</span>
        </div>
        <figcaption>Growth since inception. Not drawn to scale; nothing this good is.</figcaption>
      </figure>
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
    </Page>
  );
}

function PortfolioTwo() {
  return (
    <Page n={7} tone="haldi" section="The portfolio">
      <h3 className="subtitle">Key facts</h3>
      <dl className="facts">
        {portfolio.facts.map((f) => (
          <div key={f.k}>
            <dt>{f.k}</dt>
            <dd>{f.v}</dd>
          </div>
        ))}
      </dl>
      <div className="rating" aria-label="Five stars">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
          </svg>
        ))}
      </div>
      <p className="verdict">{portfolio.verdict}</p>
      <p className="disclaimer">{portfolio.disclaimer}</p>
    </Page>
  );
}

/* ---------------------------------------------------------------- 8–9. Family */
function FamilyOne() {
  const lead = family.photos[0];
  return (
    <Page n={8} section="The family">
      <Kicker>Feature</Kicker>
      <h2 className="title">The family</h2>
      <p className="lede">{family.standfirst}</p>
      <figure className="fig fig--center family-lead">
        <Photo name={lead.photo} sizes="(max-width: 900px) 90vw, 40vw" />
        <figcaption>{lead.caption}</figcaption>
      </figure>
      <Continued />
    </Page>
  );
}

function FamilyTwo() {
  return (
    <Page n={9} section="The family">
      <div className="stack">
        {family.photos.slice(1).map((p) => (
          <figure key={p.photo} className="fig fig--center family-more">
            <Photo name={p.photo} sizes="(max-width: 900px) 90vw, 40vw" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------------- 10–11. Style file */
function StyleOne() {
  return (
    <Page n={10} section="Style file">
      <Kicker>Fashion</Kicker>
      <h2 className="title title--italic">Style file</h2>
      <p className="lede">Fifty years of dressing for the occasion. A selection of looks from the family album.</p>
      <figure className="fig fig--center style-hero">
        <Photo name={style.hero.photo} sizes="(max-width: 900px) 90vw, 40vw" />
        <figcaption>
          <b className="look-num">Look 1</b> {style.hero.credit}
        </figcaption>
      </figure>
    </Page>
  );
}

function StyleTwo() {
  return (
    <Page n={11} section="Style file">
      <div className="looks">
        {style.looks.map((l, i) => (
          <figure key={l.photo} className="look">
            <div className="look-photo">
              <Photo name={l.photo} sizes="(max-width: 900px) 45vw, 20vw" />
            </div>
            <figcaption>
              <b className="look-num">Look {i + 2}</b> {l.credit}
            </figcaption>
          </figure>
        ))}
        <div className="look look--note">
          <Diamond />
          <p>Next: the travel desk.</p>
        </div>
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------------- 12–13. Travel */
function TravelOne() {
  const [a, b] = travel.stops;
  return (
    <Page n={12} tone="indigo" section="Travel desk">
      <Kicker>Travel desk</Kicker>
      <h2 className="title title--italic">Travel desk</h2>
      {[a, b].map((s) => (
        <figure key={s.photo} className="fig fig--center stop">
          <Photo name={s.photo} sizes="(max-width: 900px) 90vw, 40vw" />
          <figcaption>
            <span className="stop-place">{s.place}</span> {s.note}
          </figcaption>
        </figure>
      ))}
    </Page>
  );
}

function TravelTwo() {
  return (
    <Page n={13} tone="indigo" section="Travel desk">
      <div className="pair">
        {travel.stops.slice(2).map((s) => (
          <figure key={s.photo} className="fig stop stop--tall">
            <Photo name={s.photo} sizes="(max-width: 900px) 45vw, 20vw" />
            <figcaption>
              <span className="stop-place">{s.place}</span> {s.note}
            </figcaption>
          </figure>
        ))}
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------------- 14–15. Seen and snapped */
function Snap({ p, className = "" }) {
  return (
    <figure className={`snap ${p.back ? "snap--flip" : ""} ${className}`}>
      <div className="snap-inner">
        <div className="snap-front">
          <Photo name={p.photo} sizes="(max-width: 900px) 70vw, 30vw" />
          <figcaption>{p.caption}</figcaption>
        </div>
        {p.back && <p className="snap-back">{p.back}</p>}
      </div>
      {p.back && (
        <button type="button" className="flip-btn" data-flip-print>
          Turn over
        </button>
      )}
    </figure>
  );
}

function SnappedOne() {
  const [a, b] = snapped.photos;
  return (
    <Page n={14} section="Seen and snapped">
      <Kicker>Society pages</Kicker>
      <h2 className="title">Seen and snapped</h2>
      <p className="lede">{snapped.intro}</p>
      <div className="snaps snaps--one">
        <Snap p={a} className="snap--a" />
        <Snap p={b} className="snap--b" />
      </div>
    </Page>
  );
}

function SnappedTwo() {
  const [, , c, d, e] = snapped.photos;
  return (
    <Page n={15} section="Seen and snapped">
      <div className="snaps snaps--two">
        <Snap p={c} className="snap--c" />
        <div className="snaps-col">
          <Snap p={d} className="snap--d" />
          <Snap p={e} className="snap--e" />
        </div>
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------------- 16–19. Mom's letter */
function WifeOne() {
  return (
    <Page n={16} tone="ivory" section="A letter from Mom">
      <p className="wife-kicker">{wife.kicker}</p>
      <h2 className="title title--center">{wife.greeting}</h2>
      <p className="wife-to">{wife.to}</p>
      <div className="wife-photos">
        {wife.photos.map((p, i) => (
          <figure key={p.photo} className={`print print--light print--${i + 1}`}>
            <Photo name={p.photo} sizes="(max-width: 900px) 40vw, 18vw" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
      <blockquote className="prayer">
        <p className="prayer-text">{wife.prayer}</p>
        <p className="prayer-meaning">{wife.prayerMeaning}</p>
      </blockquote>
    </Page>
  );
}

function WifeTwo() {
  return (
    <Page n={17} tone="ivory" section="A letter from Mom">
      <div className="body">
        {wife.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "dropcap" : undefined}>{p}</p>
        ))}
      </div>
      <Continued />
    </Page>
  );
}

function WifeThree() {
  return (
    <Page n={18} tone="ivory" section="A letter from Mom">
      <div className="body">
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
    </Page>
  );
}

function WifeFour() {
  return (
    <Page n={19} tone="ivory" section="A letter from Mom">
      <div className="body">
        {wife.closingParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <footer className="wife-close">
        <p className="wife-signoff">{wife.signoff}</p>
        <p className="wife-finale">{wife.finale}</p>
        <p className="wife-grateful">{wife.grateful}</p>
        <p className="wife-motto">
          50 years of {wife.motto.join(", ").toLowerCase()}.
        </p>
        <Diamond className="diamond--small" />
        <p className="wife-sparkle">{wife.sparkle}</p>
      </footer>
    </Page>
  );
}

/* ---------------------------------------------------------------- 20. Back cover */
function BackCover() {
  return (
    <Page n={20} tone="back" hard folio={false}>
      <div className="back">
        <p className="back-fifty" aria-hidden="true">50</p>
        <h2 className="back-headline">{backCover.headline}</h2>
        <p className="back-line">{backCover.line}</p>
        <Diamond className="diamond--light" />
        <p className="back-from">With love, {issue.from}</p>
        <p className="back-closing">{backCover.closing}</p>
      </div>
    </Page>
  );
}

// Every page of the magazine, in order.
export default function Pages() {
  return (
    <>
      <Cover />
      <Contents />
      <ProfileOpener />
      <Traits />
      <Archives />
      <PortfolioOne />
      <PortfolioTwo />
      <FamilyOne />
      <FamilyTwo />
      <StyleOne />
      <StyleTwo />
      <TravelOne />
      <TravelTwo />
      <SnappedOne />
      <SnappedTwo />
      <WifeOne />
      <WifeTwo />
      <WifeThree />
      <WifeFour />
      <BackCover />
    </>
  );
}
