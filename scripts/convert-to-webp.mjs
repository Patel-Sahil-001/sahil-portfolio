/**
 * Convert PNG images to WebP format for better performance.
 * Run: node scripts/convert-to-webp.mjs
 * Requires: npm install sharp (one-time)
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';
const QUALITY = 82; // WebP quality (80-85 is sweet spot)

async function convertPngsInDir(dir) {
  const entries = await readdir(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const s = await stat(fullPath);
    if (s.isDirectory()) continue; // skip subdirs
    if (extname(entry).toLowerCase() !== '.png') continue;
    
    const webpPath = fullPath.replace(/\.png$/i, '.webp');
    const originalSize = s.size;
    
    try {
      await sharp(fullPath)
        .webp({ quality: QUALITY })
        .toFile(webpPath);
      
      const webpStat = await stat(webpPath);
      const savings = ((1 - webpStat.size / originalSize) * 100).toFixed(1);
      console.log(`✓ ${entry} → ${basename(webpPath)} (${(originalSize/1024).toFixed(0)}KB → ${(webpStat.size/1024).toFixed(0)}KB, -${savings}%)`);
    } catch (err) {
      console.error(`✗ Failed to convert ${entry}:`, err.message);
    }
  }
}

convertPngsInDir(PUBLIC_DIR);
