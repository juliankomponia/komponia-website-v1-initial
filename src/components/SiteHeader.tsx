'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import './home/home-design.css';

const navigation = [
  { title: 'Components', href: '/components' },
  { title: 'OEM & engineering', href: '/oem-solutions' },
  { title: 'Quality & lab', href: '/quality-and-lab' },
  { title: 'Series supply', href: '/production-orders' },
  { title: 'Company', href: '/about' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="k-header site-header-next">
    <div className="k-shell flex h-full items-center justify-between gap-6">
      <Link href="/" aria-label="Komponia homepage" className="k-logo">
        <Image src="/assets/komponia-header-color.png" width={196} height={42} alt="komponia" preload />
      </Link>
      <nav aria-label="Main navigation" className="k-desktop-nav items-center gap-7">
        {navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.title}</Link>)}
      </nav>
      <Button asChild className="k-button k-header-cta"><Link href="/contact">Start an inquiry<ArrowUpRight size={16} aria-hidden="true" /></Link></Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild><Button variant="ghost" size="icon" className="k-menu-trigger" aria-label="Open navigation"><Menu size={24} /></Button></SheetTrigger>
        <SheetContent className="k-mobile-sheet">
          <SheetHeader className="p-0"><SheetTitle>Explore Komponia.</SheetTitle><SheetDescription>Components, engineering and ongoing supply.</SheetDescription></SheetHeader>
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.title}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}
            <Link href="/how-ordering-works" onClick={() => setOpen(false)}>How we work<ArrowUpRight size={20} aria-hidden="true" /></Link>
          </nav>
          <Button asChild className="k-button mt-auto"><Link href="/contact" onClick={() => setOpen(false)}>Start an inquiry<ArrowUpRight size={18} aria-hidden="true" /></Link></Button>
        </SheetContent>
      </Sheet>
    </div>
  </header>;
}
