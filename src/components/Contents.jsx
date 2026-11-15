import Page from "./Page";
import Photo from "./Photo";
import { contents, pageOf, issue } from "@/data/content";

export default function Contents({ onJump }) {
  return (
    <Page id="contents" title="Contents" pageNo="02">
      <div className="contents">
        <div className="contents-head">
          <h2 className="display">Contents</h2>
          <p className="contents-note">
            Issue {issue.number}, published {issue.date}, fifty years to the day after the first edition.
          </p>
        </div>
        <ol className="contents-list">
          {contents.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onJump(c.id);
                }}
              >
                <span className="contents-num">{pageOf(c.id)}</span>
                <span className="contents-text">
                  <span className="contents-title">{c.title}</span>
                  <span className="contents-deck">{c.deck}</span>
                </span>
                <Photo name={c.photo} className="contents-thumb" sizes="120px" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </Page>
  );
}
