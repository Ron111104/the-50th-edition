# Mukesh: The 50th Edition

A one-off magazine website for Dad's 50th birthday (15 November 2026).
Next.js (JavaScript), GSAP, Lenis. Fully static: no backend, no database.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in /out
```

## Put it online (Vercel, about 2 minutes)

```bash
npx vercel --prod
```

Log in when asked, accept the defaults, and it prints a public link.
Or push this folder to GitHub and import it at vercel.com/new (framework: Next.js).

## Before you share it

1. **Your letter.** Open `src/data/content.js` and replace the two
   placeholder paragraphs in `letter.paragraphs`.
2. **The song.** Save the MP3 as `public/audio/phir-se-ud-chala.mp3`.
   The music button appears by itself once the file is there, and the song
   starts when he taps "Open the issue". (Browsers only allow sound after a tap.)

## Change anything

- **Words:** all text is in `src/data/content.js`.
- **Pages:** the magazine is 20 pages, laid out in `src/components/book/Pages.jsx`
  (one small component per page). Page numbers in the contents and on the cover
  lines are set in `content.js`; keep them in step if you add or move pages.
  Keep the total page count even (cover + inside pages + back cover).
- **Photos:** drop the image into `/photos`, add a line for it in
  `photos/meta.json`, then run `npm run photos`. Photos are always shown whole,
  never cropped; their size on a page is set in `src/app/globals.css`.
- **Cover cutout:** `photos/cutouts/yellow-kurta-people.png` is the people cut out
  of the cover photo, so the title can sit behind their heads. If you change the
  cover photo, make a new cutout with the same size as the photo.
- **Songs:** listed in `issue.playlist` in `content.js`; files go in `public/audio/`.
- **Colours and type:** at the top of `src/app/globals.css`. One typeface,
  Source Serif 4, is used everywhere.

## How it works

The magazine is a flip-book (the `page-flip` library). On wide screens it shows
two pages side by side; on phones and upright tablets, one page at a time. Every
size inside a page is relative to the page, so it looks the same on any screen.

```
photos/                      originals, meta.json, cutouts/
scripts/process-photos.mjs   makes 480/960/1600px WebP files
public/photos/               generated images
public/audio/                the songs
src/data/content.js          every word on the site
src/components/Book.jsx      the flip-book, controls and music
src/components/book/         the pages
src/app/globals.css          all styling
```
