import React, { useEffect } from 'react';
import { SITE_URL, COMPANY_INFO, type PageMetadata } from '../../config/seo';

interface SEOHeadProps {
  metadata: PageMetadata;
  breadcrumbs?: { name: string; path: string }[];
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Route-aware SEO Head management component.
 * Updates document.title, canonical link, Open Graph metadata,
 * Twitter cards, and structured JSON-LD data dynamically per route.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  metadata,
  breadcrumbs,
  schema,
}) => {
  const { title, description, canonicalPath, keywords, ogImage, ogType = 'website' } = metadata;
  const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;
  const imageUrl = ogImage || `${SITE_URL}/og-preview.jpg`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to safely set or create a meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', imageUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', COMPANY_INFO.name);
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', COMPANY_INFO.locale);

    // 4. Twitter Card Tags
    setMetaTag('meta[property="twitter:title"]', 'property', 'twitter:title', title);
    setMetaTag('meta[property="twitter:description"]', 'property', 'twitter:description', description);
    setMetaTag('meta[property="twitter:url"]', 'property', 'twitter:url', canonicalUrl);
    setMetaTag('meta[property="twitter:image"]', 'property', 'twitter:image', imageUrl);
    setMetaTag('meta[property="twitter:card"]', 'property', 'twitter:card', 'summary_large_image');

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Route-Specific JSON-LD Schema
    const scriptId = 'route-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema || breadcrumbs) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      const schemasToRender: Record<string, unknown>[] = [];
      if (schema) {
        if (Array.isArray(schema)) {
          schemasToRender.push(...schema);
        } else {
          schemasToRender.push(schema);
        }
      }

      if (breadcrumbs && breadcrumbs.length > 0) {
        schemasToRender.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: b.name,
            item: `${SITE_URL}${b.path}`,
          })),
        });
      }

      scriptTag.textContent = JSON.stringify(
        schemasToRender.length === 1 ? schemasToRender[0] : schemasToRender
      );
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalUrl, keywords, imageUrl, ogType, schema, breadcrumbs]);

  // React 19 native head element injection
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </>
  );
};
