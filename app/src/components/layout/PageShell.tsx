import type { ReactNode } from 'react';
import { HeaderTop } from '@/components/layout/HeaderTop';
import { HeaderMain } from '@/components/layout/HeaderMain';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface PageShellProps {
  activeItem?: string;
  children: ReactNode;
}

export function PageShell({ activeItem, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-white">
      <HeaderTop />
      <HeaderMain />
      <Navigation activeItem={activeItem} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
