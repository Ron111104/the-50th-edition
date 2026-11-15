import Page from "./Page";
import Photo from "./Photo";
import { style } from "@/data/content";

export default function StyleFile() {
  return (
    <Page id="style" title="Style file">
      <div className="style">
        <div className="style-head">
          <h2 className="style-title">Style file</h2>
          <p className="standfirst">Fifty years of dressing for the occasion. A selection of looks from the family album.</p>
        </div>
        <figure className="style-hero">
          <Photo name={style.hero.photo} sizes="(max-width: 760px) 100vw, 50vw" focus="52% 40%" />
          <figcaption>
            <span className="look-num">Look 1</span>
            {style.hero.credit}
          </figcaption>
        </figure>
        <div className="style-side">
          <div className="looks">
            {style.looks.map((l, i) => (
              <figure key={l.photo} className="look">
                <Photo name={l.photo} sizes="(max-width: 760px) 50vw, 22vw" />
                <figcaption>
                  <span className="look-num">Look {i + 2}</span>
                  {l.credit}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
