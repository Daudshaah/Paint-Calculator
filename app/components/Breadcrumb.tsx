// components/Breadcrumb.tsx
// Add to any page for breadcrumb navigation + schema
// Usage: <Breadcrumb items={[{label: 'Calculators', href: '/en/calculators'}, {label: 'Bedroom'}]} locale="en" />

import Link from 'next/link';
import SchemaOrg from './SchemaOrg';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  locale: string;
}

const BASE_URL = 'https://www.thepaintcalculator.com';

export default function Breadcrumb({ items, locale }: Props) {
  const allItems = [
    { label: 'Home', href: `/${locale}` },
    ...items,
  ];

  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: item.href ? `${BASE_URL}${item.href}` : BASE_URL,
  }));

  return (
    <>
      <SchemaOrg type="BreadcrumbList" items={schemaItems} />
      <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {item.href && index < allItems.length - 1 ? (
                <Link href={item.href} className="hover:text-blue-600 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
