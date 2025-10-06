import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/schema/property';
import { formatPrice, formatArea, formatAreaEn } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bed, Bath, Maximize, Calendar, Zap, MapPin, Phone, Mail } from 'lucide-react';

// Import properties data
import propertiesData from '@/data/properties/properties.json';

interface PropertyDetailPageProps {
  params: { 
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const properties = propertiesData as Property[];
  
  const params = [];
  for (const property of properties) {
    params.push({ locale: 'el', slug: property.slug });
    params.push({ locale: 'en', slug: property.slug });
  }
  
  return params;
}

export async function generateMetadata({ params: { locale, slug } }: PropertyDetailPageProps): Promise<Metadata> {
  const properties = propertiesData as Property[];
  const property = properties.find(p => p.slug === slug);
  
  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  const title = property.seo.title[locale as keyof typeof property.seo.title];
  const description = property.seo.description[locale as keyof typeof property.seo.description];

  return {
    title,
    description,
    alternates: {
      languages: {
        'el': `/el/properties/${slug}`,
        'en': `/en/properties/${slug}`,
      },
    },
  };
}

export default async function PropertyDetailPage({ params: { locale, slug } }: PropertyDetailPageProps) {
  const t = await getTranslations('property');
  const tContact = await getTranslations('contact');

  const properties = propertiesData as Property[];
  const property = properties.find(p => p.slug === slug);

  if (!property) {
    notFound();
  }

  const title = property.title[locale as keyof typeof property.title];
  const description = property.description[locale as keyof typeof property.description];
  const location = property.location[locale as keyof typeof property.location];
  const features = property.features[locale as keyof typeof property.features];

  return (
    <div className="pb-12">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href={`/${locale}/properties`}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {locale === 'el' ? 'Πίσω στα Ακίνητα' : 'Back to Properties'}
          </Button>
        </Link>
      </div>

      {/* Gallery */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[60vh]">
            {/* Main Image */}
            <div className="lg:col-span-3 relative rounded-2xl overflow-hidden">
              <Image
                src={property.images[0]}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
            
            {/* Side Images */}
            <div className="grid grid-rows-2 gap-4">
              {property.images.slice(1, 3).map((image, index) => (
                <div key={index} className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={image}
                    alt={`${title} ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.transactionType === 'buy' ? (locale === 'el' ? 'Πώληση' : 'For Sale') : (locale === 'el' ? 'Ενοικίαση' : 'For Rent')}
                </span>
                {property.featured && (
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {locale === 'el' ? 'Επιλεγμένο' : 'Featured'}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              
              <div className="flex items-center gap-2 text-neutral-600 mb-6">
                <MapPin className="h-5 w-5 text-blue-700" />
                <span className="text-lg">{location}</span>
              </div>
              
              <div className="text-3xl font-bold text-blue-700 mb-6">
                {formatPrice(property.price, locale)}
                {property.transactionType === 'rent' && (
                  <span className="text-lg text-neutral-600 font-normal">
                    /{locale === 'el' ? 'μήνα' : 'month'}
                  </span>
                )}
              </div>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-neutral-50 rounded-2xl">
              {property.specifications.bedrooms > 0 && (
                <div className="text-center">
                  <Bed className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{property.specifications.bedrooms}</div>
                  <div className="text-sm text-neutral-600">{t('bedrooms', { count: property.specifications.bedrooms })}</div>
                </div>
              )}
              
              {property.specifications.bathrooms > 0 && (
                <div className="text-center">
                  <Bath className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{property.specifications.bathrooms}</div>
                  <div className="text-sm text-neutral-600">{t('bathrooms', { count: property.specifications.bathrooms })}</div>
                </div>
              )}
              
              {property.specifications.area > 0 && (
                <div className="text-center">
                  <Maximize className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{property.specifications.area.toLocaleString()}</div>
                  <div className="text-sm text-neutral-600">{t('area')}</div>
                </div>
              )}
              
              {property.specifications.yearBuilt && (
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{property.specifications.yearBuilt}</div>
                  <div className="text-sm text-neutral-600">{t('yearBuilt')}</div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {locale === 'el' ? 'Περιγραφή' : 'Description'}
              </h2>
              <p className="text-neutral-700 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('features')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Specifications */}
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('specifications')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.specifications.plotSize && (
                  <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                    <span className="text-neutral-600">{t('plotSize')}</span>
                    <span className="font-semibold">
                      {locale === 'el' ? formatArea(property.specifications.plotSize) : formatAreaEn(property.specifications.plotSize)}
                    </span>
                  </div>
                )}
                
                {property.specifications.energyClass && (
                  <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                    <span className="text-neutral-600">{t('energyClass')}</span>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">{property.specifications.energyClass}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Enquiry Form */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-6">{t('enquire')}</h3>
              
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={tContact('form.name')}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder={tContact('form.email')}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder={tContact('form.phone')}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder={tContact('form.message')}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent resize-none"
                    defaultValue={`${locale === 'el' ? 'Ενδιαφέρομαι για το ακίνητο:' : 'I am interested in the property:'} ${title}`}
                  ></textarea>
                </div>
                
                <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl">
                  {tContact('form.send')}
                </Button>
              </form>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h4 className="font-semibold mb-4">
                  {locale === 'el' ? 'Άμεση Επικοινωνία' : 'Direct Contact'}
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-blue-700" />
                    <a href="tel:+302101234567" className="text-neutral-700 hover:text-blue-700 transition-colors">
                      +30 210 123 4567
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-700" />
                    <a href="mailto:info@nikoskarinopoulos.gr" className="text-neutral-700 hover:text-blue-700 transition-colors">
                      info@nikoskarinopoulos.gr
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-neutral-100 rounded-2xl p-8 text-center">
              <MapPin className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">{t('location')}</h4>
              <p className="text-neutral-600">{location}</p>
              <p className="text-sm text-neutral-500 mt-2">
                {locale === 'el' ? 'Χάρτης διαθέσιμος σύντομα' : 'Map coming soon'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}