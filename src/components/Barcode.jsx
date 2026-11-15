// A decorative magazine barcode, generated from text so it's always the same.
export default function Barcode({ text = "1976-2026", label, className = "" }) {
  const bars = [];
  let x = 0;
  const codes = [...text].map((c) => c.charCodeAt(0));
  for (let i = 0; i < 46; i++) {
    const n = codes[i % codes.length] * (i + 7);
    const w = 1 + (n % 3);
    if (i % 2 === 0) bars.push(<rect key={i} x={x} y="0" width={w} height={i % 11 === 0 ? 44 : 40} />);
    x += w + (n % 2);
  }
  return (
    <figure className={`barcode ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${x} 44`} preserveAspectRatio="none">{bars}</svg>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}
