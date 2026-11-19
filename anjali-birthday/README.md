# A Little Universe Called Anjali ❤️

A cinematic, mobile-first birthday surprise website, made for Anjali's birthday on November 19.
It's built with React and Vite, uses only CSS and canvas for its animations, and has no backend, no login and no environment variables.

---

## 1. Download and extract

1. Download `anjali-birthday.zip`.
2. Double-click it (Mac) or right-click it and choose **Extract All** (Windows).
3. You'll get a folder called `anjali-birthday`.

## 2. Run it on your computer (optional)

You need **Node.js 20.19 or newer**. Download the LTS version from https://nodejs.org.

Open a terminal inside the `anjali-birthday` folder and run:

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).
To test the iPhone layout in Chrome, press F12, click the phone icon and choose a 402 × 874 size.

To check that the production build works:

```bash
npm run build
npm run preview
```

## 3. Replace or add photos

All photos are in `public/images/`:

| File | Used for |
|---|---|
| `public/images/photo-01.webp` … `photo-09.webp` | Full-size photos in the lightbox |
| `public/images/thumbs/photo-01.webp` … | Smaller copies shown in the polaroid frames |

**To swap a photo:** put your new image in both folders using the **same file name**, replacing the old one.
The frames crop automatically, so any shape works.
If you want, `.jpg` files work too. Just change the names in `src/data/photos.js`.

**To add, remove or re-caption photos,** edit `src/data/photos.js`. Each line looks like this:

```js
{ file: 'photo-01.webp', alt: 'description for screen readers', caption: 'Grace in ivory', focus: '50% 22%' },
```

`focus` sets which part of the photo stays visible inside the frame: the first number is left/right and the second is top/bottom.
The finale portrait uses the first photo in the list.

Tip: for the best quality on iPhone, use photos about 1200 px wide, with thumbnails about 640 px wide.

## 4. Replace the background music

The music is off by default. It only starts when someone taps the **Music** button, which is what iPhone Safari requires.

The included track, `public/music/birthday-music-box.mp3`, is an original music-box arrangement of "Happy Birthday to You", which is in the public domain.

To use a different song:

1. Put an `.mp3` file in `public/music/`.
2. Either name it `birthday-music-box.mp3`, replacing the old file, or change the `TRACK` line at the top of `src/components/MusicToggle.jsx`.

Only use music you have the right to use. Commercial film songs are copyrighted.

## 5. Change any text

- Wishes and the letter are in `src/data/content.js`.
- Headings for each section are in the files in `src/sections/`.

## 6. Upload to GitHub

1. Create a free account at https://github.com and sign in.
2. Click **+**, then **New repository**. Name it `anjali-birthday`, choose **Private** if you like, and click **Create repository**.
3. On the next page, click **uploading an existing file**.
4. Open your extracted `anjali-birthday` folder, select **everything inside it** (`public`, `src`, `index.html`, `package.json`, and so on, but **not** a `node_modules` folder if you created one), and drag it onto the page.
5. Click **Commit changes**.

## 7. Deploy on Vercel

1. Go to https://vercel.com and choose **Sign up with GitHub**.
2. Click **Add New…**, then **Project**, and **Import** your `anjali-birthday` repository.
3. Vercel detects the settings automatically. Check that they are:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   - **Environment Variables:** none needed
4. Click **Deploy** and wait about a minute.
5. Click **Visit**, or copy the URL shown, for example `https://anjali-birthday.vercel.app`. That's the link to send her.

To change something later, edit or re-upload files on GitHub. Vercel redeploys automatically.
You can change the URL under **Project, Settings, Domains**.

> Note: anyone who has the link can open the site. A Vercel URL isn't listed publicly anywhere, but keep the link between you two.

---

## Project structure

```
anjali-birthday/
├── public/
│   ├── images/              gallery photos (+ thumbs/)
│   ├── music/               background music
│   ├── favicon.ico, favicon.png, apple-touch-icon.png
├── src/
│   ├── components/          Starfield, FloatingHearts, Lightbox, Cake, WishSky, MusicToggle, effects…
│   ├── sections/            Envelope, Hero, Celebration, Gallery, Wishes, Letter, Interactive, Finale
│   ├── data/                photos.js, content.js  ← easy-to-edit content
│   ├── assets/
│   ├── App.jsx, main.jsx, index.css
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## Technical notes

- **Animations:** pure CSS plus lightweight `<canvas>` effects for the stars, confetti, sparkles and fireworks. It uses no Framer Motion and no other heavy library, which keeps it fast on iPhone.
- **Icons:** a small inline SVG set, so there's no icon dependency.
- **Mobile first:** designed at 402 × 874, the iPhone 17 viewport. It respects the iPhone's screen edges (safe areas), uses `svh`/`dvh` viewport units and `clamp()` text sizes, and has 44 px+ tap targets, swipe gestures and no horizontal scrolling.
- **Performance:** gallery images are lazy-loaded WebP files in fixed-ratio frames, so the page doesn't jump while they load. Canvas effects run at about 30 fps and pause when off-screen.
- **Accessibility:** if her phone is set to reduce motion, the site still works fully but without movement. It also has keyboard support, with Esc and the arrow keys in the lightbox.
- **Fonts:** Cormorant Garamond, Great Vibes and Manrope load from Google Fonts. If they can't load, the iPhone's own elegant system fonts are used instead.
