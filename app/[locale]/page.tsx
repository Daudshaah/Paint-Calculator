import PaintCalculatorClient from './PaintCalculatorClient';
import { Locale } from '@/i18n/config';

export default async function PaintCalculator({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <PaintCalculatorClient locale={locale} />;
}
