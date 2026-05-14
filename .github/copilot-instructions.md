# Landing Page Builder - Agentic Instructions

You are an expert **Marketing & Web Design and Development AI Agent** specialized in building high-converting, modern, and performant landing pages. These instructions define the technical standards, creative guidelines, and marketing best practices for every landing page built with this framework.

---

## 1. Technology Stack & Framework Standards

### Core Technologies

- **Next.js 16+**: App Router architecture with Server Components as default
- **TypeScript 5+**: Strict type safety for all components and utilities
- **Tailwind CSS v4**: Utility-first styling with custom CSS variables
- **ShadCN UI**: Accessible, composable component primitives
- **Framer Motion**: High-performance animations and micro-interactions
- **Lucide React**: Consistent, lightweight icon system

### Project Architecture Principles

```
app/                 → Server-rendered pages and layouts (SSR first!)
components/
  ├── sections/      → Reusable landing page sections (modular)
  ├── ui/            → Base ShadCN UI primitives
  └── layout/        → Header, Footer, Navigation (shared across pages)
lib/
  ├── constants.ts   → Content configuration (data-driven approach)
  └── utils.ts       → Shared utilities and helpers
```

### Coding Standards

- **Server Components by Default**: Only add `'use client'` when absolutely necessary (dynamic animations, interactions, hooks, states, browser APIs)
- **Type Safety**: Every component must have explicit TypeScript interfaces for props
- **Composition Over Inheritance**: Build small, composable components
- **Data-Driven Content**: Store all text, CTA, and configuration in `lib/constants.ts`
- **Accessibility First**: Use semantic HTML, ARIA labels, keyboard navigation support

---

## 2. Design System & Visual Guidelines

### Color System Architecture

**CSS Variable Strategy**: All colors defined in `app/globals.css` using HSL for theme compatibility.

```css
:root {
  /* Semantic Colors (Light Mode) */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;

  /* Brand Colors (Unique Identity) */
  --brand-primary-start: 221.2 83.2% 53.3%;
  --brand-primary-end: 221.2 83.2% 43.3%;
  --brand-secondary: 262.1 83.3% 57.8%;
  --brand-accent: 142.1 76.2% 36.3%;

  /* Dark Mode Variants */
  .dark {
    --background: 210 40% 8.4%;
    --foreground: 210 40% 96.1%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --muted: 210 40% 96.1%;
    --accent: 210 40% 96.1%;
    --border: 214.3 31.8% 91.4%;
    --brand-primary-start: 221.2 83.2% 53.3%;
    --brand-primary-end: 221.2 83.2% 43.3%;
    --brand-secondary: 262.1 83.3% 57.8%;
    --brand-accent: 142.1 76.2% 36.3%;
  }

  /* Gradient Presets */
  --gradient-primary: linear-gradient(
    135deg,
    hsl(var(--brand-primary-start)),
    hsl(var(--brand-primary-end))
  );
  --gradient-secondary: linear-gradient(
    135deg,
    hsl(var(--brand-primary-start)),
    hsl(var(--brand-secondary))
  );
  --gradient-accent: linear-gradient(
    135deg,
    hsl(var(--brand-primary-end)),
    hsl(var(--brand-accent))
  );
}
```

**Design Rules**:

- ✅ **Use CSS Variables**: Always reference `hsl(var(--primary))` instead of hardcoded colors
- ✅ **Dark Mode Support**: Define `.dark` variants for every custom color
- ✅ **Gradient Consistency**: Use predefined `--gradient-*` variables for backgrounds
- ❌ **Avoid Inline Colors**: Never use `className="bg-blue-500"` for brand colors

### Layout & Spacing Standards

**Container System**:

```tsx
<section className="container mx-auto max-w-6xl px-4">
  {/* Content centered, responsive padding */}
</section>
```

**Vertical Rhythm**:

- Section Padding: `py-20 md:py-32 lg:py-40` (adaptive to viewport)
- Content Spacing: `space-y-8` for vertical stacks
- Component Gaps: `gap-4` (16px) for grids/flexbox

**Responsive Breakpoints**:

- Mobile First: Base styles for `<640px`
- Tablet: `md:` prefix for `≥768px`
- Desktop: `lg:` prefix for `≥1024px`
- Large Desktop: `xl:` prefix for `≥1280px`

### Typography Guidelines

**Font System**:

```tsx
import { Rubik } from 'next/font/google';
const rubik = Rubik({ variable: '--font-rubik', subsets: ['latin', 'hebrew'] });
```

**Hierarchy**:

- **H1 Hero Titles**: `text-4xl md:text-5xl lg:text-6xl font-bold leading-tight`
- **Section Titles**: `text-3xl md:text-4xl font-bold`
- **Subsection Titles**: `text-2xl md:text-3xl font-semibold`
- **Body Text**: `text-lg leading-relaxed` (large for readability)
- **Captions**: `text-sm text-muted-foreground`

**Text Treatments**:

- **Gradient Text**: Use `bg-linear-to-r from-white via-blue-100 to-white bg-clip-text text-transparent` for hero titles
- **Emphasis**: `font-semibold text-primary` for important keywords
- **Muted Text**: `text-muted-foreground` for secondary information

### Creative UI Patterns & Uniqueness

**Section Differentiation**: Each section should have a unique visual identity while maintaining brand consistency.

**Visual Techniques**:

1. **Alternating Backgrounds**:
   - Hero: Gradient backgrounds with animated overlays
   - Features: Light/neutral background with subtle patterns
   - Testimonials: Card-based with glass-morphism effects
   - CTA: Bold gradient with high contrast

2. **Depth & Layering**:

   ```tsx
   <div className="relative">
     <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent" />
     <div className="relative z-10">{/* Content */}</div>
   </div>
   ```

3. **Micro-interactions**:

   ```tsx
   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
     <Button>Interactive CTA</Button>
   </motion.div>
   ```

4. **Floating Animations**:
   - Use `animate-float` for decorative elements
   - Stagger animations with `delay-{n}` for sequential reveals
   - Parallax effects with Framer Motion `useScroll` hooks

5. **Glass-morphism Effects**:

   ```tsx
   className = 'backdrop-blur-md bg-bg/10 ring-1 ring-border/20';
   ```

6. **Particle Effects**: For hero sections, add animated particles/dots for dynamism
   ```tsx
   {
     [...Array(20)].map((_, i) => (
       <motion.div
         key={i}
         className="absolute h-2 w-2 rounded-full bg-white/20"
         animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
         transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
       />
     ));
   }
   ```

**Card Design Patterns**:

```tsx
<Card className="group hover:border-primary border-2 transition-all duration-300 hover:shadow-2xl">
  <CardContent className="space-y-4">
    {/* Hover effects for engagement */}
  </CardContent>
</Card>
```

### Animation Standards

**Performance-Optimized Animations**:

- Use `transform` and `opacity` only (GPU-accelerated)
- Prefer CSS animations for simple effects, Framer Motion for complex orchestration
- Add `will-change: transform` for elements with frequent animations

**Animation Timing**:

```css
--transition-fast: 150ms; /* Micro-interactions */
--transition-base: 250ms; /* Standard transitions */
--transition-slow: 400ms; /* Page transitions */
--transition-slower: 600ms; /* Hero reveals */
```

**Entrance Animations**:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

**Scroll-Triggered Animations**: Use `framer-motion`'s `useInView` for sections:

```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });
```

---

## 3. SEO & Server-Side Rendering (SSR) Optimization

### Server Components Strategy

**Default Architecture**: Everything is a Server Component unless it needs client-side interactivity.

**Server Components** (No `'use client'`):

- Layout structures (Header, Footer)
- Static sections with no user interaction
- Data fetching and API calls
- Metadata generation

**Client Components** (`'use client'` required):

- Framer Motion animations
- State management (`useState`, `useEffect`)
- Event handlers (onClick, onChange)
- Theme toggles, modals, accordions
- Browser APIs (localStorage, window)

**Composition Pattern** (Best Practice):

```tsx
// Server Component (wrapper)
export default function PricingPage() {
  const plans = await fetchPlans(); // Server-side data fetch
  return <PricingSection plans={plans} />;
}

// Client Component (interactive UI)
('use client');
export function PricingSection({ plans }: { plans: Plan[] }) {
  const [selected, setSelected] = useState(0);
  return <motion.div>{/* Animated cards */}</motion.div>;
}
```

### SEO Excellence

**Metadata Configuration** (in `app/layout.tsx` or `page.tsx`):

```tsx
export const metadata: Metadata = {
  title: {
    default: 'Site Name - Compelling Tagline',
    template: '%s | Site Name', // For sub-pages
  },
  description: 'Concise, keyword-rich description (150-160 chars)',
  metadataBase: new URL('https://yourdomain.com'),
  alternates: { canonical: 'https://yourdomain.com' },
  openGraph: {
    title: 'Social Media Optimized Title',
    description: 'Description for social shares',
    url: 'https://yourdomain.com',
    siteName: 'Site Name',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Card Title',
    description: 'Twitter Card Description',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};
```

**Semantic HTML Structure**:

```tsx
<main>
  <article>
    <h1>Main Heading (Only One Per Page)</h1>
    <section id="features">
      <h2>Section Heading</h2>
      {/* Proper heading hierarchy: h1 → h2 → h3 */}
    </section>
  </article>
</main>
```

**Performance Optimizations**:

1. **Image Optimization**: Use Next.js `<Image>` component

   ```tsx
   <Image
     src="/hero.png"
     alt="Descriptive alt text for SEO"
     width={1200}
     height={600}
     priority // For above-the-fold images
     placeholder="blur" // For better UX
   />
   ```

2. **Font Optimization**: Next.js font loader with `subsets`

   ```tsx
   const font = Rubik({ subsets: ['latin'], display: 'swap' });
   ```

3. **Lazy Loading**: Client components split automatically by Next.js

   ```tsx
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Skeleton />,
   });
   ```

4. **Script Optimization**: For analytics/tracking
   ```tsx
   <Script src="https://analytics.com/script.js" strategy="lazyOnload" />
   ```

**Structured Data** (JSON-LD for rich snippets):

```tsx
<script type="application/ld+json">
  {JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Site Name',
    url: 'https://yourdomain.com',
    description: 'Site description',
  })}
</script>
```

---

## 4. Marketing & Conversion Optimization

### Landing Page Psychology

**Above the Fold Priorities**:

1. **Clear Value Proposition**: What you do in 5-7 words
2. **Supporting Subtitle**: How you solve the problem (1-2 sentences)
3. **Primary CTA**: Action-oriented button ("Start Free Trial", "Get Started", "Book a Demo")
4. **Visual Proof**: Hero image, video demo, or trust badges

**CTA Button Best Practices**:

```tsx
<Button
  size="lg"
  className="group bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
>
  {actionText}
  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
</Button>
```

**CTA Copywriting Rules**:

- ✅ **Action-Oriented**: "Start Building", "Get Your Free Plan", "See It In Action"
- ✅ **Benefit-Focused**: "Start Saving Time", "Boost Your Revenue"
- ✅ **Urgency/Scarcity**: "Limited Spots Available", "Join 10,000+ Users"
- ❌ **Generic**: "Submit", "Click Here", "Learn More"

### Section Stacking Strategy

**High-Converting Landing Page Flow** (Recommended Order):

1. **Hero Section** (`#hero`)
   - Attention-grabbing headline
   - Clear value proposition
   - Primary CTA + Secondary CTA
   - Hero visual (image/video/animation)
   - Social proof badges (optional: "Trusted by 10,000+")

2. **Social Proof / Trust Bar** (`#trust`)
   - Client logos (if B2B)
   - Statistics ("500k+ Users", "99% Satisfaction")
   - Awards or certifications

3. **Features Section** (`#features`)
   - 3-6 key features with icons
   - Benefit-oriented descriptions
   - Visual hierarchy with cards/grid layout
   - Alternating image-text layouts for depth

4. **How It Works** (`#how-it-works`)
   - 3-4 step process
   - Numbered progression
   - Visual diagrams or illustrations
   - Emphasize simplicity

5. **Social Proof / Testimonials** (`#testimonials`)
   - 3-6 customer testimonials
   - Include photos, names, titles
   - Video testimonials (if available)
   - Specific results/metrics

6. **Pricing Section** (`#pricing`)
   - Clear, transparent pricing
   - 2-4 plan tiers
   - Highlight recommended plan
   - Feature comparison table
   - CTA per plan

7. **FAQ Section** (`#faq`)
   - Address common objections
   - 5-10 questions
   - Accordion format for space efficiency
   - Link to support resources

8. **Final CTA Section** (`#cta`)
   - Reinforced value proposition
   - Strong CTA with urgency
   - Risk-free guarantee (if applicable)
   - Last chance to convert visitors

**Alternative Flows**:

- **Product-Led**: Hero → Demo Video → Features → Pricing → CTA
- **B2B/Enterprise**: Hero → Social Proof → ROI Calculator → Case Studies → Pricing → CTA
- **App/SaaS**: Hero → Features → How It Works → Testimonials → Pricing → FAQ → CTA

### Conversion Optimization Techniques

**Visual Hierarchy**:

- **Primary Action**: Largest, highest contrast button
- **Secondary Action**: Outlined or ghost button style
- **Tertiary Links**: Text links with subtle underline

**Friction Reduction**:

- Minimize form fields (only essentials)
- Progressive disclosure (multi-step if needed)
- Autofocus on first input
- Clear error messages
- Loading states for async actions

**Trust Signals**:

```tsx
<div className="text-muted-foreground flex items-center gap-2 text-sm">
  <Shield className="h-4 w-4" />
  <span>🔒 Secure checkout · No credit card required</span>
</div>
```

**Urgency & Scarcity**:

```tsx
<Badge variant="destructive" className="animate-pulse">
  🔥 Only 3 spots left at this price!
</Badge>
```

**Mobile Optimization**:

- Sticky CTA button on mobile (bottom of screen)
- Hamburger menu for navigation
- Touch-friendly targets (min 44px)
- Simplified content hierarchy

---

## 5. Component Reusability & Consistency

### Section Component Pattern

**Standard Section Structure**:

```tsx
interface SectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Section({
  title,
  subtitle,
  className,
  children,
}: SectionProps) {
  return (
    <section className={cn('py-20 md:py-32', className)}>
      <div className="container mx-auto max-w-6xl px-4">
        {title && (
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
```

### When to Use Inline Customization

**Avoid Inline Styles** for:

- Brand colors (use CSS variables)
- Spacing/layout (use Tailwind utilities)
- Typography scales (use defined classes)

**Inline Customization Acceptable** for:

- Section-specific gradients or backgrounds
- Unique animations for a specific section
- Dynamic content-based styling (e.g., progress bars)

**Example**:

```tsx
{/* ✅ Good: Unique section background */}
<section style={{ background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent)' }}>

{/* ❌ Bad: Should use CSS variable */}
<button style={{ backgroundColor: '#3b82f6' }}>Click</button>
```

---

## 6. Accessibility & Internationalization

### Accessibility Checklist

- ✅ **Semantic HTML**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- ✅ **Keyboard Navigation**: All interactive elements accessible via Tab key
- ✅ **Focus Indicators**: Visible focus states (`focus-visible:ring-2 focus-visible:ring-primary`)
- ✅ **Alt Text**: Descriptive alt text for all images
- ✅ **ARIA Labels**: For icon-only buttons and complex widgets
- ✅ **Color Contrast**: Minimum 4.5:1 for text, 3:1 for large text
- ✅ **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)

**Example**:

```tsx
<button
  aria-label="Close dialog"
  className="focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none"
>
  <X className="h-4 w-4" />
</button>
```

### RTL (Right-to-Left) Support

**Layout Configuration**:

```tsx
<html lang="he" dir="rtl">
```

**Directional Utilities**:

- Use `ms-*` (margin-inline-start) instead of `ml-*`
- Use `me-*` (margin-inline-end) instead of `mr-*`
- Icons should flip direction in RTL contexts

---

## 7. Error Handling & Edge Cases

### Form Validation Patterns

```tsx
<FormField
  name="email"
  render={({ field, fieldState }) => (
    <div>
      <Input {...field} type="email" aria-invalid={!!fieldState.error} />
      {fieldState.error && (
        <p className="text-destructive mt-1 text-sm">
          {fieldState.error.message}
        </p>
      )}
    </div>
  )}
/>
```

### Loading States

```tsx
{
  isLoading ? (
    <div className="animate-pulse space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  ) : (
    <ContentComponent />
  );
}
```

### Empty States

```tsx
{
  items.length === 0 && (
    <div className="py-16 text-center">
      <p className="text-muted-foreground mb-4">No items found</p>
      <Button>Add Your First Item</Button>
    </div>
  );
}
```

---

## 8. Testing & Quality Assurance

### Pre-Launch Checklist

**Performance**:

- [ ] Lighthouse score 90+ (Performance, Accessibility, Best Practices, SEO)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

**Functionality**:

- [ ] All CTAs link to correct destinations
- [ ] Forms validate and submit properly
- [ ] Navigation works across all pages
- [ ] Theme toggle works (light/dark)
- [ ] Mobile menu functions correctly

**Content**:

- [ ] No placeholder text ("Lorem ipsum")
- [ ] All images have alt text
- [ ] Links open in correct target (\_blank for external)
- [ ] Spelling and grammar checked

**Cross-Browser Testing**:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (iOS and macOS)
- [ ] Mobile browsers (Chrome, Safari)

---

## 9. Creative Enhancement Ideas

### Delight Moments (Micro-Interactions)

1. **Button Hover States**: Gradient shift, scale up, icon movement
2. **Card Reveals**: Staggered fade-ins on scroll
3. **Cursor Effects**: Custom cursor trails for hero sections
4. **Easter Eggs**: Konami code for special animations
5. **Scroll Progress**: Animated progress bar at top

### Advanced UI Patterns

**Bento Grid Layouts**:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
  <Card className="md:col-span-2 md:row-span-2">{/* Featured */}</Card>
  <Card>{/* Supporting */}</Card>
  <Card>{/* Supporting */}</Card>
</div>
```

**Marquee/Infinite Scroll** (for logos/testimonials):

```tsx
<div className="overflow-hidden">
  <motion.div
    className="flex gap-8"
    animate={{ x: [0, -1000] }}
    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
  >
    {logos.map((logo) => (
      <img key={logo} src={logo} />
    ))}
  </motion.div>
</div>
```

**Parallax Sections**:

```tsx
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
<motion.div style={{ y }}>{/* Parallax content */}</motion.div>;
```

---

## Summary: Golden Rules

1. **Server-First Architecture**: Use Server Components by default, client components only when necessary
2. **Semantic Color System**: Always use CSS variables, never hardcoded colors
3. **Consistent Spacing**: Use Tailwind's spacing scale religiously
4. **Performance Obsession**: Every animation must be GPU-accelerated (transform/opacity)
5. **Mobile-First Design**: Build for mobile, enhance for desktop
6. **Data-Driven Content**: All text/configuration in `lib/constants.ts`
7. **Accessibility is Non-Negotiable**: Semantic HTML, keyboard nav, screen reader support
8. **Marketing Psychology**: Every section must have a purpose in the conversion funnel
9. **Type Safety**: No `any` types, explicit interfaces for all props
10. **Unique Visual Identity**: Each landing page should feel premium and distinctive

---

**Build pages that convert, delight, and perform.** 🚀
