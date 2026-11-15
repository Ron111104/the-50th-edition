import Page from "./Page";
import Photo from "./Photo";
import { letter } from "@/data/content";

export default function Letter() {
  return (
    <Page id="letter" title="Editor's letter">
      <div className="letter">
        <figure className="letter-figure">
          <Photo name={letter.photo} sizes="(max-width: 760px) 100vw, 40vw" />
          <figcaption>{letter.caption}</figcaption>
        </figure>
        <div className="letter-body">
          <h2 className="display">Editor's letter</h2>
          {letter.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "dropcap" : undefined}>{p}</p>
          ))}
          <p className="signature">{letter.signoff}</p>
          <p className="signature-role">Editor, and son</p>
        </div>
      </div>
    </Page>
  );
}
