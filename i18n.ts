import { getRequestConfig } from 'next-intl/server';

const locales = ['el', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is valid
  const currentLocale = locales.includes(locale as any) ? locale : 'el';

  return {
    locale: currentLocale as string,
    messages: (await import(`./messages/${currentLocale}.json`)).default
  };
});