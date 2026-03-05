import Link from 'next/link';
import { getTranslations } from '@/i18n';
import { Locale } from '@/i18n/config';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale);
  const currentYear = new Date().getFullYear();

  const makeHref = (slug: string) => `/${locale}/${slug}`;

  const calculators = [
    { label: 'Bedroom Calculator', slug: 'bedroom-paint-calculator' },
    { label: 'Bathroom Calculator', slug: 'bathroom-paint-calculator' },
    { label: 'Kitchen Calculator', slug: 'kitchen-paint-calculator' },
    { label: 'Exterior Calculator', slug: 'exterior-paint-calculator' },
    { label: 'Whole House Calculator', slug: 'whole-house-paint-calculator' },
    { label: 'Primer Calculator', slug: 'primer-calculator' },
    { label: 'Paint Cost Calculator', slug: 'paint-cost-calculator' },
  ];

  const guides = [
    { label: 'How Much Paint 10x10', slug: 'how-much-paint-for-10x10-room' },
    { label: 'How Much Paint Bedroom', slug: 'how-much-paint-for-bedroom' },
    { label: 'How Many Coats', slug: 'how-many-coats-of-paint' },
    { label: 'Do I Need Primer', slug: 'do-i-need-primer-before-painting' },
    { label: 'Cost to Paint a Room', slug: 'how-much-does-it-cost-to-paint-a-room' },
    { label: 'Paint Finish Guide', slug: 'paint-finish-guide' },
  ];

  const blog = [
    { label: 'Best Paint Brands', slug: 'blog/best-paint-brands' },
    { label: 'Paint Finish Guide', slug: 'blog/paint-finish-guide' },
    { label: 'Bedroom Color Ideas', slug: 'blog/bedroom-paint-color-ideas' },
    { label: 'How to Prep Walls', slug: 'blog/how-to-prep-walls-for-painting' },
    { label: 'Exterior Color Trends', slug: 'blog/exterior-paint-color-trends' },
    { label: 'DIY Painting Guides', slug: 'blog/category/diy' },
  ];

  const company = [
    { label: 'About Us', slug: 'about' },
    { label: 'How It Works', slug: 'how-it-works' },
    { label: 'Help', slug: 'help' },
    { label: 'FAQ', slug: 'faq' },
    { label: 'Write for Us', slug: 'write-for-us' },
    { label: 'Contact Us', slug: 'contact' },
    { label: 'Privacy Policy', slug: 'privacy' },
    { label: 'Terms of Service', slug: 'terms' },
  ];

  const locations = [
    { label: 'Texas', slug: 'paint-calculator-texas' },
    { label: 'California', slug: 'paint-calculator-california' },
    { label: 'Florida', slug: 'paint-calculator-florida' },
    { label: 'New York', slug: 'paint-calculator-new-york' },
    { label: 'Georgia', slug: 'paint-calculator-georgia' },
    { label: 'Arizona', slug: 'paint-calculator-arizona' },
    { label: 'Illinois', slug: 'paint-calculator-illinois' },
    { label: 'Ohio', slug: 'paint-calculator-ohio' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        {/* Main footer rows */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.footer.aboutTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t.footer.aboutText}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{t.footer.supportEmail}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{t.footer.available}</span>
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4">
              Calculators
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {calculators.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={makeHref(item.slug)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4">
              Guides
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {guides.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={makeHref(item.slug)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href={makeHref('how-it-works')}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4">
              Blog
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {blog.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={makeHref(item.slug)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href={makeHref('blog')}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View All Posts →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4">
              Company
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {company.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={makeHref(item.slug)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Location strip */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="font-medium text-gray-600">Popular locations:</span>
            {locations.map((loc, idx) => (
              <span key={loc.slug} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-300">|</span>}
                <Link
                  href={makeHref(loc.slug)}
                  className="hover:text-blue-600"
                >
                  {loc.label}
                </Link>
              </span>
            ))}
            <span className="text-gray-300">|</span>
            <Link
              href={`/${locale}`}
              className="hover:text-blue-600"
            >
              View All States →
            </Link>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-gray-200 pt-4 mt-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
            <p>
              {t.footer.copyright.replace('{year}', currentYear.toString())}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={makeHref('privacy')}
                className="hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href={makeHref('write-for-us')}
                className="hover:text-blue-600"
              >
                Write for Us
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href={makeHref('terms')}
                className="hover:text-blue-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
