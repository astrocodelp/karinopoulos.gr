import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp, Home, Calculator, Settings, ArrowRight, CheckCircle } from 'lucide-react';

interface ServicesPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: ServicesPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' });
  
  return {
    title: t('title') + ' | Nikos Karinopoulos',
    description: t('subtitle'),
    alternates: {
      languages: {
        'el': '/el/services',
        'en': '/en/services',
      },
    },
  };
}

export default async function ServicesPage({ params: { locale } }: ServicesPageProps) {
  const t = await getTranslations('services');

  const services = [
    {
      icon: TrendingUp,
      title: t('selling.title'),
      description: t('selling.description'),
      color: 'blue',
      features: locale === 'el' 
        ? ['Αξιολόγηση Ακινήτου', 'Φωτογράφιση & Προώθηση', 'Διαπραγμάτευση', 'Νομική Υποστήριξη']
        : ['Property Valuation', 'Photography & Marketing', 'Negotiation', 'Legal Support']
    },
    {
      icon: Home,
      title: t('buying.title'),
      description: t('buying.description'),
      color: 'emerald',
      features: locale === 'el'
        ? ['Εύρεση Ακινήτου', 'Επισκέψεις & Αξιολόγηση', 'Διαπραγμάτευση Τιμής', 'Νομικός Έλεγχος']
        : ['Property Search', 'Viewings & Assessment', 'Price Negotiation', 'Legal Checks']
    },
    {
      icon: Calculator,
      title: t('valuation.title'),
      description: t('valuation.description'),
      color: 'amber',
      features: locale === 'el'
        ? ['Ανάλυση Αγοράς', 'Σύγκριση Ιδιοκτησιών', 'Επίσημη Εκτίμηση', 'Συμβουλές Βελτίωσης']
        : ['Market Analysis', 'Property Comparison', 'Official Valuation', 'Improvement Advice']
    },
    {
      icon: Settings,
      title: t('management.title'),
      description: t('management.description'),
      color: 'purple',
      features: locale === 'el'
        ? ['Διαχείριση Ενοικίασης', 'Συντήρηση Ακινήτου', 'Οικονομική Διαχείριση', 'Νομική Υποστήριξη']
        : ['Rental Management', 'Property Maintenance', 'Financial Management', 'Legal Support']
    },
  ];

  const colorClasses = {
    blue: {
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      accentColor: 'text-blue-700'
    },
    emerald: {
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      accentColor: 'text-emerald-700'
    },
    amber: {
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      borderColor: 'border-amber-200',
      accentColor: 'text-amber-700'
    },
    purple: {
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      accentColor: 'text-purple-700'
    },
  };

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

      {/* Services Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, index) => {
            const colors = colorClasses[service.color as keyof typeof colorClasses];
            const IconComponent = service.icon;
            
            return (
              <div 
                key={index} 
                className={`bg-white border ${colors.borderColor} rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  <IconComponent className={`h-8 w-8 ${colors.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-neutral-600 text-lg mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className={`h-5 w-5 ${colors.accentColor}`} />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/${locale}/contact`}>
                  <Button 
                    variant="outline" 
                    className={`w-full rounded-xl border-2 ${colors.borderColor} hover:bg-neutral-50 transition-colors`}
                  >
                    {locale === 'el' ? 'Μάθετε Περισσότερα' : 'Learn More'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">
              {locale === 'el' ? 'Η Διαδικασία μου' : 'My Process'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  number: '01',
                  title: locale === 'el' ? 'Κατανόηση Αναγκών' : 'Understanding Needs',
                  description: locale === 'el' 
                    ? 'Ακούω προσεκτικά τις ανάγκες και τους στόχους σας'
                    : 'I listen carefully to your needs and goals'
                },
                {
                  number: '02',
                  title: locale === 'el' ? 'Έρευνα & Ανάλυση' : 'Research & Analysis',
                  description: locale === 'el'
                    ? 'Αναλύω την αγορά και προτείνω τις καλύτερες επιλογές'
                    : 'I analyze the market and suggest the best options'
                },
                {
                  number: '03',
                  title: locale === 'el' ? 'Παρουσίαση & Καθοδήγηση' : 'Presentation & Guidance',
                  description: locale === 'el'
                    ? 'Παρουσιάζω τις επιλογές και σας καθοδηγώ στην απόφαση'
                    : 'I present options and guide you in your decision'
                },
                {
                  number: '04',
                  title: locale === 'el' ? 'Υλοποίηση & Υποστήριξη' : 'Implementation & Support',
                  description: locale === 'el'
                    ? 'Διαχειρίζομαι όλη τη διαδικασία μέχρι την ολοκλήρωση'
                    : 'I manage the entire process until completion'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-neutral-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">
            {locale === 'el' ? 'Έτοιμοι να Ξεκινήσετε;' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {locale === 'el' 
              ? 'Επικοινωνήστε μαζί μου για μια δωρεάν συμβουλή'
              : 'Contact me for a free consultation'
            }
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-neutral-100 rounded-2xl px-8 py-4 text-lg">
              {locale === 'el' ? 'Επικοινωνία' : 'Contact Me'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}