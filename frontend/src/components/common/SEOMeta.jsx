import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEOMeta — Centralized SEO Component
 *
 * Wraps React Helmet Async to inject dynamic:
 *  - Page <title>
 *  - Meta description
 *  - Open Graph (social sharing) tags
 *  - Twitter Card tags
 *  - JSON-LD Structured Data (schema.org)
 *
 * Usage:
 *   <SEOMeta
 *     title="Dashboard"
 *     description="Real-time human capital analytics dashboard"
 *     path="/dashboard"
 *   />
 */

const BASE_URL = 'https://humancapital.io'; // Replace with your production domain
const SITE_NAME = 'Human Capital Analytics';
const DEFAULT_IMAGE = `${BASE_URL}/og-preview.png`;

const SEOMeta = ({
  title,
  description = 'Enterprise-grade Human Capital Analytics Dashboard. Real-time MongoDB-driven insights, admin controls, and premium analytics visualization.',
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  structuredData = null,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${BASE_URL}${path}`;

  // Default Organization structured data (always injected globally)
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: BASE_URL,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const schemaToRender = structuredData || defaultSchema;

  return (
    <Helmet>
      {/* ─── Primary Meta ──────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* ─── Open Graph (Facebook / LinkedIn) ─────────── */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* ─── Twitter Card ──────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ─── Structured Data (schema.org JSON-LD) ─────── */}
      <script type="application/ld+json">{JSON.stringify(schemaToRender)}</script>
    </Helmet>
  );
};

export default SEOMeta;
