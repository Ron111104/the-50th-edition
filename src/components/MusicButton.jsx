export default function MusicButton({ playing, onToggle, title }) {
  return (
    <button className={`music ${playing ? "is-playing" : ""}`} onClick={onToggle} aria-pressed={playing}>
      <span className="music-bars" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span>{playing ? `Pause ${title}` : `Play ${title}`}</span>
    </button>
  );
}
