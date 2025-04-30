import { useTranslation } from 'react-i18next';

export default function Privacy() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('pages.privacy.title')}</h1>
      <p className="text-sm text-gray-500">
        {t('pages.privacy.lastupdated')}: April 24, 2025
      </p>
      
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{t('pages.privacy.introduction')}</h2>
        <p className="mt-2">
          {t('pages.privacy.introduction')}
        </p>
      </section>
      
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{t('pages.privacy.datacollection')}</h2>
        <p className="mt-2">
          {t('pages.privacy.datacollectiontext')}
        </p>
      </section>
      
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{t('pages.privacy.analytics')}</h2>
        <p className="mt-2">
          {t('pages.privacy.analyticstext')}
        </p>
      </section>
      
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{t('pages.privacy.cookies')}</h2>
        <p className="mt-2">
          {t('pages.privacy.cookiestext')}
        </p>
      </section>
      
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{t('pages.privacy.changes')}</h2>
        <p className="mt-2">
          {t('pages.privacy.changestext')}
        </p>
      </section>
    </div>
  );
}
