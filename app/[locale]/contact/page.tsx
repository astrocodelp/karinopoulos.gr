'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  params: { locale: string };
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-8">
                {locale === 'el' ? 'Στείλτε μου Μήνυμα' : 'Send me a Message'}
              </h2>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6">
                  {t('form.success')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('form.subject')} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                    >
                      <option value="">
                        {locale === 'el' ? 'Επιλέξτε θέμα' : 'Select subject'}
                      </option>
                      <option value="buying">
                        {locale === 'el' ? 'Αγορά Ακινήτου' : 'Buying Property'}
                      </option>
                      <option value="selling">
                        {locale === 'el' ? 'Πώληση Ακινήτου' : 'Selling Property'}
                      </option>
                      <option value="renting">
                        {locale === 'el' ? 'Ενοικίαση' : 'Renting'}
                      </option>
                      <option value="valuation">
                        {locale === 'el' ? 'Εκτίμηση Αξίας' : 'Valuation'}
                      </option>
                      <option value="other">
                        {locale === 'el' ? 'Άλλο' : 'Other'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors resize-none"
                    placeholder={
                      locale === 'el' 
                        ? 'Περιγράψτε λεπτομερώς τις ανάγκες σας...'
                        : 'Describe your needs in detail...'
                    }
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-lg transition-colors"
                >
                  {isSubmitting 
                    ? (locale === 'el' ? 'Αποστολή...' : 'Sending...') 
                    : t('form.send')
                  }
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6">{t('info.office')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-neutral-900">{t('info.phone')}</p>
                    <a href="tel:+302101234567" className="text-neutral-600 hover:text-blue-700 transition-colors">
                      +30 210 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-neutral-900">WhatsApp</p>
                    <a href="https://wa.me/302101234567" className="text-neutral-600 hover:text-blue-700 transition-colors">
                      +30 210 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-neutral-900">{t('info.email')}</p>
                    <a href="mailto:info@nikoskarinopoulos.gr" className="text-neutral-600 hover:text-blue-700 transition-colors">
                      info@nikoskarinopoulos.gr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-neutral-900">
                      {locale === 'el' ? 'Διεύθυνση' : 'Address'}
                    </p>
                    <p className="text-neutral-600">
                      {locale === 'el' ? 'Κολωνάκι, Αθήνα' : 'Kolonaki, Athens'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-neutral-900">{t('info.hours')}</p>
                    <div className="text-neutral-600 space-y-1">
                      <p>{locale === 'el' ? 'Δευτέρα - Παρασκευή: 09:00 - 18:00' : 'Monday - Friday: 09:00 - 18:00'}</p>
                      <p>{locale === 'el' ? 'Σάββατο: 10:00 - 15:00' : 'Saturday: 10:00 - 15:00'}</p>
                      <p>{locale === 'el' ? 'Κυριακή: Κλειστά' : 'Sunday: Closed'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-neutral-100 rounded-2xl p-8 text-center">
              <MapPin className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                {locale === 'el' ? 'Βρείτε μας' : 'Find Us'}
              </h4>
              <p className="text-neutral-600 mb-4">
                {locale === 'el' ? 'Κολωνάκι, Αθήνα' : 'Kolonaki, Athens'}
              </p>
              <p className="text-sm text-neutral-500">
                {locale === 'el' ? 'Διαδραστικός χάρτης διαθέσιμος σύντομα' : 'Interactive map coming soon'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}