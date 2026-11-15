import Page from "./Page";
import Photo from "./Photo";
import { profile } from "@/data/content";

export default function Profile() {
  return (
    <Page id="profile" title="Profile">
      <div className="profile">
        <div className="profile-open">
          <h2 className="profile-headline">{profile.headline}</h2>
          <Photo name={profile.photo} className="profile-portrait" sizes="(max-width: 760px) 100vw, 55vw" />
          <p className="standfirst">{profile.standfirst}</p>
        </div>
        <ol className="traits">
          {profile.traits.map((t) => (
            <li key={t.word} className="trait">
              <Photo name={t.photo} className="trait-photo" sizes="(max-width: 760px) 100vw, 30vw" />
              <h3 className="trait-word">{t.word}</h3>
              <p>{t.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </Page>
  );
}
