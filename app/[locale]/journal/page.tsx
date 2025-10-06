import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, ArrowRight, Clock } from 'lucide-react';

interface JournalPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: JournalPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'journal' });
  
  return {
    title: t('title') + ' | Nikos Karinopoulos',
    description: t('subtitle'),
    alternates: {
      languages: {
        'el': '/el/journal',
        'en': '/en/journal',
      },
    },
  };
}

export default async function JournalPage({ params: { locale } }: JournalPageProps) {
  const t = await getTranslations('journal');
  
  // Mock articles data
  const articles = [
    {
      id: 1,
      title: locale === 'el' 
        ? 'Τάσεις της Αγοράς Ακινήτων στα Κυκλαδικά Νησιά 2024'
        : 'Real Estate Market Trends in the Cycladic Islands 2024',
      excerpt: locale === 'el'
        ? 'Μια λεπτομερής ανάλυση των τάσεων της αγοράς ακινήτων στα Κυκλαδικά νησιά για το 2024.'
        : 'A detailed analysis of real estate market trends in the Cycladic islands for 2024.',
      date: '2024-01-15',
      category: locale === 'el' ? 'Ανάλυση Αγοράς' : 'Market Analysis',
      readTime: '5 min'
    },
    {
      id: 2,
      title: locale === 'el'
        ? 'Επενδύοντας σε Ακίνητα στην Μύκονο: Οδηγός για Αρχάριους'
        : 'Investing in Mykonos Real Estate: A Beginner\'s Guide',
      excerpt: locale === 'el'
        ? 'Όλα όσα πρέπει να γνωρίζετε πριν επενδύσετε σε ακίνητα στη Μύκονο.'
        : 'Everything you need to know before investing in Mykonos real estate.',
      date: '2024-01-10',
      category: locale === 'el' ? 'Επενδυτικός Οδηγός' : 'Investment Guide',
      readTime: '8 min'
    },
    {
      id: 3,
      title: locale === 'el'
        ? 'Η Εξέλιξη των Τιμών Ακινήτων στην Αθήνα το 2023'
        : 'Athens Property Price Evolution in 2023',
      excerpt: locale === 'el'
        ? 'Αναδρομική ματιά στην εξέλιξη των τιμών ακινήτων στην Αθήνα κατά το 2023.'
        : 'A retrospective look at Athens property price evolution during 2023.',
      date: '2024-01-05',
      category: locale === 'el' ? 'Στατιστικά' : 'Statistics',
      readTime: '6 min'
    }
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-12">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Featured Article Preview */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-2xl p-12 mb-16">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6" />
              <span className="text-blue-200 uppercase tracking-wide text-sm font-medium">
                {t('comingSoon')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('marketUpdates')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-blue-300" />
                <h3 className="font-semibold mb-2">
                  {t('features.monthly')}
                </h3>
                <p className="text-blue-200 text-sm">
                  {t('features.monthlyDesc')}
                </p>
              </div>
              
              <div className="text-center p-4">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-blue-300" />
                <h3 className="font-semibold mb-2">
                  {t('features.investment')}
                </h3>
                <p className="text-blue-200 text-sm">
                  {t('features.investmentDesc')}
                </p>
              </div>
              
              <div className="text-center p-4">
                <Clock className="h-8 w-8 mx-auto mb-3 text-blue-300" />
                <h3 className="font-semibold mb-2">
                  {t('features.instant')}
                </h3>
                <p className="text-blue-200 text-sm">
                  {t('features.instantDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Sample Articles Preview */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              {t('upcomingTitle')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <div key={article.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-neutral-500 text-xs">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 text-xs">
                      {new Date(article.date).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US')}
                    </span>
                    <Button variant="ghost" size="sm" disabled>
                      {t('comingSoon')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {t('newsletter.title')}
            </h3>
            <p className="text-neutral-600 mb-8">
              {t('newsletter.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
              <Button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl whitespace-nowrap">
                {t('newsletter.subscribe')}
              </Button>
            </div>
            
            <p className="text-xs text-neutral-500 mt-4">
              {t('newsletter.note')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            {t('cta.description')}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-lg rounded-2xl">
              {t('cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}