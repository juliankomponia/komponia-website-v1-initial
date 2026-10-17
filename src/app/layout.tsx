import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import LegacyHashRedirect from '@/components/LegacyHashRedirect';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Technical components & OEM solutions | Komponia', template: '%s | Komponia' },
  description: 'Technical components, custom OEM solutions and ongoing supply. Built on WTS experience since 1997, with in-house CAD and Komponia Lab.',
  robots: { index: false, follow: true },
  icons: { icon: '/assets/brand/komponia-mark.svg' },
  openGraph: { type: 'website', siteName: 'Komponia' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth"><head><link rel="preload" href="/assets/fonts/sora-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-black">Skip to content</a>
    <LegacyHashRedirect />
    <SiteHeader />
    <main id="main-content">{children}</main>
    <SiteFooter />
  </body></html>;
}
