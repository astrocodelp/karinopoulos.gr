'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, X } from 'lucide-react';

interface PropertyFiltersProps {
  locale: string;
}

export function PropertyFilters({ locale }: PropertyFiltersProps) {
  const t = useTranslations('filters');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isOpen, setIsOpen] = useState(false);
  
  const currentFilters = {
    transactionType: searchParams.get('type') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    location: searchParams.get('location') || '',
    sortBy: searchParams.get('sortBy') || 'date',
  };

  const updateFilters = useCallback((newFilters: Record<string, string>) => {
    const params = new URLSearchParams();
    
    Object.entries({ ...currentFilters, ...newFilters }).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'all') {
        params.set(key, value);
      }
    });

    router.push(`/${locale}/properties?${params.toString()}`);
  }, [currentFilters, router, locale]);

  const clearFilters = () => {
    router.push(`/${locale}/properties`);
    setIsOpen(false);
  };

  const hasActiveFilters = Object.values(currentFilters).some(value => value !== '' && value !== 'date' && value !== 'all');

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {t('filters')}
          {hasActiveFilters && <span className="bg-blue-700 text-white px-2 py-0.5 rounded-full text-xs">!</span>}
        </Button>
      </div>

      {/* Filters Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-6 gap-4 ${isOpen || 'max-md:hidden'}`}>
        {/* Transaction Type */}
        <div>
          <Label className="text-sm font-medium text-neutral-700">{t('transactionType')}</Label>
          <Select value={currentFilters.transactionType} onValueChange={(value) => updateFilters({ transactionType: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={t('all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              <SelectItem value="buy">{t('buy')}</SelectItem>
              <SelectItem value="rent">{t('rent')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div>
          <Label className="text-sm font-medium text-neutral-700">{t('propertyType')}</Label>
          <Select value={currentFilters.propertyType} onValueChange={(value) => updateFilters({ propertyType: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={t('all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              <SelectItem value="apartment">{t('apartment')}</SelectItem>
              <SelectItem value="villa">{t('villa')}</SelectItem>
              <SelectItem value="house">{t('house')}</SelectItem>
              <SelectItem value="land">{t('land')}</SelectItem>
              <SelectItem value="penthouse">{t('penthouse')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-neutral-700">{t('priceRange')}</Label>
          <div className="flex gap-2 mt-1">
            <Input
              placeholder="Min"
              value={currentFilters.minPrice}
              onChange={(e) => updateFilters({ minPrice: e.target.value })}
              className="text-sm"
            />
            <Input
              placeholder="Max"
              value={currentFilters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: e.target.value })}
              className="text-sm"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <Label className="text-sm font-medium text-neutral-700">{t('bedrooms')}</Label>
          <Select value={currentFilters.bedrooms} onValueChange={(value) => updateFilters({ bedrooms: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={t('all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Label className="text-sm font-medium text-neutral-700">{t('location')}</Label>
          <Select value={currentFilters.location} onValueChange={(value) => updateFilters({ location: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={t('all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              <SelectItem value="mykonos">{locale === 'el' ? 'Μύκονος' : 'Mykonos'}</SelectItem>
              <SelectItem value="paros">{locale === 'el' ? 'Πάρος' : 'Paros'}</SelectItem>
              <SelectItem value="athens">{locale === 'el' ? 'Αθήνα' : 'Athens'}</SelectItem>
              <SelectItem value="santorini">{locale === 'el' ? 'Σαντορίνη' : 'Santorini'}</SelectItem>
              <SelectItem value="crete">{locale === 'el' ? 'Κρήτη' : 'Crete'}</SelectItem>
              <SelectItem value="naxos">{locale === 'el' ? 'Νάξος' : 'Naxos'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <Label className="text-sm font-medium text-neutral-700">{t('sortBy')}</Label>
          <Select value={currentFilters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">{t('sortDate')}</SelectItem>
              <SelectItem value="price-asc">{t('sortPrice')} (↑)</SelectItem>
              <SelectItem value="price-desc">{t('sortPrice')} (↓)</SelectItem>
              <SelectItem value="area-asc">{t('sortArea')} (↑)</SelectItem>
              <SelectItem value="area-desc">{t('sortArea')} (↓)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm"
          >
            <X className="h-4 w-4" />
            {t('clear')}
          </Button>
        </div>
      )}
    </div>
  );
}