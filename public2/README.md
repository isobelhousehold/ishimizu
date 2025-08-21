
# Ishimizu website (ishimizu.be)

This is a lightweight static site ready to deploy on any host (Netlify, Vercel, GitHub Pages, Apache/Nginx).

## Structure

```
/ (root)
  index.html        # Home + carousel
  models.html       # 3 models + product variants rendered from JSON
  stones.html       # Stones and characteristics (belief-based copy)
  story.html        # Brand story, inspiration, contact
  site.webmanifest  # PWA meta
  robots.txt
  sitemap.xml
  /assets
    /css/styles.css
    /js/main.js
    /data/products.json
    /data/stones.json
    /images            # Place lifestyle, product, logo files here
  /favicons            # (optional) place favicon files here if not at root
```

> Tip: Place favicons (`favicon.ico`, `favicon-32x32.png`, `android-chrome-*.png`, `apple-touch-icon.png`) at the **site root** as referenced in the HTML `<head>`. If you keep them in `/favicons`, update the paths accordingly.

## Assets
Put your files from the gofile link into these folders:

- Logos: `assets/images/logo.svg` (or PNG)
- Lifestyle carousel: `assets/images/hero/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
- Model images: `assets/images/models/heiwa.jpg`, `kanjo.jpg`, `hogo.jpg`
- Product packshots: `assets/images/products/<reference-lowercase>.jpg` (e.g. `hei wa050s-g11.jpg` without spaces)
- Stones visuals: `assets/images/stones/<stone-name>.jpg` (lowercase, hyphenated)

## Data
Products are defined in `assets/data/products.json` (generated from your CSV). If you update the CSV, keep the same columns and regenerate the JSON.

### Data note
One CSV row appears inconsistent: `KANJO045S-T08` description mentions *lapis lazuli* but stone fields indicate *Citrine* (yellow). Please verify and edit `products.json` accordingly.

## Development
No build step is required. Edit HTML/CSS/JS directly.

- Update CSS color variables at the top of `assets/css/styles.css` with your brand color chart.
- Replace imagery paths as needed.

## Accessibility & SEO
- Semantic HTML, alt text placeholders, and keyboard-safe carousel.
- Basic Open Graph and Twitter card meta.
- `sitemap.xml` and `robots.txt` included.

## Disclaimer
We keep gemstone language belief-based and non-medical. Feel free to adjust text on `stones.html` to match your brand voice.
