# 0dev.io - Premium Developer Domain Landing Page

A professional, SEO-optimized Next.js landing page for the premium developer domain **0dev.io**. Built with modern technologies, Google Analytics integration, and monetization readiness.

## 🚀 Features

### ✨ Design & UX
- **Modern Dark Mode Design** - Clean, professional UI with Tailwind CSS
- **Fully Responsive** - Optimized for desktop, tablet, and mobile
- **Smooth Animations** - Engaging user experience with custom animations
- **Fast Loading** - Optimized assets and code splitting

### 🔍 SEO Optimization
- **Complete Meta Tags** - Title, description, keywords
- **Open Graph & Twitter Cards** - Social media optimization
- **Structured Data (Schema.org)** - WebSite, Organization, and Product schemas
- **Canonical URLs** - Proper SEO structure
- **Keyword-Rich Content** - Targeted for developer and tech startup searches

### 📊 Analytics & Tracking
- **Google Analytics 4 (GA4)** - Tracking ID: `G-NVCRDB7ECY`
- **Page View Tracking** - Automatic route change tracking
- **Event Tracking** - CTA clicks, email interactions, tool clicks
- **Custom Events** - Comprehensive user engagement tracking

### 💰 Monetization Ready
- **Google AdSense Placeholder** - Easy integration for ads
- **Sedo Parking Compatible** - Alternative monetization option
- **Ad Section Component** - Dedicated space for advertisements

### 📱 Content Sections
1. **Hero Section** - Domain sale CTA with key statistics
2. **News Bar** - Rotating announcements for engagement
3. **Domain Value** - Why 0dev.io is premium (6 key points)
4. **Tools Showcase** - 6 developer tool cards
5. **Features** - Code examples and use cases
6. **Stats Dashboard** - Traffic chart with canvas rendering
7. **Backlinks** - Social proof from major tech sites
8. **Ad Section** - Monetization placeholder
9. **CTA** - Final acquisition call-to-action
10. **Footer** - Navigation and contact

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel / Netlify ready

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Navigate to project directory:**
   ```powershell
   cd nextjs-site
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Run development server:**
   ```powershell
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```powershell
   vercel login
   ```

3. **Deploy:**
   ```powershell
   vercel
   ```

4. **Production deployment:**
   ```powershell
   vercel --prod
   ```

### Deploy to Netlify

1. **Build the project:**
   ```powershell
   npm run build
   ```

2. **Install Netlify CLI:**
   ```powershell
   npm install -g netlify-cli
   ```

3. **Deploy:**
   ```powershell
   netlify deploy --prod
   ```

### Static Export (Optional)

For static hosting (GitHub Pages, AWS S3, etc.):

```powershell
npm run export
```

The static site will be in the `out` directory.

## 🔧 Configuration

### Google Analytics

The GA4 tracking ID is already configured in:
- **File**: `lib/gtag.ts`
- **Tracking ID**: `G-NVCRDB7ECY`

To change it, edit `lib/gtag.ts`:
```typescript
export const GA_TRACKING_ID = 'YOUR-GA4-ID';
```

### Google AdSense Integration

1. **Get your AdSense client ID** from Google AdSense dashboard

2. **Uncomment the AdSense script** in `pages/_document.tsx`:
   ```tsx
   <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossOrigin="anonymous"
   />
   ```

3. **Replace placeholder in `components/AdSection.tsx`** with your ad unit code:
   ```tsx
   <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   ```

### SEO Customization

Edit SEO data in `lib/seo-config.ts`:

```typescript
export const siteConfig = {
  name: '0dev.io',
  title: 'Your Custom Title',
  description: 'Your Custom Description',
  url: 'https://0dev.io',
  // ... more options
};
```

### Domain Customization

To use your own domain:

1. **Update siteConfig** in `lib/seo-config.ts`
2. **Update contact email** in components
3. **Configure domain** in your hosting platform (Vercel/Netlify)

## 📁 Project Structure

```
nextjs-site/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── DomainValue.tsx # Domain value highlights
│   ├── Tools.tsx       # Tools showcase
│   ├── Features.tsx    # Features section
│   ├── Stats.tsx       # Traffic stats & chart
│   ├── NewsBar.tsx     # News ticker
│   ├── AdSection.tsx   # Advertisement placeholder
│   ├── CTA.tsx         # Call-to-action
│   └── Footer.tsx      # Footer
├── lib/                # Utilities
│   ├── gtag.ts         # Google Analytics
│   └── seo-config.ts   # SEO configuration
├── pages/              # Next.js pages
│   ├── _app.tsx        # App wrapper
│   ├── _document.tsx   # HTML document
│   └── index.tsx       # Home page
├── public/             # Static assets
├── styles/             # Global styles
│   └── globals.css     # Tailwind & custom CSS
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#6366f1',  // Main brand color
    600: '#4f46e5',  // Hover state
  },
  dark: {
    900: '#0a0a0f',  // Background
    800: '#13131a',  // Secondary bg
  }
}
```

### Content

1. **Hero Section**: Edit `components/Hero.tsx`
2. **Tools**: Modify tools array in `components/Tools.tsx`
3. **Domain Value**: Update values in `components/DomainValue.tsx`
4. **Contact Email**: Search and replace `contact@0dev.io`

### Fonts

Change fonts in `tailwind.config.js` and update Google Fonts in `pages/_document.tsx`.

## 📊 Analytics Events

Track custom events:

```typescript
import { trackCTAClick, trackEmailClick, trackToolCardClick } from '@/lib/gtag';

// Track CTA clicks
trackCTAClick('hero-section');

// Track email clicks
trackEmailClick();

// Track tool interactions
trackToolCardClick('AI Code Assistant');
```

## 🔒 Security

- **HTTPS**: Always use HTTPS in production
- **Environment Variables**: Use `.env.local` for sensitive data
- **CSP Headers**: Configure in `next.config.js`

## 📈 Performance Optimization

- **Image Optimization**: Use Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Components load on demand
- **Minification**: Production builds are minified
- **Compression**: Gzip enabled in config

## 🐛 Troubleshooting

### TypeScript Errors

Run to install dependencies:
```powershell
npm install
```

### Build Errors

Clear cache and rebuild:
```powershell
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Port Already in Use

Change port:
```powershell
npm run dev -- -p 3001
```

## 📝 License

MIT License - Free to use for your domain landing pages.

## 📧 Contact

For domain inquiries: **contact@0dev.io**

## 🎯 Marketing Tips

1. **Set up Google Search Console** - Monitor search performance
2. **Build backlinks** - Reach out to tech blogs and directories
3. **Social media** - Share on LinkedIn, Twitter, Reddit
4. **Domain marketplaces** - List on Sedo, Afternic, Dan.com
5. **Content marketing** - Write blog posts about developer tools
6. **Email outreach** - Contact potential buyers directly

## 🚀 Next Steps

1. ✅ Install dependencies
2. ✅ Run development server
3. ⬜ Customize content and branding
4. ⬜ Add Google AdSense code
5. ⬜ Configure custom domain
6. ⬜ Deploy to production
7. ⬜ Set up Google Search Console
8. ⬜ Start marketing campaign

---

**Built with ❤️ for premium domain sales**
