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

- **Words:** all text is in `src/data/content.js`. Section order follows the
  `contents` list; page numbers update themselves.
- **Photos:** drop the image into `/photos`, add a line for it in
  `photos/meta.json` (where to crop and a short description), then run
  `npm run photos`. Use the photo's file name (without `.jpg`) anywhere in
  `content.js`.
- **Colours and type:** at the top of `src/app/globals.css`.

## Structure

```
photos/                 originals + meta.json (crop focus, descriptions)
scripts/process-photos.mjs  makes 480/960/1600px WebP files + blur previews
public/photos/          generated images (don't edit by hand)
public/audio/           the song goes here
src/data/content.js     every word on the site
src/data/photos.json    generated photo list
src/components/         one file per magazine section
src/app/globals.css     all styling
```
