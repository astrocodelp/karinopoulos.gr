import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle, Award, Users, TrendingUp, Phone, Mail, MapPin } from 'lucide-react';

interface AboutPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: AboutPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });
  
  return {
    title: t('title') + ' | ' + t('subtitle'),
    description: t('description'),
    alternates: {
      languages: {
        'el': '/el/about',
        'en': '/en/about',
      },
    },
  };
}

export default async function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = await getTranslations('about');

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-6">
            {t('subtitle')}
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {locale === 'el' 
                  ? 'Περισσότερα από 15 Χρόνια Εμπειρίας'
                  : 'Over 15 Years of Experience'
                }
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                {locale === 'el' 
                  ? 'Εξειδικεύομαι στην εύρεση και προώθηση εξαιρετικών ιδιοκτησιών στα Κυκλαδικά νησιά και την Αθήνα. Η εμπειρία μου και η βαθιά γνώση της ελληνικής αγοράς ακινήτων μου επιτρέπουν να προσφέρω εξατομικευμένες υπηρεσίες υψηλής ποιότητας.'
                  : 'I specialize in finding and promoting exceptional properties in the Cycladic islands and Athens. My experience and deep knowledge of the Greek real estate market allow me to offer personalized, high-quality services.'
                }
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">150+</div>
                <div className="text-sm text-neutral-600">
                  {locale === 'el' ? 'Ακίνητα Πουλήθηκαν' : 'Properties Sold'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">15+</div>
                <div className="text-sm text-neutral-600">
                  {locale === 'el' ? 'Χρόνια Εμπειρίας' : 'Years Experience'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">98%</div>
                <div className="text-sm text-neutral-600">
                  {locale === 'el' ? 'Ικανοποίηση Πελατών' : 'Client Satisfaction'}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={t('title')}
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
      </section>

      {/* Values Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">{t('values.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('values.integrity')}</h3>
                <p className="text-neutral-600">
                  {locale === 'el' 
                    ? 'Η εντιμότητα και η διαφάνεια είναι οι βασικές αρχές μου στη συνεργασία με κάθε πελάτη.'
                    : 'Honesty and transparency are my core principles in working with every client.'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('values.expertise')}</h3>
                <p className="text-neutral-600">
                  {locale === 'el' 
                    ? 'Βαθιά γνώση της αγοράς και συνεχής εκπαίδευση για να παρέχω τις καλύτερες υπηρεσίες.'
                    : 'Deep market knowledge and continuous education to provide the best services.'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('values.service')}</h3>
                <p className="text-neutral-600">
                  {locale === 'el' 
                    ? 'Εξατομικευμένη προσέγγιση και υποστήριξη σε κάθε βήμα της διαδικασίας.'
                    : 'Personalized approach and support at every step of the process.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialization Areas */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            {locale === 'el' ? 'Περιοχές Εξειδίκευσης' : 'Areas of Specialization'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
              <TrendingUp className="h-12 w-12 text-blue-700 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {locale === 'el' ? 'Κυκλαδικά Νησιά' : 'Cycladic Islands'}
              </h3>
              <p className="text-neutral-600">
                {locale === 'el' 
                  ? 'Εξαιρετικές ιδιοκτησίες σε Μύκονο, Πάρο, Σαντορίνη, Νάξο και άλλα νησιά των Κυκλάδων.'
                  : 'Exceptional properties in Mykonos, Paros, Santorini, Naxos and other Cycladic islands.'
                }
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
              <MapPin className="h-12 w-12 text-blue-700 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {locale === 'el' ? 'Αθήνα & Περιφέρεια' : 'Athens & Surroundings'}
              </h3>
              <p className="text-neutral-600">
                {locale === 'el' 
                  ? 'Πολυτελή διαμερίσματα και κατοικίες στις πιο επιλεγμένες περιοχές της Αθήνας.'
                  : 'Luxury apartments and houses in the most select areas of Athens.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-900 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'el' ? 'Ας Συνεργαστούμε' : "Let's Work Together"}
            </h2>
            <p className="text-xl text-neutral-300 mb-12">
              {locale === 'el' 
                ? 'Είμαι εδώ να σας βοηθήσω να βρείτε το ιδανικό ακίνητο ή να πουλήσετε την ιδιοκτησία σας.'
                : 'I am here to help you find the perfect property or sell your property.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-neutral-300">+30 695 308 9056</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Mail className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-neutral-300">n.karinopoulos@solutionsgroup.gr</p>
              </div>
              
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-neutral-300">
                  {locale === 'el' ? 'Αθήνα, Ελλάδα' : 'Athens, Greece'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}