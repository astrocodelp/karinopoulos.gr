# Bilingual Real Estate Website - Nikos Karinopoulos

A production-ready bilingual real estate website built with Next.js, next-intl v4, TypeScript, and Tailwind CSS, featuring a minimal architectural aesthetic and comprehensive property management system.

## 🌟 Features

### Core Functionality
- **Bilingual Support**: Complete Greek (el) and English (en) localization using next-intl v4
- **Property Management**: Advanced filtering, search, and detailed property pages
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **SEO Optimized**: Localized metadata, structured data, and canonical URLs
- **Performance**: Static generation, image optimization, and route-level caching

### User Experience
- **Architectural Design**: Minimal, clean aesthetic with generous negative space
- **Micro-interactions**: Subtle animations and hover effects (120-180ms duration)
- **Accessibility**: WCAG compliant with keyboard navigation and focus management
- **Modern UI**: Clean typography, geometric elements, and sophisticated color palette

## 🚀 Technology Stack

- **Framework**: Next.js 13.5+ (App Router)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom design system
- **Internationalization**: next-intl v4 with locale subpaths
- **Validation**: Zod for type-safe schemas
- **Icons**: Lucide React
- **Images**: Next/Image with Pexels integration

## 🏗️ Project Structure

```
├── app/[locale]/                 # App Router with locale support
│   ├── (site)/                   # Site pages group
│   │   ├── page.tsx              # Home page
│   │   ├── properties/           # Properties section
│   │   ├── services/             # Services page
│   │   ├── about/                # About page
│   │   ├── success-stories/      # Success Stories page
│   │   └── contact/              # Contact page
│   └── layout.tsx                # Root layout with locale
├── components/
│   ├── site/                     # Site-specific components
│   └── ui/                       # Reusable UI components
├── data/                         # JSON data files
├── lib/                          # Utilities and configurations
├── messages/                     # Translation files (el.json, en.json)
├── schema/                       # TypeScript interfaces and validation
└── middleware.ts                 # next-intl routing middleware
```

## 📦 Installation & Setup

1. **Clone and Install**
```bash
git clone <repository>
cd real-estate-website
npm install
```

2. **Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
npm start
```

## 🌐 Internationalization

### Locale Configuration
- **Default locale**: Greek (el)
- **Supported locales**: Greek (el), English (en)
- **Routing**: `/el/page` and `/en/page` with middleware handling
- **Fallbacks**: Graceful fallbacks for missing translations

### Adding Translations
1. Update `messages/el.json` and `messages/en.json`
2. Use `useTranslations('namespace')` hook in components
3. Implement proper plural rules and ICU message format

### Locale Switching
The `LocaleSwitcher` component preserves the current pathname and query parameters when switching languages.

## 🎨 Design System

### Color Palette
- **Background**: Near-white (#fafafa)
- **Text**: Charcoal (#171717)
- **Primary**: Deep Blue (#1d4ed8)
- **Accent**: Amber (#f59e0b)
- **Success**: Emerald (#059669)

### Typography
- **Headings**: 48px/56px/64px with tight line-height
- **Body**: 16-18px with 1.6 line-height
- **Font Stack**: Inter with Greek subset support

### Components
- **Radius**: 16px (2xl) for cards and buttons
- **Shadows**: Soft, 2-4dp depth
- **Animations**: 120-180ms duration with easing
- **Grid**: 12-column system with generous gutters

## 📄 Content Management

### Property Schema
```typescript
interface Property {
  id: string;
  slug: string;
  title: { el: string; en: string };
  description: { el: string; en: string };
  price: number;
  transactionType: 'buy' | 'rent';
  propertyType: 'apartment' | 'villa' | 'house' | 'land' | 'penthouse';
  specifications: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    plotSize?: number;
    yearBuilt?: number;
    energyClass?: string;
  };
  // ... additional fields
}
```

### Adding Properties
1. Add property data to `data/properties/properties.json`
2. Ensure bilingual content for title, description, location, and features
3. Include high-quality images from Pexels or similar stock photo services
4. Set appropriate SEO metadata for both locales

## 🔍 SEO & Performance

### Metadata
- Localized page titles and descriptions
- Open Graph and Twitter cards
- Canonical URLs with proper hreflang
- Structured data for properties

### Performance Optimizations
- Static generation for all pages
- Image optimization with Next/Image
- Route-level code splitting
- Prefetch on viewport entry

## 🎯 Key Pages & Features

### Home Page (`/[locale]`)
- Hero section with property showcase
- Quick filter navigation
- Featured properties grid
- About section with values

### Properties (`/[locale]/properties`)
- Advanced filtering with URL synchronization
- Server-side filtering and sorting
- Property cards with optimized images
- Responsive grid layout

### Property Detail (`/[locale]/properties/[slug]`)
- Image gallery with navigation
- Comprehensive specifications
- Enquiry form integration
- Related properties suggestions

### Services (`/[locale]/services`)
- Service categories with detailed descriptions
- Process explanation with steps
- Call-to-action sections

### About (`/[locale]/about`)
- Professional biography
- Values and expertise showcase
- Statistics and achievements
- Contact information

### Contact (`/[locale]/contact`)
- Contact form with validation
- Office information and hours
- Interactive elements (WhatsApp, phone)
- Map integration placeholder

## 🚀 Deployment

The website is optimized for static export and can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS S3 + CloudFront
- Any static hosting provider

### Build Configuration
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
};
```

## 🤝 Contributing

1. Follow the established code structure and naming conventions
2. Add translations for both Greek and English
3. Test on multiple devices and screen sizes
4. Ensure accessibility compliance
5. Maintain the architectural design aesthetic

## 📞 Support

For questions about implementation or customization, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Built with ❤️ in Athens, Greece**