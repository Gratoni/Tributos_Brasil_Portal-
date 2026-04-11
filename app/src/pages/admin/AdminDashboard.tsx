import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronRight,
  Edit,
  Eye,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Tag,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { AppLink } from '@/components/common/AppLink';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { authors, categories, newsArticles } from '@/data/mockData';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';

const getAdminSection = (pathname: string) => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/admin';

  if (normalizedPath === '/admin') return 'dashboard';
  if (normalizedPath === '/admin/artigos') return 'articles';
  if (normalizedPath === '/admin/artigos/novo') return 'new-article';
  if (normalizedPath === '/admin/autores') return 'authors';
  if (normalizedPath === '/admin/categorias') return 'categories';
  if (normalizedPath === '/admin/analytics') return 'analytics';
  if (normalizedPath === '/admin/configuracoes') return 'settings';

  return 'dashboard';
};

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { id: 'articles', label: 'Artigos', icon: FileText, href: '/admin/artigos' },
  { id: 'new-article', label: 'Novo Artigo', icon: Plus, href: '/admin/artigos/novo' },
  { id: 'authors', label: 'Autores', icon: Users, href: '/admin/autores' },
  { id: 'categories', label: 'Categorias', icon: Tag, href: '/admin/categorias' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { id: 'settings', label: 'Hospedagem', icon: Settings, href: '/admin/configuracoes' },
] as const;

const getArticleEditorPath = (articleId?: string) =>
  articleId ? `/admin/artigos/novo?artigo=${articleId}` : '/admin/artigos/novo';

export function AdminDashboard() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout, user } = useAuth();

  const activeSection = getAdminSection(location.pathname);
  const selectedArticleId = searchParams.get('artigo') ?? '';
  const selectedArticle = useMemo(
    () => newsArticles.find((article) => article.id === selectedArticleId) ?? null,
    [selectedArticleId]
  );

  const stats = [
    { title: 'Total de Artigos', value: newsArticles.length, change: '+12%', trend: 'up', icon: FileText },
    { title: 'Visualizações', value: '125.4K', change: '+23%', trend: 'up', icon: Eye },
    { title: 'Autores', value: authors.length, change: '+2', trend: 'up', icon: Users },
    { title: 'Publicados Hoje', value: '3', change: '-1', trend: 'down', icon: Calendar },
  ] as const;

  const recentArticles = newsArticles.slice(0, 6);

  return (
    <div className="min-h-screen bg-[hsl(var(--editorial-surface))]">
      <header className="bg-white border-b border-[hsl(var(--editorial-border))] sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((currentState) => !currentState)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--editorial-surface))]"
              aria-label="Alternar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <AppLink href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[hsl(var(--editorial-blue))] rounded-lg flex items-center justify-center overflow-hidden p-1">
                <img src={siteConfig.logoUrl} alt={siteConfig.brandName} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="block font-bold text-[hsl(var(--editorial-blue))]">{siteConfig.brandName}</span>
                <span className="text-xs text-[hsl(var(--editorial-gray))]">Painel administrativo</span>
              </div>
            </AppLink>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-[hsl(var(--editorial-surface))] rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-[hsl(var(--editorial-gray))]" />
              <input
                type="text"
                placeholder="Busca visual do painel"
                className="bg-transparent text-sm focus:outline-none w-56"
                aria-label="Buscar no painel"
              />
            </div>
            <button
              type="button"
              className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--editorial-surface))]"
              aria-label="Notificações"
            >
              <Bell className="w-5 h-5 text-[hsl(var(--editorial-gray))]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <img src={authors[0].avatar} alt={authors[0].name} className="w-9 h-9 rounded-full object-cover" loading="lazy" />
              <span className="text-sm font-medium hidden sm:block">{user ?? authors[0].name}</span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--editorial-surface))] text-[hsl(var(--editorial-gray))]"
              title="Sair do painel"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-[hsl(var(--editorial-border))] transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          style={{ top: '64px', height: 'calc(100vh - 64px)' }}
        >
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <AppLink
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[hsl(var(--editorial-blue))] text-white' : 'text-[hsl(var(--editorial-gray-dark))] hover:bg-[hsl(var(--editorial-surface))]'}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </AppLink>
              );
            })}
          </nav>

          <div className="mx-4 mt-2 rounded-2xl border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] p-4">
            <p className="text-sm font-semibold text-[hsl(var(--editorial-gray-dark))]">Status desta versão</p>
            <p className="mt-2 text-sm text-[hsl(var(--editorial-gray))]">
              Portal estático pronto para hospedagem. O painel organiza a operação e a revisão visual, mas o conteúdo publicado ainda vem do arquivo de dados local.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[hsl(var(--editorial-border))]">
            <AppLink
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[hsl(var(--editorial-gray))] hover:bg-[hsl(var(--editorial-surface))] transition-colors"
            >
              <Eye className="w-5 h-5" />
              <span>Ver site</span>
            </AppLink>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} style={{ top: '64px' }} />
        )}

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">Dashboard</h1>
                  <p className="text-[hsl(var(--editorial-gray))]">Acesso rápido aos conteúdos, autores e checklist de publicação.</p>
                </div>
                <AppLink href="/admin/artigos/novo" className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--editorial-blue))] text-white font-medium rounded-lg hover:bg-[hsl(var(--editorial-blue-dark))] transition-colors">
                  <Plus className="w-4 h-4" />
                  Novo Artigo
                </AppLink>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.title} className="bg-white rounded-xl p-6 border border-[hsl(var(--editorial-border))]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-[hsl(var(--editorial-surface))] rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-[hsl(var(--editorial-blue))]" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">{stat.value}</div>
                    <div className="text-sm text-[hsl(var(--editorial-gray))]">{stat.title}</div>
                  </div>
                ))}
              </div>

              <div className="grid xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] gap-6">
                <section className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--editorial-border))]">
                    <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))]">Artigos recentes</h2>
                    <AppLink href="/admin/artigos" className="text-sm text-[hsl(var(--editorial-blue))] hover:underline flex items-center gap-1">
                      Ver todos
                      <ChevronRight className="w-4 h-4" />
                    </AppLink>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[hsl(var(--editorial-surface))]">
                        <tr>
                          <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Título</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Categoria</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Status</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[hsl(var(--editorial-border))]">
                        {recentArticles.map((article) => (
                          <tr key={article.id} className="hover:bg-[hsl(var(--editorial-surface))]">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img src={article.featuredImage} alt={article.title} className="w-10 h-10 rounded object-cover" loading="lazy" />
                                <div>
                                  <p className="font-medium text-[hsl(var(--editorial-gray-dark))] line-clamp-1">{article.title}</p>
                                  <p className="text-xs text-[hsl(var(--editorial-gray))]">{article.author.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-[hsl(var(--editorial-gray))]">{article.category.name}</td>
                            <td className="px-6 py-4">
                              <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className={article.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'}>
                                {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <AppLink href={`/noticias/${article.slug}`} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[hsl(var(--editorial-border))] text-[hsl(var(--editorial-gray))]" title="Visualizar artigo">
                                  <Eye className="w-4 h-4" />
                                </AppLink>
                                <AppLink href={getArticleEditorPath(article.id)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[hsl(var(--editorial-border))] text-[hsl(var(--editorial-blue))]" title="Ajustar artigo">
                                  <Edit className="w-4 h-4" />
                                </AppLink>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-6">
                    <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">Checklist de publicação</h2>
                    <ul className="space-y-3 text-sm text-[hsl(var(--editorial-gray))]">
                      <li>Validar título, subtítulo e slug dos artigos.</li>
                      <li>Conferir contato, domínio e branding em todas as páginas.</li>
                      <li>Gerar `dist/` e subir em domínio raiz com o `.htaccess` incluído.</li>
                      <li>Testar acesso às rotas principais e ao `/admin` após a publicação.</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-6">
                    <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">Categorias</h2>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <span key={category.id} className="px-3 py-1.5 bg-[hsl(var(--editorial-surface))] text-sm text-[hsl(var(--editorial-gray-dark))] rounded-full">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeSection === 'articles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">Artigos</h1>
                  <p className="text-[hsl(var(--editorial-gray))]">Revisão visual dos artigos publicados nesta versão estática do portal.</p>
                </div>
                <AppLink href="/admin/artigos/novo" className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--editorial-blue))] text-white font-medium rounded-lg hover:bg-[hsl(var(--editorial-blue-dark))] transition-colors">
                  <Plus className="w-4 h-4" />
                  Novo Artigo
                </AppLink>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--editorial-border))] bg-blue-50/70 p-4 text-sm text-[hsl(var(--editorial-gray-dark))]">
                O painel está pronto para navegação e conferência. Alterações persistentes de conteúdo ainda são feitas em <strong>app/src/data/mockData.ts</strong> até a futura integração com backend ou CMS.
              </div>

              <div className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] overflow-hidden">
                <div className="p-4 border-b border-[hsl(var(--editorial-border))]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--editorial-gray))]" />
                        <Input type="text" placeholder="Busca visual dos artigos" className="pl-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[hsl(var(--editorial-surface))]">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Título</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Categoria</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Autor</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-[hsl(var(--editorial-gray))]">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[hsl(var(--editorial-border))]">
                      {newsArticles.map((article) => (
                        <tr key={article.id} className="hover:bg-[hsl(var(--editorial-surface))]">
                          <td className="px-6 py-4"><span className="font-medium text-[hsl(var(--editorial-gray-dark))] line-clamp-1">{article.title}</span></td>
                          <td className="px-6 py-4 text-sm text-[hsl(var(--editorial-gray))]">{article.category.name}</td>
                          <td className="px-6 py-4 text-sm text-[hsl(var(--editorial-gray))]">{article.author.name}</td>
                          <td className="px-6 py-4">
                            <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className={article.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'}>
                              {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <AppLink href={`/noticias/${article.slug}`} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[hsl(var(--editorial-border))] text-[hsl(var(--editorial-gray))]" title="Visualizar">
                                <Eye className="w-4 h-4" />
                              </AppLink>
                              <AppLink href={getArticleEditorPath(article.id)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[hsl(var(--editorial-border))] text-[hsl(var(--editorial-blue))]" title="Ajustar">
                                <Edit className="w-4 h-4" />
                              </AppLink>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'new-article' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">{selectedArticle ? 'Ajustar artigo' : 'Novo Artigo'}</h1>
                  <p className="text-[hsl(var(--editorial-gray))]">Área de conferência editorial para fechar a publicação antes da hospedagem.</p>
                </div>
                <AppLink href="/admin/artigos" className="inline-flex items-center gap-2 px-4 py-2 border border-[hsl(var(--editorial-border))] bg-white text-[hsl(var(--editorial-gray-dark))] font-medium rounded-lg hover:bg-[hsl(var(--editorial-surface))] transition-colors">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Voltar aos artigos
                </AppLink>
              </div>

              <div className="grid xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-6">
                <section className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-6 space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-[hsl(var(--editorial-blue))]">Fluxo atual</p>
                    <h2 className="mt-2 text-xl font-bold text-[hsl(var(--editorial-gray-dark))]">{selectedArticle ? selectedArticle.title : 'Preparar um novo conteúdo'}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[hsl(var(--editorial-surface))] p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--editorial-gray))]">Categoria</p>
                      <p className="mt-2 font-semibold text-[hsl(var(--editorial-gray-dark))]">{selectedArticle?.category.name ?? 'Definir editoria principal'}</p>
                    </div>
                    <div className="rounded-2xl bg-[hsl(var(--editorial-surface))] p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--editorial-gray))]">Autor</p>
                      <p className="mt-2 font-semibold text-[hsl(var(--editorial-gray-dark))]">{selectedArticle?.author.name ?? 'Selecionar responsável pelo texto'}</p>
                    </div>
                    <div className="rounded-2xl bg-[hsl(var(--editorial-surface))] p-4 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--editorial-gray))]">Slug</p>
                      <p className="mt-2 font-mono text-sm text-[hsl(var(--editorial-gray-dark))] break-all">{selectedArticle?.slug ?? 'definir-slug-amigavel-antes-de-publicar'}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-[hsl(var(--editorial-border))] p-5">
                    <h3 className="font-semibold text-[hsl(var(--editorial-gray-dark))]">Como publicar nesta versão</h3>
                    <ol className="mt-3 space-y-2 text-sm text-[hsl(var(--editorial-gray))] list-decimal list-inside">
                      <li>Atualize os dados em <strong>app/src/data/mockData.ts</strong>.</li>
                      <li>Revise a página pública pelo botão de visualização.</li>
                      <li>Gere o build final com <strong>npm run build</strong>.</li>
                      <li>Suba o conteúdo de <strong>app/dist</strong> na hospedagem com o <strong>.htaccess</strong>.</li>
                    </ol>
                  </div>

                  {selectedArticle && (
                    <div className="flex flex-wrap gap-3">
                      <AppLink href={`/noticias/${selectedArticle.slug}`} className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--editorial-blue))] text-white font-medium rounded-lg hover:bg-[hsl(var(--editorial-blue-dark))] transition-colors">
                        <Eye className="w-4 h-4" />
                        Visualizar página pública
                      </AppLink>
                      <AppLink href="/admin/configuracoes" className="inline-flex items-center gap-2 px-4 py-2 border border-[hsl(var(--editorial-border))] bg-white text-[hsl(var(--editorial-gray-dark))] font-medium rounded-lg hover:bg-[hsl(var(--editorial-surface))] transition-colors">
                        <Settings className="w-4 h-4" />
                        Ver checklist de hospedagem
                      </AppLink>
                    </div>
                  )}
                </section>

                <section className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-6">
                  <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">Campos prioritários</h2>
                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="block text-[hsl(var(--editorial-gray))] mb-1">Título</label>
                      <Input value={selectedArticle?.title ?? ''} readOnly placeholder="Título principal da matéria" />
                    </div>
                    <div>
                      <label className="block text-[hsl(var(--editorial-gray))] mb-1">Subtítulo</label>
                      <Input value={selectedArticle?.subtitle ?? ''} readOnly placeholder="Linha fina ou resumo de apoio" />
                    </div>
                    <div>
                      <label className="block text-[hsl(var(--editorial-gray))] mb-1">Resumo</label>
                      <textarea value={selectedArticle?.excerpt ?? ''} readOnly placeholder="Resumo usado na listagem" className="w-full min-h-32 rounded-lg border border-[hsl(var(--editorial-border))] bg-white px-3 py-2 text-[hsl(var(--editorial-gray-dark))] resize-y" />
                    </div>
                    <div>
                      <label className="block text-[hsl(var(--editorial-gray))] mb-1">Status atual</label>
                      <Input value={selectedArticle?.status ?? 'draft'} readOnly />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeSection === 'authors' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">Autores</h1>
                <p className="text-[hsl(var(--editorial-gray))]">Conferência rápida do diretório editorial ativo no portal.</p>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {authors.map((author) => (
                  <div key={author.id} className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-5">
                    <div className="flex items-center gap-3">
                      <img src={author.avatar} alt={author.name} className="w-14 h-14 rounded-full object-cover" loading="lazy" />
                      <div>
                        <p className="font-semibold text-[hsl(var(--editorial-gray-dark))]">{author.name}</p>
                        <p className="text-sm text-[hsl(var(--editorial-gray))]">{author.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-[hsl(var(--editorial-gray))]">{author.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'categories' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">Categorias</h1>
                <p className="text-[hsl(var(--editorial-gray))]">Mapa das editorias configuradas no portal.</p>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--editorial-blue))]">{category.slug}</p>
                    <h2 className="mt-2 text-lg font-semibold text-[hsl(var(--editorial-gray-dark))]">{category.name}</h2>
                    <p className="mt-2 text-sm text-[hsl(var(--editorial-gray))]">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'analytics' && (
            <div className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-8 max-w-3xl">
              <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">Analytics</h1>
              <p className="mt-3 text-[hsl(var(--editorial-gray))]">A base visual do analytics está pronta para receber integração futura, mas a hospedagem deste fim de semana não depende dessa etapa.</p>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))]">Checklist de hospedagem</h1>
                <p className="text-[hsl(var(--editorial-gray))]">Resumo operacional para subir o portal sem quebrar rotas nem assets.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-6">
                  <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">Publicação</h2>
                  <ul className="space-y-3 text-sm text-[hsl(var(--editorial-gray))]">
                    <li>Hospede o conteúdo da pasta <strong>app/dist</strong> na raiz do domínio.</li>
                    <li>Mantenha o arquivo <strong>.htaccess</strong> junto do <strong>index.html</strong>.</li>
                    <li>Confirme que o domínio final aponta para a pasta publicada.</li>
                    <li>Teste as URLs <strong>/</strong>, <strong>/noticias</strong>, <strong>/admin</strong> e uma matéria interna.</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl border border-[hsl(var(--editorial-border))] p-6">
                  <h2 className="text-lg font-bold text-[hsl(var(--editorial-gray-dark))] mb-4">Marca e contato</h2>
                  <ul className="space-y-3 text-sm text-[hsl(var(--editorial-gray))]">
                    <li>Marca principal: <strong>{siteConfig.brandName}</strong>.</li>
                    <li>Domínio institucional: <strong>{siteConfig.officialUrl}</strong>.</li>
                    <li>E-mail: <strong>{siteConfig.supportEmail}</strong>.</li>
                    <li>Se precisar trocar domínio ou contato, ajuste <strong>app/src/config/site.ts</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
