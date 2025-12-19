import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, tags } = req.query;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title parameter is required' });
  }

  // Sanitize input to prevent SSTI attacks
  const sanitizedTitle = title.replace(/[<>\"'&]/g, '').substring(0, 100);
  const tagsArray = Array.isArray(tags) ? tags : [tags].filter(Boolean);
  const sanitizedTags = tagsArray
    .filter((tag): tag is string => tag !== undefined && tag !== null)
    .map(tag => tag.toString().replace(/[<>\"'&]/g, '').substring(0, 50))
    .slice(0, 5); // Limit to 5 tags
  const tagsString = sanitizedTags.join(',');

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();

    // Set viewport to OG image dimensions
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1,
    });

    // Load the OG template with sanitized parameters
    const templatePath = path.join(process.cwd(), 'public', 'og', 'og-template.html');
    const templateUrl = `file://${templatePath}?title=${encodeURIComponent(sanitizedTitle)}&tags=${encodeURIComponent(tagsString)}`;

    await page.goto(templateUrl, { waitUntil: 'networkidle0' });

    // Wait for the title element to be rendered
    await page.waitForSelector('#title', { timeout: 5000 });

    // Take screenshot as buffer
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    await browser.close();

    // Set headers for PNG image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Content-Length', screenshot.length);

    // Send the image
    res.status(200).send(screenshot);

  } catch (error) {
    console.error('Error generating OG image:', error);
    res.status(500).json({ error: 'Failed to generate OG image' });
  }
}