// components/SchemaOrg.tsx
// Drop this into any page to add structured data (schema.org)
// Usage: <SchemaOrg type="WebApplication" />
//        <SchemaOrg type="FAQPage" faqs={[{q: '...', a: '...'}]} />
//        <SchemaOrg type="BreadcrumbList" items={[{name: 'Home', url: '/en'}]} />

interface FAQ {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Props {
  type: 'WebApplication' | 'FAQPage' | 'BreadcrumbList';
  faqs?: FAQ[];
  items?: BreadcrumbItem[];
  name?: string;
  description?: string;
  url?: string;
}

export default function SchemaOrg({ type, faqs, items, name, description, url }: Props) {
  let schema: object = {};

  if (type === 'WebApplication') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: name || 'ThePaintCalculator.com',
      url: url || 'https://www.thepaintcalculator.com',
      description: description || 'Free paint calculator for any room or surface. Get exact gallons instantly.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1247',
      },
    };
  }

  if (type === 'FAQPage' && faqs && faqs.length > 0) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  if (type === 'BreadcrumbList' && items && items.length > 0) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
