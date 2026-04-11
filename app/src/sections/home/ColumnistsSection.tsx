import { ArrowRight, PenTool } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import type { Columnist } from '@/types';

interface ColumnistsSectionProps {
  columnists: Columnist[];
}

export function ColumnistsSection({ columnists }: ColumnistsSectionProps) {
  return (
    <section className="py-8 bg-[hsl(var(--editorial-surface))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--editorial-blue))] rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">
                Colunistas
              </h2>
              <p className="text-sm text-[hsl(var(--editorial-gray))]">
                Análises e opiniões de especialistas
              </p>
            </div>
          </div>
          <AppLink
            href="/colunistas"
            className="section-link flex items-center gap-1"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </AppLink>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columnists.map((columnist) => (
            <AppLink
              key={columnist.id}
              href={`/colunistas/${columnist.slug}`}
              className="group bg-white rounded-lg border border-[hsl(var(--editorial-border))] p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[hsl(var(--editorial-border))] group-hover:border-[hsl(var(--editorial-blue))] transition-colors">
                  <img
                    src={columnist.avatar}
                    alt={columnist.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[hsl(var(--editorial-gray-dark))] group-hover:text-[hsl(var(--editorial-blue))] transition-colors truncate">
                    {columnist.name}
                  </h4>
                  <p className="text-sm text-[hsl(var(--editorial-blue))] mb-1">
                    {columnist.specialty}
                  </p>
                  <p className="text-xs text-[hsl(var(--editorial-gray))]">
                    {columnist.articlesCount} artigos publicados
                  </p>
                </div>
              </div>
              <p className="text-sm text-[hsl(var(--editorial-gray))] mt-4 line-clamp-2">
                {columnist.bio}
              </p>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}
