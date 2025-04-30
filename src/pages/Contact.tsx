import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('pages.contact.title')}</h1>
      <p>
        {t('pages.contact.description')}
      </p>
      <p className="text-blue-600">support@devtoolbox.tools</p>
    </div>
  );
}
