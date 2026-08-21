import { useState } from 'react';
import { AlertCircle, Pause, Play } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { breakingNews } from '@/data/mockData';

export function BreakingNewsTicker() {
  const [isPaused, setIsPaused] = useState(false);

  if (breakingNews.length === 0) return null;

  const tickerNews = [...breakingNews, ...breakingNews];

  return (
    <div className="urgency-ticker overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 flex items-center gap-2 bg-white/20 px-3 py-1 rounded">
            <AlertCircle className="w-4 h-4" />
            <span className="font-bold text-sm uppercase tracking-wider">Urgente</span>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className={`ticker-animation whitespace-nowrap ${isPaused ? '[animation-play-state:paused]' : ''}`}>
              {tickerNews.map((news, index) => (
                <AppLink
                  key={`${news.id}-${index}`}
                  href={news.url}
                  className="inline-flex items-center gap-4 mr-12 hover:underline"
                >
                  <span className="text-sm">{news.title}</span>
                  <span className="text-white/60 text-xs">
                    {new Date(news.publishedAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </AppLink>
              ))}
            </div>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-shrink-0 text-white/70 hover:text-white p-1 rounded transition-colors"
            aria-label={isPaused ? "Retomar animação" : "Pausar animação"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
