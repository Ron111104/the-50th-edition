import Page from "./Page";
import Photo from "./Photo";
import { travel } from "@/data/content";

export default function Travel() {
  const [first, ...rest] = travel.stops;
  return (
    <Page id="travel" title="Travel desk" tone="indigo">
      <div className="travel">
        <h2 className="display travel-title">Travel desk</h2>
        <figure className="stop stop--lead">
          <Photo name={first.photo} sizes="(max-width: 760px) 100vw, 70vw" />
          <figcaption>
            <span className="stop-place">{first.place}</span>
            <span className="stop-note">{first.note}</span>
          </figcaption>
        </figure>
        {rest.map((s, i) => (
          <figure key={s.photo} className={`stop stop--${i + 2}`}>
            <Photo name={s.photo} sizes="(max-width: 760px) 100vw, 30vw" />
            <figcaption>
              <span className="stop-place">{s.place}</span>
              <span className="stop-note">{s.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Page>
  );
}
