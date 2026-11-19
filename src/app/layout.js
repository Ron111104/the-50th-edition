import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource-variable/source-serif-4/opsz-italic.css";
import "./globals.css";

export const metadata = {
  title: "Mukesh: The 50th Edition",
  description: "A one-off magazine for Mukesh's 50th birthday, 15 November 2026.",
  openGraph: {
    title: "Mukesh: The 50th Edition",
    description: "A one-off magazine for Dad's 50th birthday.",
    images: ["/photos/yellow-kurta-960.webp"],
  },
};

export const viewport = {
  themeColor: "#7d1626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
