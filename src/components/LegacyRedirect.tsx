"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LegacyRedirect({ href }: { href: string }) {
  const router = useRouter();
  useEffect(() => { router.replace(href); }, [href, router]);
  return <div className="site-shell section-pad"><p>This page has moved.</p><Link className="arrow-link" href={href}>Continue to the current page</Link></div>;
}
