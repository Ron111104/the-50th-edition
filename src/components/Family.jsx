import Page from "./Page";
import Photo from "./Photo";
import { family } from "@/data/content";

export default function Family() {
  const [lead, ...rest] = family.photos;
  return (
    <Page id="family" title="The family">
      <div className="family">
        <div className="family-head">
          <h2 className="display">The family</h2>
          <p className="standfirst">{family.standfirst}</p>
        </div>
        <figure className="family-lead">
          <Photo name={lead.photo} sizes="(max-width: 760px) 100vw, 90vw" />
          <figcaption>{lead.caption}</figcaption>
        </figure>
        {rest.map((p) => (
          <figure key={p.photo} className="family-more">
            <Photo name={p.photo} sizes="(max-width: 760px) 100vw, 45vw" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Page>
  );
}
