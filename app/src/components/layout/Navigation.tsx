import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { mainMenu } from '@/data/mockData';
import { siteConfig } from '@/config/site';

interface NavigationProps {
  activeItem?: string;
}

export function Navigation({ activeItem = '/' }: NavigationProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuItems = [...mainMenu, { label: 'Serviços', href: siteConfig.officialUrl }];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`nav-main transition-all duration-300 ${
        isSticky ? 'sticky top-0 z-50 shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center">
            {menuItems.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <AppLink
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`nav-link flex items-center gap-1 ${
                    activeItem === item.href ? 'nav-link-active' : ''
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </AppLink>

                {item.children && openDropdown === item.href && (
                  <div className="absolute top-full left-0 min-w-[200px] bg-white shadow-xl rounded-b-lg border-t-2 border-[hsl(var(--editorial-blue))] py-2 z-50">
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <AppLink
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-[hsl(var(--editorial-gray-dark))] hover:bg-[hsl(var(--editorial-surface))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                          >
                            {child.label}
                          </AppLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:hidden py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {menuItems.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className={`flex-shrink-0 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeItem === item.href
                    ? 'bg-white text-[hsl(var(--editorial-blue))]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {item.label}
              </AppLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
