import photos from "@/data/photos.json";

// A whole photo, never cropped. Its size on the page is set in CSS (max-width / max-height),
// and it keeps its own shape inside those limits.
export default function Photo({ name, sizes = "(max-width: 900px) 90vw, 40vw", className = "", priority = false, alt }) {
  const p = photos[name];
  if (!p) return null;
  const srcSet = p.widths.map((w) => `/photos/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = `/photos/${name}-${p.widths[Math.min(1, p.widths.length - 1)]}.webp`;
  return (
    <img
      className={`ph ${className}`}
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt ?? p.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );
}
