import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface ContactLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: ContactLayoutProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  return {
    title: t('title') + ' | Nikos Karinopoulos',
    description: t('subtitle'),
    alternates: {
      languages: {
        'el': '/el/contact',
        'en': '/en/contact',
      },
    },
  };
}

export default function ContactLayout({
  children,
}: ContactLayoutProps) {
  return <>{children}</>;
}