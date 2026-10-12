# FOR MY SANA ❤️ — A Birthday Surprise From Johnny

A luxury, romantic, mobile-first birthday website crafted with love for **Sana** from **Johnny**, celebrating their bond across **Sierra Leone 🇸🇱 and Pakistan 🇵🇰**.

---

## 🌟 Features Included

1. **Opening Surprise Gate**: “Sana, I made something special just for you ❤️” with interactive “Open Your Surprise” button and romantic fanfare.
2. **Birthday Reveal**:
   - Sana's real portrait with glowing neon-pink/purple lighting, gold filigree trim, and floating romantic sparkles.
   - Interactive birthday cake with realistic candles: tap individual candles or tap "Blow Out All Candles & Make a Wish" to blow them out with realistic smoke animations, celebratory chime arpeggios, and confetti showers.
   - Working "Relight Candles 🕯️" button.
3. **Heartfelt Love Letter**:
   - Sincere and vulnerable apology from Johnny for forgetting her birthday.
   - Deep, heartfelt Islamic prayers (du'as) asking Allah (SWT) to bless Sana with unending happiness, radiant health, peace (Sakina), barakah, and success in Dunya and Akhirah.
   - "Save Letter" button to copy the letter text.
4. **Long-Distance Love (Sierra Leone 🇸🇱 ❤️ 🇵🇰 Pakistan)**:
   - Freetown (GMT) & Pakistan (PKT) dual live clocks.
   - Distance visualizer celebrating the 7,500+ km connection with 0 mm distance between hearts.
   - Interactive "Send Love Signal" button with celebratory confetti and sound chimes.
5. **Memories Gallery**:
   - Preserves Sana's real face, natural skin tone, and photos (`IMG-20261011-WA0054.jpg`, `IMG-20261011-WA0050.jpg`, `IMG-20261011-WA0049.jpg`, and the video clip).
   - Lightbox view for mobile and desktop with heart reaction counters.
   - Built-in photo customizer for Johnny to swap or upload new camera photos directly.
6. **Final Surprise**:
   - "Reveal Johnny's Final Surprise 💝" button.
   - 3D animated beating heart with Johnny's 6 unbreakable promises to Sana.
7. **Replay Experience**:
   - Seamless replay button to experience the surprise again from the beginning.
8. **Romantic Music**:
   - Custom Web Audio API synthesizer playing a tender, soothing music-box / piano melody of "Happy Birthday".
   - Zero external audio dependencies (works 100% offline and on Android mobile browsers without buffering).
   - Option to upload an MP3 of their personal favorite song.

---

## 📂 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages deployment workflow
├── public/
│   └── images/
│       ├── IMG-20261011-WA0054.jpg   # Portrait photo asset
│       ├── IMG-20261011-WA0050.jpg   # Eyes & modesty photo asset
│       └── IMG-20261011-WA0049.jpg   # Mehndi & grace photo asset
├── src/
│   ├── components/
│   │   ├── AudioPlayer.tsx           # Floating romantic soundtrack controls
│   │   ├── BirthdayReveal.tsx        # Portrait, cake & candles, confetti
│   │   ├── DeploymentGuideModal.tsx  # Interactive GitHub guide modal
│   │   ├── FinalSurpriseModal.tsx    # Beating heart & Johnny's 6 promises
│   │   ├── FloatingPetalsCanvas.tsx  # Rose petals & golden stardust engine
│   │   ├── HeroGate.tsx              # Opening envelope & surprise reveal
│   │   ├── LongDistanceSection.tsx   # Sierra Leone 🇸🇱 to Pakistan 🇵🇰
│   │   ├── LoveLetter.tsx            # Johnny's letter, apology & du'as
│   │   ├── MemoriesGallery.tsx       # Photo gallery & lightbox
│   │   ├── PhotoManagerModal.tsx     # Photo asset switcher & device upload
│   │   ├── ReplayControl.tsx         # Restart experience & footer
│   │   └── RomanticHeader.tsx        # Top navigation & quick actions
│   ├── utils/
│   │   └── romanticAudio.ts          # Web Audio API romantic melody engine
│   ├── App.tsx                       # Main application coordinator
│   ├── index.css                     # Tailwind CSS & keyframe animations
│   └── main.tsx                      # React root
├── index.html                        # App title, fonts & meta tags
├── package.json                      # Dependencies & build scripts
├── tsconfig.json                     # TypeScript configuration
└── vite.config.ts                    # Vite build configuration (base: './')
```

---

## 🚀 How to Deploy to GitHub Pages (Step-by-Step)

### Step 1: Push the Code to your GitHub Repository

Run these commands in your terminal:

```bash
# Initialize git and stage all files
git init
git add .
git commit -m "feat: romantic birthday surprise for Sana ❤️"

# Rename default branch to main
git branch -M main

# Link to your GitHub repository
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push code to GitHub
git push -u origin main
```

*(Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name).*

### Step 2: Confirm Sana's Photos in `public/images/`

The project references the 3 images in `public/images/`:
- `public/images/IMG-20261011-WA0054.jpg`
- `public/images/IMG-20261011-WA0050.jpg`
- `public/images/IMG-20261011-WA0049.jpg`

Ensure your original high-resolution photos are saved in that directory before or after pushing.

### Step 3: Enable GitHub Pages in Repository Settings

1. Open your repository on **GitHub.com**.
2. Go to **Settings** > **Pages** (on the left menu).
3. Under **Build and deployment** > **Source**, choose **GitHub Actions** (NOT "Deploy from a branch").
4. That's it! GitHub will automatically trigger the workflow configured in `.github/workflows/deploy.yml`.

### Step 4: Monitor the Deployment

1. Click on the **Actions** tab at the top of your GitHub repository.
2. You will see the workflow titled **"Deploy Romantic Birthday Surprise to GitHub Pages"** running.
3. Once the workflow turns green (completed), click on it or return to **Settings > Pages** to view the live public URL:

```text
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
```

Send this link to Sana on WhatsApp! It is mobile-first, optimized for Android smartphones, and has smooth touch targets and animations.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```
