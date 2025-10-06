'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LocaleSwitcherProps {
  locale: string;
}

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = () => {
    const newLocale = locale === 'el' ? 'en' : 'el';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLocaleChange}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {locale === 'el' ? 'EN' : 'EL'}
    </Button>
  );
}