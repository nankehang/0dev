# 🚀 QUICK START GUIDE - 0dev.io Next.js Website

## ⚡ Installation & Setup (5 minutes)

### Step 1: Install Dependencies
```powershell
cd nextjs-site
npm install
```

### Step 2: Run Development Server
```powershell
npm run dev
```

### Step 3: Open Browser
Visit: http://localhost:3000

---

## 📊 Google Analytics Setup (Already Configured!)

Your GA4 tracking is **already integrated** with ID: `G-NVCRDB7ECY`

### Verify Analytics Working:
1. Visit your site in browser
2. Open browser console (F12)
3. Look for gtag messages
4. Check Google Analytics dashboard (real-time reports)

### Custom Event Tracking:
The site automatically tracks:
- ✅ Page views
- ✅ CTA button clicks
- ✅ Email contact clicks
- ✅ Tool card interactions
- ✅ Section views

---

## 💰 Monetization Setup

### Option 1: Google AdSense

1. **Get AdSense approval** at https://www.google.com/adsense

2. **Find your Publisher ID** (looks like: `ca-pub-XXXXXXXXXXXXXXXX`)

3. **Enable AdSense in `pages/_document.tsx`:**
   - Find line 42 (commented AdSense script)
   - Uncomment it
   - Replace `ca-pub-XXXXXXXXXXXXXXXX` with your ID

4. **Add Ad Units in `components/AdSection.tsx`:**
   - Replace placeholder div (lines 21-29)
   - Add your ad unit code from AdSense dashboard

### Option 2: Sedo Domain Parking

1. Sign up at https://sedo.com/
2. Add your domain to parking
3. Get Sedo's parking code
4. Replace content in `components/AdSection.tsx`

---

## 🚀 Deployment (Production)

### Option A: Deploy to Vercel (Easiest - 2 minutes)

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Option B: Deploy to Netlify

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Option C: Static Export (Any Host)

```powershell
npm run build
npm run export
```

Upload `out/` folder to any static host (GitHub Pages, AWS S3, etc.)

---

## 🎨 Quick Customization

### Change Contact Email
Search and replace: `contact@0dev.io` → `your@email.com`

### Change Domain Name
Edit `lib/seo-config.ts`:
```typescript
export const siteConfig = {
  name: 'YourDomain',
  url: 'https://yourdomain.com',
  // ...
};
```

### Update Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
  }
}
```

---

## ✅ SEO Checklist

After deployment:

1. ⬜ Submit sitemap to Google Search Console
2. ⬜ Set up Google My Business (if applicable)
3. ⬜ Add to domain marketplaces (Sedo, Afternic, Dan.com)
4. ⬜ Share on social media (LinkedIn, Twitter, Reddit)
5. ⬜ Build backlinks from tech blogs
6. ⬜ Create blog content about developer tools
7. ⬜ Set up email campaigns
8. ⬜ Monitor analytics weekly

---

## 🔥 Marketing Tips

### For Domain Sales:

1. **List on Marketplaces:**
   - Sedo.com
   - Afternic.com
   - Dan.com
   - GoDaddy Auctions

2. **Outreach:**
   - Contact startups directly
   - LinkedIn messages to CTOs/Founders
   - Tech startup forums
   - Y Combinator groups

3. **Content Marketing:**
   - Write blog posts
   - Create YouTube videos
   - Twitter threads about dev tools
   - Reddit r/webdev, r/programming

4. **Backlinks:**
   - Submit to directories
   - Guest post on tech blogs
   - Comment on HackerNews
   - Product Hunt listing

---

## 📱 Social Media Templates

### Twitter/X:
```
🚀 0dev.io - Premium Developer Domain for Sale

✅ Short & memorable (4 chars)
✅ 3,000+ monthly searches
✅ 50+ quality backlinks
✅ Perfect for tech startups

Ideal for: AI tools, dev platforms, SaaS products

Serious inquiries: contact@0dev.io

#DomainForSale #StartupDomain #DevTools
```

### LinkedIn:
```
Premium Developer Domain Available: 0dev.io

If you're building a tech startup, developer tools platform, or AI-powered product, this could be your perfect domain.

Why 0dev.io?
• Short, memorable, professional
• High organic search traffic (3,000+/mo)
• Quality backlinks from tech industry
• .io extension (tech standard)
• Instant credibility for your brand

Serious acquisition inquiries: contact@0dev.io

#DomainForSale #TechStartup #DeveloperTools #SaaS
```

---

## 🐛 Common Issues & Fixes

### Issue: TypeScript errors
```powershell
npm install --save-dev @types/react @types/node
```

### Issue: Port 3000 already in use
```powershell
npm run dev -- -p 3001
```

### Issue: Build fails
```powershell
rm -rf .next node_modules
npm install
npm run build
```

---

## 📞 Support

- **Email**: contact@0dev.io
- **GitHub Issues**: Create an issue in repository
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎯 Success Metrics to Track

1. **Traffic**: Monitor Google Analytics daily
2. **Inquiries**: Track email contacts
3. **SEO**: Check search rankings weekly
4. **Backlinks**: Use Ahrefs or SEMrush
5. **Social**: Track engagement on posts
6. **Marketplace**: Monitor views/interest

---

**🚀 Ready to launch? Run `npm run dev` and start customizing!**
