'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property } from '@/schema/property';
import { PropertyCard } from '@/components/site/property-card';
import { PropertyFilters } from '@/components/site/property-filters';

import propertiesData from '@/data/properties/properties.json';

interface PropertiesPageProps {
  params: { locale: string };
}

function filterProperties(properties: Property[], searchParams: URLSearchParams): Property[] {
  let filtered = [...properties];

  const type = searchParams.get('type');
  const propertyType = searchParams.get('propertyType');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const bedrooms = searchParams.get('bedrooms');
  const location = searchParams.get('location');
  const sortBy = searchParams.get('sortBy') || 'date';

  if (type && type !== '') {
    filtered = filtered.filter(p => p.transactionType === type);
  }

  if (propertyType && propertyType !== '') {
    filtered = filtered.filter(p => p.propertyType === propertyType);
  }

  if (minPrice) {
    const min = parseInt(minPrice);
    filtered = filtered.filter(p => p.price >= min);
  }
  if (maxPrice) {
    const max = parseInt(maxPrice);
    filtered = filtered.filter(p => p.price <= max);
  }

  if (bedrooms) {
    const minBedrooms = parseInt(bedrooms);
    filtered = filtered.filter(p => p.specifications.bedrooms >= minBedrooms);
  }

  if (location && location !== '') {
    const locationKey = location.toLowerCase();
    filtered = filtered.filter(p => {
      const locationEl = p.location.el.toLowerCase();
      const locationEn = p.location.en.toLowerCase();
      return locationEl.includes(locationKey) || locationEn.includes(locationKey);
    });
  }

  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'area-asc':
      filtered.sort((a, b) => a.specifications.area - b.specifications.area);
      break;
    case 'area-desc':
      filtered.sort((a, b) => b.specifications.area - a.specifications.area);
      break;
    default:
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }

  return filtered;
}

export default function PropertiesPage({ params: { locale } }: PropertiesPageProps) {
  const searchParams = useSearchParams();
  const properties = propertiesData as Property[];
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);

  useEffect(() => {
    setFilteredProperties(filterProperties(properties, searchParams));
  }, [searchParams, properties]);

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          {locale === 'el' ? 'Ακίνητα' : 'Properties'}
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          {locale === 'el'
            ? 'Ανακαλύψτε εξαιρετικά ακίνητα στα πιο όμορφα μέρη της Ελλάδας'
            : 'Discover exceptional properties in the most beautiful places in Greece'
          }
        </p>
      </div>

      <PropertyFilters locale={locale} />

      <div>
        <div className="flex justify-between items-center mb-8">
          <p className="text-neutral-600">
            {locale === 'el'
              ? `${filteredProperties.length} ακίνητα βρέθηκαν`
              : `${filteredProperties.length} properties found`
            }
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-600 mb-4">
              {locale === 'el'
                ? 'Δεν βρέθηκαν ακίνητα με αυτά τα κριτήρια'
                : 'No properties found with these criteria'
              }
            </p>
            <p className="text-neutral-500">
              {locale === 'el'
                ? 'Δοκιμάστε να αλλάξετε τα φίλτρα σας'
                : 'Try changing your filters'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}