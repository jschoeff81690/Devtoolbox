import { Helmet } from 'react-helmet-async';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ToolLayoutProps {
  toolName: string;
  path: string;
  children: React.ReactNode;
  // Optional title and metaContent for backward compatibility
  title?: string;
  metaContent?: string;
}

export default function ToolLayout({ toolName, title, metaContent, path, children }: ToolLayoutProps) {
  const { t } = useTranslation();
  
  // Use translations if toolName is provided, otherwise fall back to direct title/metaContent
  const toolTitle = title || (toolName ? t(`tools.${toolName.toLowerCase()}.title`) : '');
  const toolDescription = metaContent || (toolName ? t(`tools.${toolName.toLowerCase()}.description`) : '');
  
  return (
    <>
      <Helmet>
        <title>{toolTitle} | {t('common.appname')}</title>
        <meta name="description" content={toolDescription} />
        <meta property="og:title" content={toolTitle} />
        <meta property="og:description" content={toolDescription} />
        <meta property="og:url" content={`https://devtoolbox.tools/${path}`} />
      </Helmet>
      <div>{children}</div>
    </>
  );
}
