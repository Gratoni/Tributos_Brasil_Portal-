import { ChevronRight } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="bg-[hsl(var(--editorial-surface))] border-b border-[hsl(var(--editorial-border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="breadcrumb">
          {items.map((item, index) => (
            <span key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href ? (
                <AppLink href={item.href}>{item.label}</AppLink>
              ) : (
                <span className="text-[hsl(var(--editorial-gray-dark))]">{item.label}</span>
              )}
              {index < items.length - 1 && <ChevronRight className="w-3 h-3" />}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
