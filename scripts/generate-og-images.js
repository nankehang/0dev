const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateOGImage(title, tags = [], outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport to OG image dimensions
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
  });

  // Load the OG template
  const templatePath = path.join(__dirname, 'og-template.html');
  const templateUrl = `file://${templatePath}?title=${encodeURIComponent(title)}&tags=${encodeURIComponent(tags.join(','))}`;

  await page.goto(templateUrl, { waitUntil: 'networkidle0' });

  // Wait a bit for animations to settle
  await page.waitForTimeout(1000);

  // Take screenshot
  await page.screenshot({
    path: outputPath,
    type: 'png',
    fullPage: false
  });

  await browser.close();
  console.log(`Generated OG image: ${outputPath}`);
}

// Generate OG images for common posts
async function generateAllOGImages() {
  const posts = [
    {
      title: 'Welcome to 0dev.io Blog',
      tags: ['hacking', 'malware', 'research'],
      slug: 'welcome-to-0dev-io-blog'
    },
    // Add more posts as needed
  ];

  for (const post of posts) {
    const outputPath = path.join(__dirname, `og-${post.slug}.png`);
    await generateOGImage(post.title, post.tags, outputPath);
  }
}

// If run directly, generate all images
if (require.main === module) {
  generateAllOGImages().catch(console.error);
}

module.exports = { generateOGImage };