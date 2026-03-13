import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE = 'https://www.thepaintcalculator.com/en';
const now = new Date();

// ─── Folders to EXCLUDE (not real content pages) ──────────────────────────────
const EXCLUDE = new Set([
  'blog', // not built yet — remove this line when blog is ready
]);

// ─── Priority rules — automatically assigned based on slug pattern ────────────
function getPriority(slug: string): number {
  // Hub pages
  const hubs = ['calculators','how-much-paint','cost-guides','painting-guides','locations','commercial'];
  if (hubs.includes(slug)) return 0.9;

  // Main room calculators (exact room names, no location suffix)
  const roomCalcs = ['bedroom-paint-calculator','bathroom-paint-calculator','kitchen-paint-calculator',
    'living-room-paint-calculator','ceiling-paint-calculator','garage-paint-calculator',
    'basement-paint-calculator','hallway-paint-calculator','nursery-paint-calculator',
    'dining-room-paint-calculator','cabinet-paint-calculator'];
  if (roomCalcs.includes(slug)) return 0.8;

  // Any other calculator without a location suffix
  if (slug.endsWith('-calculator') || slug.endsWith('-calculator-for-contractors')) return 0.8;

  // How much paint pages
  if (slug.startsWith('how-much-paint-') || slug.startsWith('how-many-gallons-')) return 0.7;

  // How-to guides & painting guides
  if (slug.startsWith('how-to-') || slug.startsWith('best-paint') || slug.startsWith('best-exterior') ||
      slug.startsWith('do-i-need') || slug.startsWith('interior-vs') || slug.startsWith('one-coat') ||
      slug.startsWith('paint-coverage') || slug.startsWith('paint-finish') || slug.startsWith('spray-paint-vs') ||
      slug.startsWith('how-long-to') || slug.startsWith('how-many-coats')) return 0.7;

  // Cost guides
  if (slug.startsWith('cost-to-paint') || slug.startsWith('how-much-does-it-cost')) return 0.7;

  // Static pages
  if (['faq','how-it-works','tips-and-tricks','help','write-for-us'].includes(slug)) return 0.6;
  if (['contact','privacy','terms'].includes(slug)) return 0.3;

  // US state pages (paint-calculator-texas = 3 words after splitting on -)
  if (slug.startsWith('paint-calculator-') && slug.split('-').length === 3) return 0.6;

  // US city pages (paint-calculator-new-york-city-ny = more words)
  if (slug.startsWith('paint-calculator-') && slug.split('-').length > 3) return 0.6;

  // Room × location variants (bedroom-paint-calculator-texas etc.)
  if (slug.includes('-calculator-') && !slug.endsWith('-calculator')) return 0.5;
  if (slug.startsWith('paint-cost-calculator-') || slug.startsWith('whole-house-paint-calculator-') ||
      slug.startsWith('exterior-paint-calculator-')) return 0.5;

  // Default for any new page type
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localeDir = path.join(process.cwd(), 'app', '[locale]');

  // Automatically read ALL folders inside app/[locale]/
  let slugs: string[] = [];
  try {
    slugs = fs.readdirSync(localeDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !EXCLUDE.has(d.name))
      .map(d => d.name)
      .sort();
  } catch (e) {
    console.error('Sitemap: could not read locale dir', e);
  }

  const entries: MetadataRoute.Sitemap = [
    // Homepage always first with highest priority
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    }
  ];

  for (const slug of slugs) {
    const priority = getPriority(slug);
    entries.push({
      url: `${BASE}/${slug}`,
      lastModified: now,
      changeFrequency: priority >= 0.8 ? 'weekly' : 'monthly',
      priority,
    });
  }

  return entries;
}

// =============================================================================
// THIS SITEMAP IS FULLY AUTOMATIC.
//
// When you add a new page folder inside app/[locale]/:
//   → It is automatically included in the sitemap on next deploy.
//   → No manual edits needed here ever.
//
// The only thing you may need to do:
//   → If a new page type doesn't get the right priority,
//     add a rule in the getPriority() function above.
//
// To exclude a page from sitemap (e.g. unfinished pages):
//   → Add its folder name to the EXCLUDE set at the top.
// =============================================================================
