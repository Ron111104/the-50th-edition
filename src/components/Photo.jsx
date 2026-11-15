import photos from "@/data/photos.json";

// Responsive, lazy-loaded photo with a blurred placeholder.
// `sizes` tells the browser how wide the photo renders so it picks the right file.
export default function Photo({ name, sizes = "(max-width: 760px) 100vw, 50vw", className = "", priority = false, alt }) {
  const p = photos[name];
  if (!p) return null;
  const srcSet = p.widths.map((w) => `/photos/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = `/photos/${name}-${p.widths[Math.min(1, p.widths.length - 1)]}.webp`;
  return (
    <span
      className={`photo ${className}`}
      style={{ backgroundImage: `url(${p.blur})`, aspectRatio: `${p.width} / ${p.height}` }}
    >
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        width={p.width}
        height={p.height}
        alt={alt ?? p.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </span>
  );
}
