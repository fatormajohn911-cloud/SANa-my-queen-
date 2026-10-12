# FOR MY SANA ❤️ — A Birthday Surprise From Johnny Abdullah

A luxury, romantic, mobile-first birthday website crafted with love for **Sana** from **Johnny Abdullah (Abdullah)**, celebrating their bond across **Sierra Leone 🇸🇱 and Pakistan 🇵🇰**.

---

## 🌟 Highlights

1. **Opening Surprise Gate**: “Sana, I made something special just for you ❤️” with interactive “Open Your Surprise” button and celebratory confetti.
2. **Cinematographic Birthday Reveal**:
   - Sana's real portrait with 35mm cinematographic framing, anamorphic lens flares, vignette optics, and an interactive **Fullscreen Theatrical Cinema Screening Mode**.
   - Realistic animated birthday cake with interactive candles that Sana can tap to blow out with smoke animations, celebratory fanfare, and confetti showers.
   - Working "Relight Candles 🕯️" button.
3. **Heartfelt Love Letters from Johnny Abdullah**:
   - Sincere and vulnerable apology from Johnny Abdullah (Abdullah) for forgetting her birthday.
   - 5 sacred Islamic du'as asking Allah (SWT) to bless Sana with unending happiness, radiant health, Sakina (peace), barakah, and success in Dunya and Akhirah.
   - Interactive love buttons: "Bloom Rose 🌹", "Release Hearts 💕", and "Secret Whisper 💌".
4. **Long-Distance Love (Sierra Leone 🇸🇱 ❤️ 🇵🇰 Pakistan)**:
   - Dual live clocks for Freetown (GMT) & Pakistan (PKT).
   - Celestial 7,500 km animated light trail visualizer bridging the continents with 0 mm distance between hearts.
   - Solemn vow: *“Miles may separate us, but you will always have a special place in my heart.”*
5. **Cinematographic Memories Gallery**:
   - 35mm Panavision and Royal Cinema film-slate cards preserving Sana's real photos (`IMG-20261011-WA0054.jpg`, `IMG-20261011-WA0050.jpg`, `IMG-20261011-WA0049.jpg`, and the video clip).
   - Full Theatrical Lightbox with **Previous (◀) & Next (▶) cinematic navigation**, film counter (`SCENE 1 OF 3`), poetic movie quotes, and heart reaction counters.
6. **The Final Surprise**:
   - "Reveal Johnny Abdullah's Final Surprise 💝" button.
   - 3D animated beating heart with Johnny Abdullah's 6 unbreakable promises to Sana.
7. **Phone Hardware Volume Controls**:
   - Clean, uninterrupted screen without floating speaker icons or volume sliders.
   - Sound level is comfortably controlled using your physical phone volume buttons.
   - Seamless transition: Track 1 (Happy Birthday) -> 1-minute intermission -> Track 2 (Johnny Abdullah's romantic song).
8. **Replay Surprise**:
   - Smooth scroll to top to replay the celebration anytime.

---

## 🚀 Why GitHub Deployment Failed & How It Is Now Fixed

If your deployment failed when transferring code to GitHub, here is why and how it's fixed:

1. **Peer Dependency Conflict Resolved**:
   - An outdated `esbuild` dependency was conflicting with `vite 8`, causing GitHub's `npm install` step to abort with `ERESOLVE could not resolve`.
   - **Fix Applied**: Removed conflicting `esbuild` package and added `.npmrc` with `legacy-peer-deps=true`.

2. **GitHub Actions Workflow Updated**:
   - `.github/workflows/deploy.yml` has been updated with `npm install --legacy-peer-deps` so every build on GitHub runners executes cleanly.

3. **Required One-Time GitHub Setting**:
   - In your GitHub repo: Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, make sure **GitHub Actions** is selected (NOT "Deploy from a branch").
   - If you prefer deploying directly from your computer, you can also run:
     ```bash
     npm run deploy
     ```
     This automatically builds the project and publishes it to the `gh-pages` branch!

---

## 🎵 How to Add Your Music Files to GitHub

Place your audio files in `public/audio/`:
- `public/audio/birthday-song.mp3` — Song 1: Happy Birthday track
- `public/audio/romantic-song.mp3` — Song 2: Johnny Abdullah's background romantic track

If no files are added yet, the built-in romantic music-box synthesizer plays seamlessly!

---

## 📸 Sana's Original Photos

Sana's photos are in `public/images/`:
- `public/images/IMG-20261011-WA0054.jpg`
- `public/images/IMG-20261011-WA0050.jpg`
- `public/images/IMG-20261011-WA0049.jpg`

---

## 💻 Local Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build production bundle
npm run build

# Deploy to GitHub Pages (optional 1-click alternative)
npm run deploy
```
