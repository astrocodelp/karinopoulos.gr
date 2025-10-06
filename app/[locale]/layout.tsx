import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navigation } from '@/components/site/navigation';
import { Footer } from '@/components/site/footer';

export function generateStaticParams() {
  return [{ locale: 'el' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation locale={locale} />
      <main className="min-h-screen pt-16">
        {children}
      </main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}