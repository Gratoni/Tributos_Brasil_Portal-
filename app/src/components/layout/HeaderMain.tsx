import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Bell } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppLink } from '@/components/common/AppLink';
import { mainMenu } from '@/data/mockData';
import { siteConfig } from '@/config/site';

interface HeaderMainProps {
  onSearch?: (query: string) => void;
}

export function HeaderMain({ onSearch }: HeaderMainProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [...mainMenu, { label: 'Serviços', href: siteConfig.officialUrl }];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/noticias?busca=${encodeURIComponent(query)}`);
    }

    setIsSearchOpen(false);
  };

  return (
    <header className="header-main py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <AppLink href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 bg-[hsl(var(--editorial-blue))] rounded-lg flex items-center justify-center overflow-hidden p-1">
              <img src={siteConfig.logoUrl} alt={siteConfig.brandName} className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-[hsl(var(--editorial-blue))] leading-tight">
                {siteConfig.brandName}
              </h1>
              <p className="text-xs text-[hsl(var(--editorial-gray))]">
                Notícias Tributárias e Jurídicas
              </p>
            </div>
          </AppLink>

          <div className="hidden md:flex flex-1 max-w-xl">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Buscar notícias, artigos, análises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 bg-[hsl(var(--editorial-surface))] border border-[hsl(var(--editorial-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--editorial-blue))] focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[hsl(var(--editorial-gray))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <AppLink
              href="#newsletter"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[hsl(var(--editorial-blue))] text-white text-sm font-medium rounded-lg hover:bg-[hsl(var(--editorial-blue-dark))] transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>Newsletter</span>
            </AppLink>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[hsl(var(--editorial-gray-dark))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden w-10 h-10 flex items-center justify-center text-[hsl(var(--editorial-gray-dark))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-[hsl(var(--editorial-border))]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--editorial-blue))] rounded-lg flex items-center justify-center overflow-hidden p-1">
                        <img src={siteConfig.logoUrl} alt={siteConfig.brandName} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h2 className="font-bold text-[hsl(var(--editorial-blue))]">
                          {siteConfig.brandName}
                        </h2>
                        <p className="text-xs text-[hsl(var(--editorial-gray))]">Menu Principal</p>
                      </div>
                    </div>
                  </div>
                  <nav className="flex-1 overflow-auto py-4">
                    <ul className="space-y-1">
                      {menuItems.map((item) => (
                        <li key={item.href}>
                          <AppLink
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                            className="flex items-center px-4 py-3 text-[hsl(var(--editorial-gray-dark))] hover:bg-[hsl(var(--editorial-surface))] hover:text-[hsl(var(--editorial-blue))] transition-colors"
                          >
                            {item.label}
                          </AppLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="p-4 border-t border-[hsl(var(--editorial-border))]">
                    <AppLink
                      href="#newsletter"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[hsl(var(--editorial-blue))] text-white font-medium rounded-lg hover:bg-[hsl(var(--editorial-blue-dark))] transition-colors"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Assinar Newsletter</span>
                    </AppLink>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden mt-4 pb-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar notícias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-[hsl(var(--editorial-surface))] border border-[hsl(var(--editorial-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--editorial-blue))]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[hsl(var(--editorial-gray))]"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
