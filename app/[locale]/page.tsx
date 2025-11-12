import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/schema/property';
import { PropertyCard } from '@/components/site/property-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CircleCheck as CheckCircle, Award, Users, TrendingUp } from 'lucide-react';

// Import properties data
import propertiesData from '@/data/properties/properties.json';

interface HomePageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: HomePageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' });
  
  return {
    title: t('title') + ' | Nikos Karinopoulos',
    description: t('subtitle'),
    alternates: {
      languages: {
        'el': '/el',
        'en': '/en',
      },
    },
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslations('hero');
  const tAbout = await getTranslations('about');
  const tProperty = await getTranslations('property');

  // Get featured properties
  const properties = propertiesData as Property[];
  const featuredProperties = properties.filter(property => property.featured).slice(0, 6);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt={locale === 'el' ? 'Θέα της Αθήνας' : 'Athens View'}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight drop-shadow-2xl">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-medium">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl border border-blue-600">
                {t('cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/services`}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/80 text-white hover:bg-white hover:text-neutral-900 px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl backdrop-blur-sm bg-white/10"
              >
                {locale === 'el' ? 'Υπηρεσίες' : 'Our Services'}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2 font-medium">
              {locale === 'el' ? 'Κάντε scroll' : 'Scroll down'}
            </span>
            <div className="w-0.5 h-8 bg-white/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Location Badge */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-2xl px-8 py-4 shadow-xl">
              <div className="flex items-center gap-3 text-neutral-800">
                <div className="w-3 h-3 bg-blue-700 rounded-full animate-pulse"></div>
                <span className="font-semibold">
                  {locale === 'el' ? 'Εξυπηρετούμε: Αθήνα • Πειραιάς • Νησιά Αιγαίου' : 'Serving: Athens • Piraeus • Aegean Islands'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Properties */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {locale === 'el' ? 'Επιλεγμένα Ακίνητα' : 'Featured Properties'}
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {locale === 'el' 
              ? 'Ανακαλύψτε μία επιλογή από τα πιο εξαιρετικά ακίνητά μας'
              : 'Discover a selection of our most exceptional properties'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              locale={locale}
            />
          ))}
        </div>

      </section>

      {/* About Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {tAbout('title')}
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                    {tAbout('description')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{tAbout('values.title')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-700" />
                      <span>{tAbout('values.integrity')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-700" />
                      <span>{tAbout('values.expertise')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-700" />
                      <span>{tAbout('values.service')}</span>
                    </div>
                  </div>
                </div>

                <Link href={`/${locale}/about`}>
                  <Button variant="outline" className="rounded-2xl">
                    {locale === 'el' ? 'Μάθετε Περισσότερα' : 'Learn More'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Nikos Karinopoulos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-700/10 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}