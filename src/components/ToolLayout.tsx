import { Helmet } from 'react-helmet-async';
import React from 'react';

interface ToolLayoutProps {
  title: string;
  metaContent: string;
  path: string;
  children: React.ReactNode;
}

export default function ToolLayout({ title, metaContent, path, children }: ToolLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title} | Devtoolbox</title>
        <meta name="description" content={metaContent} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaContent} />
        <meta property="og:url" content={`https://devtoolbox.tools/${path}`} />
      </Helmet>
      <div>{children}</div>
    </>
  );
}
