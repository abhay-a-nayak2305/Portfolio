# ABH.dev Portfolio

A striking, neo-editorial portfolio website featuring brutalist aesthetics, asymmetric layouts, and cinematic motion design.

## 🎨 Aesthetic Direction

**Neo-Editorial Brutalism** — a bold fusion of raw industrial typography, asymmetric compositions, and precise modern interactions. Dark charcoal base paired with electric coral accents delivers a visceral, memorable experience.

## 📁 Project Structure

```
portfolio/
├── index.html       # Semantic HTML structure
├── styles.css       # Custom design system & animations
├── script.js        # Interactive behaviors
└── README.md        # Documentation
```

## ✨ Key Features

### Visual Design
- **Typography**: Clash Display (display) + DM Sans (body)
- **Color Palette**: Dark charcoal `#0a0a0a` with electric coral accent `#ff2e2e`
- **Custom Cursor**: Smooth-following dot with hover states
- **Noise Texture**: Subtle film grain overlay for depth
- **Geometric Decor**: Floating circles, angled lines, layered depth

### Animations & Motion
- Staggered reveal animations using Intersection Observer
- Character-by-character text reveal on hero
- Scroll-triggered section reveals
- Magnetic button hover effect
- Parallax on decorative elements
- Marquee footer text for energy

### Responsive & Accessible
- Mobile-first responsive design
- Mobile navigation menu with hamburger toggle
- Reduced motion support (`prefers-reduced-motion`)
- Focus-visible states for keyboard navigation
- Semantic HTML structure
- Skip-link ready for screen readers

### Sections
1. **Hero** — Large typography, entrance animations, CTA buttons
2. **About** — Skewed image frame, skill tags, bio text
3. **Work** — 4 project cards with unique background visuals, hover lift effect
4. **Contact** — Large email link, social links, animated underline
5. **Footer** — Status marquee animation

## 🚀 Getting Started

### View the Portfolio

Simply open `index.html` in a modern web browser:

```bash
# Using PowerShell
Start-Process .\index.html

# Or drag the file into your browser
```

### Development

This is a vanilla HTML/CSS/JS project — no build step required.
- Edit `styles.css` to change the design system
- Update `script.js` to modify interactions
- Modify content in `index.html`

#### Customization Checklist
- [ ] Update name/brand in navigation and hero title
- [ ] Replace placeholder project content with real work
- [ ] Update skill tags in About section
- [ ] Replace email with your contact address
- [ ] Add real social media links
- [ ] Customize color palette in `:root` variables

## 🎯 Design Tokens

Edit CSS custom properties in `styles.css`:

```css
:root {
    /* Colors */
    --color-bg: #0a0a0a;
    --color-accent: #ff2e2e;
    /* ... */
    
    /* Typography */
    --font-display: 'Clash Display', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    /* ... */
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Notes

- Custom hidden cursor ignored on mobile/touch devices
- Focus-visible styles for keyboard navigation
- Reduced motion media query respected
- Semantic headings and landmarks
- Skip-link anchor present in nav (add to HTML if needed)

## 📦 Dependencies

**External:**
- Google Fonts: Clash Display + DM Sans (loaded from fonts.googleapis.com)

No npm packages, frameworks, or build tools required.

## 📄 License

Free to use and modify for personal or commercial projects. Attribution appreciated but not required.

---

*Crafted with Brutalism. Powered by *not* cookie-cutter AI design.*
