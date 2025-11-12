import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Property } from '@/schema/property';
import { formatPrice, formatArea, formatAreaEn } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  locale: string;
}

export function PropertyCard({ property, locale }: PropertyCardProps) {
  const t = useTranslations('property');
  
  const title = property.title[locale as keyof typeof property.title];
  const location = property.location[locale as keyof typeof property.location];
  const features = property.features[locale as keyof typeof property.features];

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Transaction Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
            {property.transactionType === 'buy' ? (locale === 'el' ? 'Πώληση' : 'For Sale') : (locale === 'el' ? 'Ενοικίαση' : 'For Rent')}
          </span>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              {locale === 'el' ? 'Επιλεγμένο' : 'Featured'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-3">
          <p className="text-2xl font-bold text-neutral-900">
            {formatPrice(property.price, locale)}
            {property.transactionType === 'rent' && (
              <span className="text-sm text-neutral-600 font-normal">
                /{locale === 'el' ? 'μήνα' : 'month'}
              </span>
            )}
          </p>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Location */}
        <p className="text-neutral-600 mb-4 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-blue-700 rounded-full"></span>
          {location}
        </p>

        {/* Specifications */}
        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
          {property.specifications.bedrooms > 0 && (
            <span>{property.specifications.bedrooms} {t('bedrooms', { count: property.specifications.bedrooms })}</span>
          )}
          {property.specifications.bathrooms > 0 && (
            <span>•</span>
          )}
          {property.specifications.bathrooms > 0 && (
            <span>{property.specifications.bathrooms} {t('bathrooms', { count: property.specifications.bathrooms })}</span>
          )}
          {property.specifications.area > 0 && (
            <>
              <span>•</span>
              <span>{locale === 'el' ? formatArea(property.specifications.area) : formatAreaEn(property.specifications.area)}</span>
            </>
          )}
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs"
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="text-neutral-500 text-xs px-2 py-1">
                  +{features.length - 3} {locale === 'el' ? 'περισσότερα' : 'more'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact Button */}
        <Link href={`/${locale}/contact`}>
          <Button 
            className="w-full bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-200"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            {locale === 'el' ? 'Επικοινωνία' : 'Contact Us'}
          </Button>
        </Link>
      </div>
    </div>
  );
}