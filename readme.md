cat > /home/claude/valentine/README.md << 'EOF'
# 💖 Valentine Proposal Website

A cute, animated, fully customizable Valentine's proposal website. Deploy in minutes — no coding required.

## 🚀 Quick Start

1. **Customize** — Open `config.js` and edit the values (names, message, colors, date locations).
2. **Deploy** — Upload the folder to Netlify, Vercel, or GitHub Pages.
3. **Share** — Send the link to your special someone 💌

## 📁 File Structure

```
valentine/
├── index.html     → Page structure (no edits needed)
├── style.css      → All styles (no edits needed)
├── script.js      → All interactions (no edits needed)
├── config.js      → ✅ YOUR CUSTOMIZATION FILE
├── music.mp3      → (optional) Drop your audio file here
└── README.md      → This file
```

## ⚙️ config.js Reference

| Key | Description | Example |
|-----|-------------|---------|
| `partnerName` | Your partner's name | `"Emma"` |
| `yourName` | Your name | `"James"` |
| `customMessage` | Romantic message | `"You make my world..."` |
| `dateLocations` | Array of date spots (one picked randomly) | `["Paris 🗼", "Beach 🌅"]` |
| `themeColor` | Primary accent color | `"#ff6b9d"` |
| `themeColorAlt` | Secondary accent color | `"#ff9ec4"` |
| `backgroundGradient` | CSS gradient for background | `"linear-gradient(...)"` |
| `musicEnabled` | Show music toggle? | `true` / `false` |
| `musicFile` | Path to MP3 file | `"music.mp3"` |
| `floatingHeartsCount` | Hearts in background (10–60) | `28` |

## 🎵 Adding Music

1. Drop any `.mp3` file into the project folder
2. In `config.js`, set `musicFile: "yourfile.mp3"`
3. Set `musicEnabled: true`

## 🌐 Deployment

### Netlify (easiest)
Drag and drop the entire folder onto [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages
1. Push folder to a GitHub repository
2. Go to Settings → Pages → Source: main branch / root

### Vercel
```bash
npx vercel
```

## 💡 Tips

- Use `{partnerName}` and `{yourName}` in `customMessage` as placeholders — they're auto-replaced.
- The NO button gets harder to click the more times it's dodged 😄
- Works great on mobile — fully responsive!

---
Made with 💖 By Divyam Goyal!