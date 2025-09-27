# Any Brew - Goonies-Inspired Landing Page

A cinematic, adventure-themed landing page for Roast Portal's Any Brew coffee product, inspired by The Goonies website design.

## 🎬 Design Inspiration

This site draws inspiration from [The Goonies website](https://the-goonies.webflow.io/#plot/?utm_source=chatgpt.com) with its:

- **Dark, cinematic color scheme** with gold accents
- **Adventure-themed typography** using Orbitron display font
- **Character-driven sections** featuring the coffee expert "crew"
- **Interactive elements** with hover effects and animations
- **Treasure hunt aesthetic** with glowing effects and particle animations

## 🚀 Features

### Visual Design
- **Dark Theme**: Deep blacks and grays with gold treasure accents
- **Cinematic Typography**: Orbitron for headings, Inter for body text
- **Adventure Color Palette**: Gold (#FFD700), saddle brown, dark slate gray
- **Particle Effects**: Floating gold particles in the hero section
- **Glowing Elements**: Treasure-gold glow effects on interactive elements

### Interactive Elements
- **Animated Navigation**: Smooth scroll effects and hover states
- **Adventure Cards**: Interactive coffee type selection with hover animations
- **Crew Members**: Character-style profiles with overlay details
- **Modal System**: Detailed information popups for adventures and crew
- **Scroll Animations**: Elements animate in as they enter the viewport
- **Parallax Effects**: Subtle background movement on scroll

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets and smooth interactions
- **Performance Optimized**: Efficient animations and lazy loading

## 📁 File Structure

```
any-brew-goonies/
├── index.html              # Main HTML file
├── css/
│   ├── base.css           # Base styles and CSS variables
│   ├── components.css     # Component-specific styles
│   ├── layout.css         # Layout and section styles
│   └── motion.css         # Animations and motion effects
├── js/
│   ├── app.js            # Main application logic
│   └── motion.js         # Animation and motion controller
├── assets/
│   └── img/
│       └── favicon.png   # Site favicon
└── README.md             # This file
```

## 🎨 Design System

### Colors
- **Primary Gold**: #FFD700 (treasure gold)
- **Secondary Gold**: #FFA500 (darker gold)
- **Background Dark**: #000000 (pure black)
- **Background Medium**: #1A1A1A (dark gray)
- **Background Light**: #2A2A2A (medium gray)
- **Text Light**: #F5F5DC (beige/parchment)
- **Text Muted**: #A9A9A9 (muted gray)

### Typography
- **Display Font**: Orbitron (headings, buttons, UI elements)
- **Body Font**: Inter (paragraphs, descriptions)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Animations
- **Treasure Glow**: Pulsing gold glow effect
- **Portal Spin**: Rotating portal rings
- **Float Up**: Elements floating up on scroll
- **Slide In**: Left/right slide animations
- **Scale In**: Zoom-in entrance animations

## 🛠️ Technical Features

### CSS
- **CSS Custom Properties**: Centralized color and spacing system
- **Grid Layout**: Modern CSS Grid for responsive layouts
- **Flexbox**: Flexible component layouts
- **Backdrop Filter**: Glass-morphism effects
- **CSS Animations**: Smooth, performant animations

### JavaScript
- **ES6 Classes**: Modern JavaScript architecture
- **Intersection Observer**: Efficient scroll-triggered animations
- **Event Delegation**: Optimized event handling
- **Modal System**: Accessible modal dialogs
- **Particle System**: Dynamic particle effects

### Performance
- **Reduced Motion**: Respects user accessibility preferences
- **GPU Acceleration**: Hardware-accelerated animations
- **Lazy Loading**: Images and content loaded on demand
- **Debounced Events**: Optimized scroll and resize handlers

## 🎯 Key Sections

### Hero Section
- **Cinematic Background**: Dark gradient with particle effects
- **Adventure Badge**: "Coffee Never Says Die" tagline
- **Large Typography**: Bold, impactful headlines
- **Call-to-Action**: Prominent adventure buttons

### Adventure Section
- **Coffee Types**: Hot, Iced, Latte, Any Drink cards
- **Interactive Hover**: Color-coded hover effects
- **Adaptation Story**: Personalization explanation

### Crew Section
- **Character Profiles**: Coffee experts as adventure characters
- **Hover Overlays**: Detailed information on hover
- **Mission Statement**: Company values and goals

### Testimonials
- **Customer Reviews**: Real feedback from coffee lovers
- **Star Ratings**: Visual rating system
- **Card Layout**: Clean, readable testimonial cards

### Final CTA
- **Portal Effect**: Animated portal rings
- **Adventure Theme**: "Begin Your Coffee Adventure"
- **Strong Call-to-Action**: Clear subscription prompt

## 🚀 Getting Started

1. **Open the site**: Navigate to `index.html` in a web browser
2. **Explore interactions**: Hover over cards and buttons
3. **Scroll animations**: Watch elements animate as you scroll
4. **Mobile testing**: Test on various screen sizes

## 🎨 Customization

### Colors
Update CSS custom properties in `base.css`:
```css
:root {
  --treasure-gold: #FFD700;
  --cave-dark: #2F4F4F;
  --parchment: #F5F5DC;
}
```

### Typography
Change fonts in `base.css`:
```css
:root {
  --font-family-display: 'Your-Font', sans-serif;
  --font-family: 'Your-Body-Font', sans-serif;
}
```

### Animations
Modify animation timing in `motion.css`:
```css
.btn--primary {
  animation: treasureGlow 2s ease-in-out infinite;
}
```

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **CSS Grid**: Full support for modern layout features
- **CSS Custom Properties**: Full support for CSS variables
- **Intersection Observer**: Full support for scroll animations

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **High Contrast**: Supports high contrast mode
- **Focus Indicators**: Clear focus states for all interactive elements

## 🎬 Inspiration Credits

- **The Goonies Website**: [the-goonies.webflow.io](https://the-goonies.webflow.io/#plot/?utm_source=chatgpt.com)
- **Adventure Theme**: Treasure hunting and exploration aesthetics
- **Character Design**: Goonies-inspired crew member profiles
- **Cinematic Effects**: Movie-like visual treatments

---

**Built with ❤️ for coffee adventurers everywhere!**
