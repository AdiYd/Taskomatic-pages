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

### 3D Carousel Component

**Purpose**: Create stunning 3D rotating carousels for showcasing features, testimonials, products, or any content with visual impact.

**Component Path**: `@/components/ui/carousel-3d`

**CSS File**: `app/carousel-3d.css` (imported in layout.tsx)

#### Basic Usage:

```tsx
import { Carousel3D } from '@/components/ui/carousel-3d';

// Define your items with any JSX content
const items = [
  {
    id: 'item-1',
    content: (
      <Card className="h-full w-full p-6">
        <h3 className="font-bold">Feature Title</h3>
        <p className="text-sm">Feature description</p>
      </Card>
    ),
  },
  {
    id: 'item-2',
    content: (
      <div className="flex h-full items-center justify-center bg-gradient-primary">
        <Icon className="h-12 w-12 text-white" />
      </div>
    ),
  },
  // ... more items
];

<Carousel3D items={items} />;
```

#### Props Interface:

```tsx
interface Carousel3DProps {
  items: Carousel3DItem[]; // Required: Array of items with id and content
  className?: string; // Optional: Class for inner carousel container
  wrapperClassName?: string; // Optional: Class for outer wrapper
  cardClassName?: string; // Optional: Class for individual cards
  cardWidth?: number; // Default: 160 - Card width in pixels
  cardHeight?: number; // Default: 160 - Card height in pixels
  translateZ?: number; // Default: 200 - Distance from center (affects circle size)
  rotateX?: number; // Default: -10 - X-axis tilt angle in degrees
  perspective?: number; // Default: 1000 - 3D perspective depth
  animationDuration?: number; // Default: 32 - Rotation speed in seconds
}

interface Carousel3DItem {
  id: string | number; // Unique identifier for each item
  content: ReactNode; // Any JSX content (cards, images, custom components)
  alt?: string; // Optional: Alt text for accessibility
}
```

#### Advanced Customization:

```tsx
// Large feature showcase with custom dimensions
<Carousel3D
  items={featureItems}
  cardWidth={320}
  cardHeight={280}
  translateZ={400}
  rotateX={-5}
  perspective={1200}
  animationDuration={40}
  wrapperClassName="h-[500px]"
  cardClassName="backdrop-blur-sm bg-card/80"
/>

// Compact product carousel
<Carousel3D
  items={productItems}
  cardWidth={200}
  cardHeight={200}
  translateZ={300}
  rotateX={-15}
  animationDuration={25}
/>
```

#### Image-Specific Convenience Component:

For pure image carousels, use the `Carousel3DImages` component:

```tsx
import { Carousel3DImages } from '@/components/ui/carousel-3d';

const images = [
  { id: 1, src: '/product-1.jpg', alt: 'Product 1' },
  { id: 2, src: '/product-2.jpg', alt: 'Product 2' },
  { id: 3, src: '/product-3.jpg', alt: 'Product 3' },
];

<Carousel3DImages
  images={images}
  cardWidth={260}
  cardHeight={260}
  translateZ={350}
  sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 260px"
  priority={false}
/>;
```

#### Real-World Example (Features Section):

```tsx
// components/client-ui/FeaturesGrid.tsx
export function FeaturesGrid({ features }: FeaturesGridProps) {
  const carouselItems = features.map((feature) => ({
    id: feature.title,
    content: (
      <Card className="group hover:border-primary relative h-full border-2 transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-accent absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
        <CardHeader className="relative">
          <motion.div
            className="mb-4 inline-block"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="bg-gradient-primary flex h-16 w-16 items-center justify-center rounded-lg text-3xl shadow-lg">
              {feature.icon}
            </div>
          </motion.div>
          <CardTitle>{feature.title}</CardTitle>
          <CardDescription className="text-base">
            {feature.description}
          </CardDescription>
        </CardHeader>
      </Card>
    ),
  }));

  return (
    <Carousel3D
      items={carouselItems}
      cardWidth={320}
      cardHeight={280}
      translateZ={400}
      rotateX={-5}
      perspective={1200}
      animationDuration={40}
    />
  );
}
```

#### Design Guidelines:

**Best Use Cases**:
- Feature showcases (6-8 features)
- Product galleries
- Team member profiles
- Testimonial displays
- Technology stack logos
- Service offerings

**Visual Tips**:
- Use `translateZ` to control carousel diameter (higher = wider circle)
- Adjust `rotateX` for viewing angle (negative = tilted down, positive = tilted up)
- Slower `animationDuration` (40-60s) for detailed content, faster (20-30s) for simple icons
- Combine with `backdrop-blur` and transparency for glass-morphism effects
- Add hover effects on individual cards for interactivity

**Performance Notes**:
- Carousel pauses rotation on hover for better UX
- Respects `prefers-reduced-motion` (slower animation)
- GPU-accelerated 3D transforms
- Responsive breakpoints adjust card size on mobile
- Dark mode support built-in

**Accessibility**:
- Ensure meaningful alt text for image carousels
- Cards remain keyboard accessible
- Hover pause allows users to interact with content
- Screen readers can access content in DOM order

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

## 10. Advanced Visual Effects & Animation System

This project includes a comprehensive library of CSS effects and animation wrappers for creating stunning, high-converting landing pages. Use these to differentiate sections and create memorable user experiences.

### Animation Wrapper Components

**Available Animation Types** (from `@/components/animations`):

All animation components are **mobile-optimized** and start animations immediately on mobile (no waiting for scroll), while maintaining dramatic effects on desktop.

#### 1. **FadeBlur** - Fade with blur effect
**Best for**: Section headers, hero content, feature introductions

```tsx
import { FadeBlur } from '@/components/animations';

<FadeBlur direction="up" blur={10} duration={0.6}>
  <h2>Your Section Title</h2>
  <p>Content that fades in smoothly with slight blur</p>
</FadeBlur>
```

**Props**:
- `direction`: 'up' | 'down' | 'left' | 'right' (default: 'up')
- `blur`: number (default: 10) - blur intensity in pixels
- `duration`: number (default: 0.6) - animation duration in seconds

**Usage Examples**:
```tsx
// Hero section - dramatic entrance
<FadeBlur direction="up" blur={15} duration={0.8}>
  <h1>Welcome to Our Product</h1>
</FadeBlur>

// Feature cards - subtle reveal
<FadeBlur direction="right" blur={8} duration={0.5}>
  <FeatureCard />
</FadeBlur>
```

#### 2. **SlideInScale** - Slide with scale transformation
**Best for**: Call-to-action sections, pricing cards, special announcements

```tsx
import { SlideInScale } from '@/components/animations';

<SlideInScale slideOutput={[-50, 0]} scaleOutput={[0.8, 1.0]}>
  <PricingCard />
</SlideInScale>
```

**Props**:
- `slideOutput`: [start, end] (default: [-50, 0]) - Y-axis movement in pixels
- `scaleOutput`: [start, end] (default: [0.8, 1.0]) - scale transformation
- Mobile-optimized: Animations trigger immediately on viewport entry

**Usage Examples**:
```tsx
// CTA section - attention-grabbing
<SlideInScale slideOutput={[-60, 0]} scaleOutput={[0.85, 1.0]}>
  <Button size="lg">Get Started Now</Button>
</SlideInScale>

// Testimonial cards - smooth entrance
<SlideInScale slideOutput={[-40, 0]} scaleOutput={[0.9, 1.0]}>
  <TestimonialCard />
</SlideInScale>
```

#### 3. **SlideScale** - Multi-stage slide and scale
**Best for**: Process steps, timeline sections, multi-part content

```tsx
import { SlideScale } from '@/components/animations';

<SlideScale 
  slideOutput={[50, 0, -50]} 
  scaleOutput={[0.8, 1.05, 0.8]}
>
  <ProcessSteps />
</SlideScale>
```

**Props**:
- `slideOutput`: [entry, middle, exit] - Three-stage Y-axis movement
- `scaleOutput`: [entry, middle, exit] - Three-stage scale transformation
- Creates dynamic "zoom through" effect

**Usage Examples**:
```tsx
// How it works section
<SlideScale slideOutput={[40, 0, -40]} scaleOutput={[0.85, 1.08, 0.85]}>
  <StepByStepGuide />
</SlideScale>
```

#### 4. **ParallaxReveal** - Parallax scroll effect
**Best for**: Hero sections, feature showcases, immersive storytelling

```tsx
import { ParallaxReveal } from '@/components/animations';

<ParallaxReveal speed={50} rotate={5}>
  <HeroImage />
</ParallaxReveal>
```

**Props**:
- `speed`: number (default: 50) - parallax movement speed
- `rotate`: number (default: 5) - rotation angle during scroll

**Usage Examples**:
```tsx
// Hero background - depth effect
<ParallaxReveal speed={30} rotate={3}>
  <div className="absolute inset-0 bg-gradient-hero opacity-20" />
</ParallaxReveal>

// Feature image - dynamic reveal
<ParallaxReveal speed={60} rotate={8}>
  <Image src="/feature-mockup.png" />
</ParallaxReveal>
```

#### 5. **StaggerFade** - Staggered children animation
**Best for**: Lists, grids, multiple items that should animate sequentially

```tsx
import { StaggerFade } from '@/components/animations';

<StaggerFade delay={0} staggerDelay={0.1} direction="up">
  {features.map(feature => <FeatureCard key={feature.id} {...feature} />)}
</StaggerFade>
```

**Props**:
- `delay`: number (default: 0) - initial delay before animation starts
- `staggerDelay`: number (default: 0.1) - delay between each child
- `direction`: 'up' | 'down' | 'left' | 'right' (default: 'up')
- Mobile-optimized: Triggers at viewport edge

**Usage Examples**:
```tsx
// Feature grid - sequential reveal
<StaggerFade staggerDelay={0.15} direction="up">
  <div className="grid grid-cols-3 gap-6">
    {features.map(f => <FeatureCard key={f.id} {...f} />)}
  </div>
</StaggerFade>

// FAQ accordion - smooth entrance
<StaggerFade delay={0.2} staggerDelay={0.08}>
  {faqs.map(faq => <AccordionItem key={faq.id} {...faq} />)}
</StaggerFade>
```

---

### Blur & Gradient Effects (blures.css)

**Purpose**: Add atmospheric depth and visual interest with animated blur gradients. These effects use pseudo-elements and won't interfere with content.

#### Available Classes:

1. **`.blur-floating-orbs`** - Glowing orbs that float across section
   ```tsx
   <section className="blur-floating-orbs py-20">
     <div className="container">
       <h2>Your Content Here</h2>
       {/* Content stays above blur effects */}
     </div>
   </section>
   ```
   **Best for**: Hero sections, feature showcases, testimonials
   **Effect**: Large radial gradients that slowly float and pulse

2. **`.blur-wave-gradient`** - Horizontal wave that flows across
   ```tsx
   <section className="blur-wave-gradient bg-background">
     <Features />
   </section>
   ```
   **Best for**: Feature sections, content dividers
   **Effect**: Smooth horizontal gradient wave with mix-blend-mode

3. **`.blur-rotating-glow`** - Circular gradient that rotates
   ```tsx
   <section className="blur-rotating-glow relative">
     <CTAContent />
   </section>
   ```
   **Best for**: CTA sections, pricing tables, special announcements
   **Effect**: Conic gradient that creates rotating aurora effect
   **Note**: Used in CTA section by default

4. **`.blur-pulsing-glow`** - Centered glow that pulses
   ```tsx
   <div className="blur-pulsing-glow rounded-lg p-8">
     <PricingCard featured />
   </div>
   ```
   **Best for**: Featured cards, highlighted content, badges
   **Effect**: Radial gradient that pulses in/out from center

5. **`.blur-diagonal-sweep`** - Diagonal gradient sweep
   ```tsx
   <section className="blur-diagonal-sweep">
     <ProcessSteps />
   </section>
   ```
   **Best for**: Process sections, timelines, step-by-step guides
   **Effect**: Diagonal gradient that sweeps back and forth

6. **`.blur-aurora-waves`** - Multi-layered aurora effect
   ```tsx
   <section className="blur-aurora-waves bg-muted/50">
     <Testimonials />
   </section>
   ```
   **Best for**: Testimonials, social proof sections, immersive content
   **Effect**: Multiple radial gradients creating northern lights effect

**Combining Blur Effects**:
```tsx
// Subtle background enhancement
<section className="blur-floating-orbs bg-gradient-to-b from-background to-muted/30">
  <Features />
</section>

// Dramatic hero with multiple effects
<section className="blur-aurora-waves blur-rotating-glow relative">
  <HeroContent />
</section>
```

**Important Notes**:
- Effects use `z-index: 0` and won't interfere with content
- Wrap content in elements with `position: relative; z-index: 1` if needed
- Dark mode automatically increases opacity for better visibility
- Respects `prefers-reduced-motion` for accessibility

---

### Decorative Shapes (shapes.css)

**Purpose**: Add geometric decorative elements that enhance visual interest without cluttering content.

#### Available Classes:

1. **`.shapes-floating-bubbles`** - Animated circular bubbles
   ```tsx
   <section className="shapes-floating-bubbles">
     <div className="container relative z-10">
       <Content />
     </div>
   </section>
   ```
   **Best for**: Clean, modern sections; feature introductions
   **Effect**: Circular shapes with subtle borders that float upward

2. **`.shapes-rotating-geometry`** - Abstract rotating shapes
   ```tsx
   <section className="shapes-rotating-geometry bg-muted">
     <Features />
   </section>
   ```
   **Best for**: Tech/SaaS sections, innovative product features
   **Effect**: Morphing geometric shapes that rotate slowly

3. **`.shapes-abstract-scatter`** - Scattered small shapes
   ```tsx
   <section className="shapes-abstract-scatter py-32">
     <PricingPlans />
   </section>
   ```
   **Best for**: Pricing, testimonials, any section needing subtle decoration
   **Effect**: Small circles and squares that gently float

4. **`.shapes-particle-dots`** - Dot field pattern
   ```tsx
   <section className="shapes-particle-dots">
     <TechFeatures />
   </section>
   ```
   **Best for**: Technical sections, data-focused content, B2B pages
   **Effect**: Multiple layers of dots creating depth and movement

5. **`.shapes-hexagon-mesh`** - Hexagonal tech pattern
   ```tsx
   <section className="shapes-hexagon-mesh bg-primary/5">
     <SecurityFeatures />
   </section>
   ```
   **Best for**: Security, blockchain, tech-heavy sections
   **Effect**: Large hexagons with gradient fills that pulse

6. **`.shapes-ring-ripples`** - Expanding ring ripples
   ```tsx
   <section className="shapes-ring-ripples">
     <SocialProof />
   </section>
   ```
   **Best for**: Testimonials, social proof, impact sections
   **Effect**: Concentric rings that expand like water ripples

7. **`.shapes-cubic-blocks`** - 3D rotating cubes
   ```tsx
   <section className="shapes-cubic-blocks bg-gradient-to-br from-primary/10 to-secondary/10">
     <InnovationContent />
   </section>
   ```
   **Best for**: Innovation, product showcases, modern tech
   **Effect**: Rotated squares creating 3D cube illusion with glow

8. **`.shapes-spiral-lines`** - Rotating spiral pattern
   ```tsx
   <section className="shapes-spiral-lines relative">
     <CTASection />
   </section>
   ```
   **Best for**: Dynamic sections, energy/motion concepts
   **Effect**: Crossed lines that rotate creating spiral motion

**Combining Shapes with Blur Effects**:
```tsx
// Tech-focused section with depth
<section className="shapes-hexagon-mesh blur-floating-orbs bg-muted/50">
  <SecurityFeatures />
</section>

// Energetic CTA with multiple layers
<section className="shapes-cubic-blocks blur-rotating-glow">
  <FinalCTA />
</section>
```

---

### Clip-Path Utilities (clip.css)

**Purpose**: Create unique edge shapes and creative layouts that stand out from standard rectangular sections.

#### Wave Clips (Ultra-Smooth):

```tsx
// Wave top - section with wavy top edge
<section className="clip-wave-top bg-primary text-primary-foreground py-20">
  <Content />
</section>

// Wave bottom - smooth bottom curve
<section className="clip-wave-bottom bg-muted py-20">
  <Features />
</section>

// Wave both - waves on top and bottom
<section className="clip-wave-both bg-gradient-primary py-32">
  <HeroContent />
</section>

// Wave sides - for vertical layouts
<div className="clip-wave-left h-full">
  <SidebarContent />
</div>
```

**Available**: `.clip-wave-top`, `.clip-wave-bottom`, `.clip-wave-both`, `.clip-wave-left`, `.clip-wave-right`

#### Curved Corners (Smooth organic curves):

```tsx
// Modern card with curved corner
<Card className="clip-curve-corner-tr p-8">
  <PricingContent />
</Card>

// Hero section with elegant curve
<section className="clip-curve-corner-br bg-gradient-hero py-40">
  <HeroContent />
</section>
```

**Available**: `.clip-curve-corner-tr`, `.clip-curve-corner-tl`, `.clip-curve-corner-br`, `.clip-curve-corner-bl`

#### Diagonal Cuts:

```tsx
// Modern angular section
<section className="clip-diagonal-tr bg-primary py-20">
  <CTAContent />
</section>

// Alternating diagonal sections
<section className="clip-diagonal-br bg-muted py-20">
  <Features />
</section>
<section className="clip-diagonal-tl bg-background py-20">
  <MoreFeatures />
</section>
```

**Available**: `.clip-diagonal-tr`, `.clip-diagonal-tl`, `.clip-diagonal-br`, `.clip-diagonal-bl`

#### Special Creative Shapes:

1. **`.clip-ticket`** - Ticket/coupon with perforations
   ```tsx
   <div className="clip-ticket bg-gradient-secondary p-6">
     <PromoCode />
   </div>
   ```

2. **`.clip-tag`** - Price tag shape
   ```tsx
   <Badge className="clip-tag bg-destructive">
     50% OFF
   </Badge>
   ```

3. **`.clip-message`** - Speech bubble with tail
   ```tsx
   <div className="clip-message bg-primary text-primary-foreground p-4">
     <Testimonial />
   </div>
   ```

4. **`.clip-scallop-top`** - Decorative scalloped edge
   ```tsx
   <section className="clip-scallop-top bg-accent py-20">
     <SpecialOffer />
   </section>
   ```

5. **`.clip-liquid-bottom`** - Liquid/melting effect
   ```tsx
   <section className="clip-liquid-bottom bg-gradient-hero py-32">
     <CreativeHero />
   </section>
   ```

6. **`.clip-mountain-bottom`** - Mountain range silhouette
   ```tsx
   <footer className="clip-mountain-bottom bg-foreground text-background py-20">
     <FooterContent />
   </footer>
   ```

7. **`.clip-arch-top`** - Dome/arch shape
   ```tsx
   <section className="clip-arch-top bg-muted py-24">
     <ElegantContent />
   </section>
   ```

8. **`.clip-cloud`** - Fluffy cloud shape
   ```tsx
   <div className="clip-cloud bg-info p-6 inline-block">
     <ThoughtBubble />
   </div>
   ```

#### Geometric Shapes:

```tsx
// Hexagon badge
<div className="clip-hexagon w-32 h-32 bg-primary flex items-center justify-center">
  <Icon />
</div>

// Diamond highlight
<div className="clip-diamond bg-accent p-8">
  <FeatureHighlight />
</div>

// Pentagon badge
<Badge className="clip-pentagon bg-success">
  NEW
</Badge>
```

**Available**: `.clip-hexagon`, `.clip-octagon`, `.clip-pentagon`, `.clip-diamond`, `.clip-trapezoid`

#### Arrow Clips:

```tsx
// Directional CTA
<Button className="clip-arrow-right bg-primary">
  Next Step →
</Button>

// Process flow
<div className="clip-arrow-down bg-muted p-6">
  <ProcessStep />
</div>
```

**Available**: `.clip-arrow-right`, `.clip-arrow-left`, `.clip-arrow-up`, `.clip-arrow-down`

#### Utility Classes:

```tsx
// Add smooth transitions for interactive clips
<Card className="clip-wave-bottom clip-transition hover:clip-wave-top">
  <InteractiveContent />
</Card>

// Ensure content doesn't overflow clipped edges
<div className="clip-blob-1 clip-contained">
  <Content />
</div>

// Expand on hover - reveal full content
<div className="clip-hexagon clip-hover-expand">
  <HoverToReveal />
</div>
```

**Combining Clips with Other Effects**:
```tsx
// Wave section with blur effect
<section className="clip-wave-bottom blur-floating-orbs bg-gradient-primary py-32">
  <HeroContent />
</section>

// Curved card with shapes
<Card className="clip-curve-corner-tr shapes-floating-bubbles p-8">
  <PremiumFeature />
</Card>

// Creative footer with multiple effects
<footer className="clip-mountain-bottom shapes-particle-dots blur-diagonal-sweep bg-foreground py-20">
  <FooterContent />
</footer>
```

---

### Starfield Background (animations.css)

**Purpose**: Full-page animated starfield background for space/tech themes.

```tsx
// In page.tsx or layout
<div className="starfield fixed inset-0 z-0">
  {/* Optional: Add shooting stars */}
  <div className="shooting-stars">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="shooting-star" />
    ))}
  </div>
</div>

<main className="relative z-10">
  {/* Your content */}
</main>
```

**Features**:
- Multi-layered stars with different sizes
- Twinkling animation
- Optional shooting stars
- Slow rotation for depth effect
- Performance-optimized with CSS animations

**Usage Notes**:
- Already applied to main page background
- Use `relative z-10` on content to ensure it appears above starfield
- Can be combined with other effects for immersive experiences

---

### Design Recipe Examples

#### 1. **High-Tech SaaS Hero**:
```tsx
<section className="clip-wave-bottom shapes-hexagon-mesh blur-rotating-glow bg-gradient-hero py-40">
  <FadeBlur direction="up" blur={15} duration={0.8}>
    <h1 className="text-6xl font-bold">Revolutionary Platform</h1>
  </FadeBlur>
  <SlideInScale slideOutput={[-60, 0]} scaleOutput={[0.8, 1.0]}>
    <Button size="lg">Start Free Trial</Button>
  </SlideInScale>
</section>
```

#### 2. **Elegant Feature Section**:
```tsx
<section className="clip-curve-corner-br blur-floating-orbs bg-muted/50 py-32">
  <StaggerFade staggerDelay={0.15} direction="up">
    <div className="grid grid-cols-3 gap-8">
      {features.map(f => (
        <Card key={f.id} className="clip-transition hover:clip-wave-top">
          <FeatureCard {...f} />
        </Card>
      ))}
    </div>
  </StaggerFade>
</section>
```

#### 3. **Dynamic Pricing Section**:
```tsx
<section className="shapes-cubic-blocks blur-pulsing-glow py-32">
  <FadeBlur direction="up" duration={0.6}>
    <h2>Simple, Transparent Pricing</h2>
  </FadeBlur>
  <StaggerFade staggerDelay={0.2}>
    <div className="grid grid-cols-3 gap-6">
      {plans.map(plan => (
        <Card 
          key={plan.id}
          className={cn(
            "clip-curve-corner-tr",
            plan.featured && "clip-ticket blur-pulsing-glow"
          )}
        >
          <PricingCard {...plan} />
        </Card>
      ))}
    </div>
  </StaggerFade>
</section>
```

#### 4. **Creative CTA Section**:
```tsx
<section className="clip-liquid-bottom shapes-spiral-lines blur-aurora-waves bg-gradient-accent py-40">
  <ParallaxReveal speed={40} rotate={5}>
    <SlideInScale slideOutput={[-80, 0]} scaleOutput={[0.75, 1.0]}>
      <div className="clip-message bg-background p-12 inline-block">
        <h2>Ready to Transform Your Business?</h2>
        <Button size="xl" className="shine-button">
          Get Started Today
        </Button>
      </div>
    </SlideInScale>
  </ParallaxReveal>
</section>
```

#### 5. **Modern Footer**:
```tsx
<footer className="clip-mountain-bottom shapes-particle-dots bg-foreground text-background py-20">
  <div className="container relative z-10">
    <FooterContent />
  </div>
</footer>
```

---

### Performance Best Practices

1. **Don't Over-Combine**: Limit to 2-3 effect types per section
   ```tsx
   // ✅ Good - balanced effects
   <section className="blur-floating-orbs shapes-abstract-scatter">
   
   // ❌ Too much - performance impact
   <section className="blur-floating-orbs blur-rotating-glow shapes-hexagon-mesh shapes-cubic-blocks">
   ```

2. **Use Clips Strategically**: Apply clips to sections, not small elements
   ```tsx
   // ✅ Good - section-level clip
   <section className="clip-wave-bottom">
   
   // ❌ Bad - too many clipped elements
   <div className="grid">
     {items.map(item => <div className="clip-hexagon">{item}</div>)}
   </div>
   ```

3. **Layer Z-Index Properly**:
   ```tsx
   <section className="shapes-floating-bubbles relative">
     {/* Shapes at z-0 by default */}
     <div className="container relative z-10">
       {/* Content above shapes */}
     </div>
   </section>
   ```

4. **Mobile Optimization**: All animations auto-optimize for mobile
   - Immediate viewport entry trigger
   - Faster animation speeds
   - Reduced motion support built-in

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
11. **Layer Visual Effects Wisely**: Use animation wrappers (FadeBlur, SlideInScale, etc.) + CSS effects (blur, shapes, clips) for rich, unique designs
12. **Mobile-Optimized Animations**: All animation components auto-adjust timing for instant mobile feedback

---

**Build pages that convert, delight, and perform.** 🚀
