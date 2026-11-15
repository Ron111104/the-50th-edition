export default function MusicButton({ playing, onToggle, title }) {
  return (
    <button
      className={`music ${playing ? "is-playing" : ""}`}
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? `Pause ${title}` : `Play ${title}`}
    >
      <svg className="music-icon" viewBox="0 0 24 24" aria-hidden="true">
        {playing ? (
          <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
        ) : (
          <path d="M9 18.5a2.5 2.5 0 1 1-1.5-2.3V5.5l11-2.5v12.5a2.5 2.5 0 1 1-1.5-2.3V7.4L9 9.2z" />
        )}
      </svg>
      <span className="music-bars" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span className="music-label">{title}</span>
    </button>
  );
}
