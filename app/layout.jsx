import './globals.css';
import { Anton, Epilogue } from 'next/font/google';
import Script from 'next/script';
import { site } from '@/lib/site';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' });
const epilogue = Epilogue({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-epilogue', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.domain),
  title: { default: `${site.name} — ${site.tagline} in Jaipur`, template: `%s — ${site.name}` },
  description: 'BrandZaha is a creative & digital agency in Jaipur crafting cinematic websites, brands, apps, e-commerce and AI-powered experiences that perform.',
  openGraph: { type: 'website', siteName: site.name, url: site.domain, images: ['/og-default.jpg'] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#0a0a0a', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.domain,
  email: site.contact.email,
  telephone: site.contact.phone,
  foundingDate: String(site.founded),
  address: { '@type': 'PostalAddress', streetAddress: site.contact.address, addressLocality: site.contact.city, addressRegion: site.contact.region, postalCode: site.contact.postal, addressCountry: site.contact.country },
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${epilogue.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.analytics.gtm}');`}</Script>
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${site.analytics.gtm}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="gtm" /></noscript>

        <a className="skip-link" href="#main" style={{ position: 'absolute', left: '-9999px', top: 0, zIndex: 9999, background: 'var(--accent)', color: '#000', padding: '.6rem 1rem' }}>Skip to content</a>

        <div className="grain" aria-hidden="true" />
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Header />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
