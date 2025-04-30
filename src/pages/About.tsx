import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">{t('pages.about.title')}</h1>
      <p>
        {t('pages.about.description')}
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mt-6">{t('pages.about.purpose')}</h2>
      <p>
        {t('pages.about.purpose')}
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mt-6">{t('pages.about.features')}</h2>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>{t('tools.jsonformatter.title')}</strong>: {t('tools.jsonformatter.description')}</li>
        <li><strong>{t('tools.jsonschemagenerator.title')}</strong>: {t('tools.jsonschemagenerator.description')}</li>
        <li><strong>{t('tools.uuidgenerator.title')}</strong>: {t('tools.uuidgenerator.description')}</li>
        <li><strong>{t('tools.base64.title')}</strong>: {t('tools.base64.description')}</li>
        <li><strong>{t('tools.jwtdecoder.title')}</strong>: {t('tools.jwtdecoder.description')}</li>
        <li><strong>{t('tools.timestampconverter.title')}</strong>: {t('tools.timestampconverter.description')}</li>
        <li><strong>{t('tools.caseconverter.title')}</strong>: {t('tools.caseconverter.description')}</li>
        <li><strong>{t('tools.loremipsum.title')}</strong>: {t('tools.loremipsum.description')}</li>
        <li><strong>{t('tools.regextester.title')}</strong>: {t('tools.regextester.description')}</li>
        <li><strong>{t('tools.markdowntohtml.title')}</strong>: {t('tools.markdowntohtml.description')}</li>
        <li><strong>{t('tools.htmlcssminifier.title')}</strong>: {t('tools.htmlcssminifier.description')}</li>
        <li><strong>{t('tools.colorconverter.title')}</strong>: {t('tools.colorconverter.description')}</li>
        <li><strong>{t('tools.wordcounter.title')}</strong>: {t('tools.wordcounter.description')}</li>
        <li><strong>{t('tools.urlencoder.title')}</strong>: {t('tools.urlencoder.description')}</li>
        <li><strong>{t('tools.hashgenerator.title')}</strong>: {t('tools.hashgenerator.description')}</li>
        <li><strong>{t('tools.qrcodegenerator.title')}</strong>: {t('tools.qrcodegenerator.description')}</li>
        <li><strong>{t('tools.diffchecker.title')}</strong>: {t('tools.diffchecker.description')}</li>
        <li><strong>{t('tools.apitester.title')}</strong>: {t('tools.apitester.description')}</li>
      </ul>
      
      <h2 className="text-xl font-semibold text-gray-800 mt-6">{t('pages.about.technologies')}</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>React</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Vite</li>
        <li>React Router</li>
        <li>i18next</li>
      </ul>
      
      <h2 className="text-xl font-semibold text-gray-800 mt-6">{t('pages.about.feedback')}</h2>
      <p>
        {t('pages.about.feedbacktext')}
      </p>
    </div>
  )
}
