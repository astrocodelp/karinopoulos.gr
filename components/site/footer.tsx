import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Chrome as Home, Phone, Mail, MapPin, Globe, Heart } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const tContact = useTranslations('contact.info');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-neutral-300">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-700 to-amber-500"></div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Home className="h-8 w-8 text-blue-400" />
                <div>
                  <span className="text-2xl font-bold text-white">Karinopoulos</span>
                  <div className="text-blue-400 text-sm font-medium">
                    {t('tagline')}
                  </div>
                </div>
              </div>
              
              <p className="text-neutral-400 leading-relaxed text-lg max-w-md">
                {t('description')}
              </p>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>{locale === 'el' ? 'Αθήνα, Ελλάδα' : 'Athens, Greece'}</span>
                </div>
                <div className="w-1 h-1 bg-neutral-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span>{locale === 'el' ? 'Παγκόσμια Εξυπηρέτηση' : 'Global Service'}</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">150+</div>
                <div className="text-xs text-neutral-400 uppercase tracking-wide">
                  {locale === 'el' ? 'Ακίνητα' : 'Properties'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-xs text-neutral-400 uppercase tracking-wide">
                  {locale === 'el' ? 'Χρόνια' : 'Years'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-xs text-neutral-400 uppercase tracking-wide">
                  {locale === 'el' ? 'Ικανοποίηση' : 'Satisfaction'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg">{t('quickLinks')}</h3>
            <ul className="space-y-4">
              {[
                { label: tNav('home'), href: `/${locale}` },
                { label: tNav('services'), href: `/${locale}/services` },
                { label: tNav('about'), href: `/${locale}/about` },
                { label: tNav('journal'), href: `/${locale}/journal` },
                { label: tNav('contact'), href: `/${locale}/contact` },
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-neutral-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block group"
                  >
                    <span className="border-b border-transparent group-hover:border-blue-400 transition-colors duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg">{t('contact')}</h3>
            
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-800/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wide">{t('phone')}</div>
                    <a 
                      href="tel:+302101234567" 
                      className="text-neutral-300 hover:text-blue-400 transition-colors duration-300 font-medium"
                    >
                      +30 210 123 4567
                    </a>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-800/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wide">{t('email')}</div>
                    <a 
                      href="mailto:info@nikoskarinopoulos.gr" 
                      className="text-neutral-300 hover:text-blue-400 transition-colors duration-300 font-medium break-all"
                    >
                      info@nikoskarinopoulos.gr
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-neutral-800/30 rounded-2xl border border-neutral-700">
              <div className="text-sm text-neutral-400 mb-2">{tContact('hours')}</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{locale === 'el' ? 'Δευ-Παρ:' : 'Mon-Fri:'}</span>
                  <span className="text-neutral-300 font-medium">09:00-18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{locale === 'el' ? 'Σάβ:' : 'Sat:'}</span>
                  <span className="text-neutral-300 font-medium">10:00-15:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{locale === 'el' ? 'Κυρ:' : 'Sun:'}</span>
                  <span className="text-red-400 font-medium">{locale === 'el' ? 'Κλειστά' : 'Closed'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-neutral-500 text-sm">
                © {currentYear} Nikos Karinopoulos. {t('copyright')}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link href={`/${locale}/privacy`} className="text-neutral-500 hover:text-blue-400 transition-colors duration-200">
                  {t('privacy')}
                </Link>
                <div className="w-1 h-1 bg-neutral-600 rounded-full"></div>
                <Link href={`/${locale}/terms`} className="text-neutral-500 hover:text-blue-400 transition-colors duration-200">
                  {t('terms')}
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <span>{locale === 'el' ? 'Σχεδιασμένο με' : 'Crafted with'}</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>{locale === 'el' ? 'στην Αθήνα' : 'in Athens'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}