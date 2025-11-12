import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

interface SuccessStoriesPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: SuccessStoriesPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'successStories' });
  
  return {
    title: t('title') + ' | Nikos Karinopoulos',
    description: t('subtitle'),
    alternates: {
      languages: {
        'el': '/el/success-stories',
        'en': '/en/success-stories',
      },
    },
  };
}

export default async function SuccessStoriesPage({ params: { locale } }: SuccessStoriesPageProps) {
  const t = await getTranslations('successStories');
  
  // Static success stories
  const stories = [
    {
      id: 1,
      title: 'Luxury Villa Sale in Mykonos - Record Breaking Success',
      excerpt: 'Our client successfully sold their luxury villa in Mykonos for over 15% above the asking price within just 3 months, thanks to our specialized marketing approach and extensive network of international buyers.',
      date: '2024-11-01',
      category: 'Property Sale',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Young Family Finds Dream Apartment in Athens',
      excerpt: 'A young family from London found their perfect apartment in the heart of Athens through our personalized property matching service. We helped them navigate the legal process and secure favorable financing terms.',
      date: '2024-10-15',
      category: 'Property Purchase',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Investment Portfolio Growth - Island Properties ROI',
      excerpt: 'An international investor achieved a 23% return on investment through our carefully curated selection of rental properties in the Cycladic islands. Their portfolio now generates consistent monthly income.',
      date: '2024-09-28',
      category: 'Investment Success',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Beachfront Land Development - From Vision to Reality',
      excerpt: 'We facilitated the purchase and development of pristine beachfront land in Santorini for a property development company. Our expertise in local regulations and connections accelerated the project timeline by 6 months.',
      date: '2024-09-10',
      category: 'Development',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
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

      {/* Success Stories Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* All Success Stories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              {t('allStories')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stories.map((story, index) => (
                <article key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {/* Image with Category Badge Overlay */}
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Green Category Badge Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium">
                        {story.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Date with Calendar Icon */}
                    <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(story.date).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 text-neutral-900">
                      {story.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                      {story.excerpt}
                    </p>
                    
                    {/* Read More Link */}
                    <Link 
                      href="#" 
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200"
                    >
                      {t('readMore')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-neutral-600 mb-8">
              {t('cta.description')}
            </p>
            
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-lg rounded-2xl">
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

