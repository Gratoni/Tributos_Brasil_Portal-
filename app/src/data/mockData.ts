import type { NewsArticle, Category, Author, Tag, Columnist, BreakingNews, MenuItem } from '@/types';

// Categorias/Editorias
export const categories: Category[] = [
  {
    id: '1',
    name: 'Tributos',
    slug: 'tributos',
    description: 'Notícias e análises sobre tributação federal, estadual e municipal',
    color: 'tributos',
  },
  {
    id: '2',
    name: 'Reforma Tributária',
    slug: 'reforma-tributaria',
    description: 'Acompanhe todas as mudanças da Reforma Tributária 2023/2024',
    color: 'reforma',
  },
  {
    id: '3',
    name: 'Jurisprudência',
    slug: 'jurisprudencia',
    description: 'Decisões judiciais, súmulas e entendimentos dos tribunais',
    color: 'jurisprudencia',
  },
  {
    id: '4',
    name: 'Empresarial',
    slug: 'empresarial',
    description: 'Conteúdo focado em questões tributárias empresariais',
    color: 'empresarial',
  },
  {
    id: '5',
    name: 'Leis e Normas',
    slug: 'leis-e-normas',
    description: 'Novas legislações, decretos, instruções normativas e portarias',
    color: 'tributos',
  },
  {
    id: '6',
    name: 'Obrigações Acessórias',
    slug: 'obrigacoes-acessorias',
    description: 'Informações sobre declarações, SPED e obrigações tributárias',
    color: 'tributos',
  },
  {
    id: '7',
    name: 'Alertas Fiscais',
    slug: 'alertas-fiscais',
    description: 'Alertas sobre mudanças urgentes na legislação tributária',
    color: 'alertas',
  },
];

// Autores
export const authors: Author[] = [
  {
    id: '1',
    name: 'Dr. Ricardo Mendes',
    slug: 'ricardo-mendes',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'Advogado tributarista com 25 anos de experiência. Mestre em Direito Tributário pela USP e professor universitário.',
    role: 'Editor Chefe',
    social: {
      twitter: '@ricardomendes',
      linkedin: 'ricardo-mendes',
      email: 'ricardo@tributosbrasil.com.br',
    },
  },
  {
    id: '2',
    name: 'Dra. Fernanda Costa',
    slug: 'fernanda-costa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Especialista em direito empresarial e tributário. Doutora em Direito Econômico pela PUC-SP.',
    role: 'Colunista Senior',
    social: {
      twitter: '@fernandacosta',
      linkedin: 'fernanda-costa',
      email: 'fernanda@tributosbrasil.com.br',
    },
  },
  {
    id: '3',
    name: 'Dr. Carlos Alberto Silva',
    slug: 'carlos-alberto-silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'Consultor tributário com vasta experiência em planejamento tributário empresarial.',
    role: 'Analista Tributário',
    social: {
      linkedin: 'carlos-alberto-silva',
      email: 'carlos@tributosbrasil.com.br',
    },
  },
  {
    id: '4',
    name: 'Dra. Juliana Martins',
    slug: 'juliana-martins',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Advogada especializada em contencioso tributário e defesa fiscal.',
    role: 'Colunista',
    social: {
      twitter: '@julianamartins',
      linkedin: 'juliana-martins',
      email: 'juliana@tributosbrasil.com.br',
    },
  },
  {
    id: '5',
    name: 'Dr. Roberto Campos',
    slug: 'roberto-campos',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    bio: 'Ex-auditor fiscal da Receita Federal. Especialista em procedimentos fiscais e tributação internacional.',
    role: 'Consultor Especial',
    social: {
      linkedin: 'roberto-campos',
      email: 'roberto@tributosbrasil.com.br',
    },
  },
];

// Tags
export const tags: Tag[] = [
  { id: '1', name: 'ICMS', slug: 'icms' },
  { id: '2', name: 'IPI', slug: 'ipi' },
  { id: '3', name: 'PIS/COFINS', slug: 'pis-cofins' },
  { id: '4', name: 'IRPJ', slug: 'irpj' },
  { id: '5', name: 'CSLL', slug: 'csll' },
  { id: '6', name: 'Simples Nacional', slug: 'simples-nacional' },
  { id: '7', name: 'Lucro Presumido', slug: 'lucro-presumido' },
  { id: '8', name: 'Lucro Real', slug: 'lucro-real' },
  { id: '9', name: 'SPED', slug: 'sped' },
  { id: '10', name: 'EFD-Reinf', slug: 'efd-reinf' },
  { id: '11', name: 'e-Social', slug: 'e-social' },
  { id: '12', name: 'DARF', slug: 'darf' },
  { id: '13', name: 'CARF', slug: 'carf' },
  { id: '14', name: 'STF', slug: 'stf' },
  { id: '15', name: 'STJ', slug: 'stj' },
];

// Notícias Principais
export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Reforma Tributária: Entenda as Novas Regras do IBS e CBS em 2025',
    slug: 'reforma-tributaria-entenda-novas-regras-ibs-cbs-2025',
    subtitle: 'Mudanças significativas no sistema tributário brasileiro começam a valer a partir de janeiro. Confira o guia completo.',
    excerpt: 'A Reforma Tributária traz mudanças profundas na forma como empresas calculam e recolhem tributos. O novo sistema unifica ICMS, IPI, PIS e COFINS em dois impostos: IBS e CBS.',
    content: `
      <p>A Reforma Tributária aprovada pelo Congresso Nacional em 2023 começa a mostrar seus primeiros efeitos práticos em 2025. As empresas brasileiras precisam se preparar para uma das maiores transformações do sistema tributário nacional desde a Constituição de 1988.</p>
      
      <h2>O que muda com o IBS e a CBS?</h2>
      
      <p>O Imposto sobre Bens e Serviços (IBS) e a Contribuição sobre Bens e Serviços (CBS) vão unificar cinco tributos atualmente existentes: ICMS, IPI, PIS, COFINS e ISS. Essa unificação promete simplificar drasticamente o sistema tributário brasileiro, que é reconhecidamente um dos mais complexos do mundo.</p>
      
      <p>O IBS será um imposto estadual e municipal, enquanto a CBS será federal. Ambos serão não cumulativos, permitindo a apropriação de créditos em toda a cadeia produtiva, o que deve reduzir a carga tributária efetiva sobre as empresas.</p>
      
      <h2>Transição gradual até 2033</h2>
      
      <p>O processo de transição será gradual, com alíquotas iniciais mais baixas que aumentarão progressivamente até atingirem o patamar definitivo em 2033. Durante esse período, empresas e governos precisarão se adaptar às novas regras.</p>
      
      <p>"A transição é um dos maiores desafios", afirma o tributarista Dr. Ricardo Mendes. "As empresas precisam começar a se preparar agora, revisando seus sistemas de gestão tributária e capacitando suas equipes."</p>
      
      <h2>Impactos setoriais</h2>
      
      <p>Diferentes setores da economia serão impactados de formas distintas. Setores intensivos em serviços, como tecnologia e educação, devem se beneficiar da ampliação da base de créditos. Já setores como indústria e comércio precisarão reavaliar suas cadeias de valor.</p>
      
      <p>O setor de serviços, em particular, deve experimentar uma redução significativa na carga tributária, já que o ISS atualmente incide sobre uma base maior que a do futuro IBS.</p>
      
      <h2>Preparação necessária</h2>
      
      <p>Empresários e contadores devem iniciar imediatamente o processo de adaptação:</p>
      
      <ul>
        <li>Atualização dos sistemas ERP e de gestão tributária</li>
        <li>Capacitação das equipes fiscais</li>
        <li>Revisão de contratos e precificação</li>
        <li>Análise de impacto setorial específico</li>
        <li>Planejamento tributário estratégico</li>
      </ul>
      
      <p>A Tributos Brasil oferece consultoria especializada para auxiliar empresas nesse processo de transição. Entre em contato conosco para uma avaliação personalizada.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop',
    category: categories[1],
    author: authors[0],
    tags: [tags[0], tags[1], tags[2]],
    publishedAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-15T14:30:00Z',
    readTime: 12,
    views: 15420,
    isFeatured: true,
    isBreaking: false,
    status: 'published',
    metaTitle: 'Reforma Tributária 2025: Guia Completo sobre IBS e CBS | Tributos Brasil',
    metaDescription: 'Entenda as novas regras da Reforma Tributária. IBS e CBS unificam ICMS, IPI, PIS e COFINS. Guia completo para empresas se prepararem.',
  },
  {
    id: '2',
    title: 'STF Decide: ICMS na Base de Cálculo do PIS/COFINS é Inconstitucional',
    slug: 'stf-decide-icms-base-calculo-pis-cofins-inconstitucional',
    subtitle: 'Por unanimidade, Supremo reconhece exclusão do ICMS da base de cálculo em decisão histórica para empresas.',
    excerpt: 'Em decisão unânime, o Supremo Tribunal Federal reconheceu a inconstitucionalidade da inclusão do ICMS na base de cálculo do PIS e da COFINS.',
    content: `
      <p>O Supremo Tribunal Federal (STF) decidiu, por unanimidade, que o ICMS não deve compor a base de cálculo do PIS e da COFINS. A decisão, proferida no julgamento do RE 1.064.937, representa uma vitória histórica para as empresas brasileiras.</p>
      
      <h2>O entendimento do STF</h2>
      
      <p>O ministro relator, ao apresentar seu voto, reafirmou que o ICMS é um imposto de responsabilidade do contribuinte-colaborador, não integrando a receita bruta das empresas. Portanto, não poderia ser incluído na base de cálculo das contribuições sociais.</p>
      
      <p>"A decisão confirma o entendimento que defendemos há anos", comenta a Dra. Fernanda Costa. "Trata-se de uma correção de uma distorção que onerava indevidamente as empresas."</p>
      
      <h2>Impacto financeiro</h2>
      
      <p>A decisão pode gerar créditos de valores expressivos para as empresas, que poderão pleitear a restituição dos valores pagos indevidamente nos últimos cinco anos. Estima-se que o impacto total possa superar R$ 300 bilhões.</p>
      
      <h2>O que fazer agora?</h2>
      
      <p>Empresas devem avaliar imediatamente:</p>
      
      <ul>
        <li>Cálculo dos créditos a recuperar</li>
        <li>Protocolo de pedidos de restituição</li>
        <li>Revisão da base de cálculo atual</li>
        <li>Análise de compensações possíveis</li>
      </ul>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop',
    category: categories[2],
    author: authors[1],
    tags: [tags[0], tags[2], tags[13]],
    publishedAt: '2025-01-14T10:30:00Z',
    readTime: 8,
    views: 12350,
    isFeatured: true,
    isBreaking: true,
    status: 'published',
    metaTitle: 'STF: ICMS fora da Base do PIS/COFINS | Tributos Brasil',
    metaDescription: 'Decisão histórica do STF reconhece inconstitucionalidade. Entenda o impacto e como recuperar créditos.',
  },
  {
    id: '3',
    title: 'Nova Resolução altera prazos de entrega da EFD-Reinf',
    slug: 'nova-resolucao-altera-prazos-entrega-efd-reinf',
    subtitle: 'Receita Federal publica nova normativa modificando cronograma de obrigatoriedade do evento R-4010.',
    excerpt: 'A Receita Federal publicou nova resolução alterando os prazos de entrega da EFD-Reinf, especialmente para o evento R-4010 relacionado a retenções na fonte.',
    content: `
      <p>A Receita Federal do Brasil publicou no Diário Oficial da União nova resolução que altera significativamente os prazos de entrega da EFD-Reinf. A principal mudança afeta o evento R-4010, referente à retenção de Imposto de Renda na fonte sobre pagamentos a pessoas físicas.</p>
      
      <h2>Principais alterações</h2>
      
      <p>A nova resolução estabelece:</p>
      
      <ul>
        <li>Novo prazo de envio: até o dia 15 do mês subsequente ao da retenção</li>
        <li>Obrigatoriedade de informações adicionais sobre beneficiários</li>
        <li>Novas validações cruzadas com a base da Receita Federal</li>
        <li>Alteração na forma de correção de eventos</li>
      </ul>
      
      <h2>Transição</h2>
      
      <p>As novas regras começam a valer a partir de fevereiro de 2025, dando prazo de adaptação para as empresas. O Dr. Carlos Alberto Silva recomenda: "É fundamental que as empresas revisem seus processos de retenção na fonte para garantir o cumprimento dos novos prazos."</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    category: categories[5],
    author: authors[2],
    tags: [tags[9], tags[10]],
    publishedAt: '2025-01-13T14:00:00Z',
    readTime: 6,
    views: 8920,
    isFeatured: false,
    status: 'published',
  },
  {
    id: '4',
    title: 'Simples Nacional: Novos Limites e Regras para 2025',
    slug: 'simples-nacional-novos-limites-regras-2025',
    subtitle: 'Governo federal atualiza tabela de receita bruta anual e estabelece novas restrições ao regime.',
    excerpt: 'O Comitê Gestor do Simples Nacional aprovou novos limites de receita bruta anual e estabeleceu novas restrições para empresas optantes do regime.',
    content: '<p>O Simples Nacional passa por importantes alterações em 2025...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    category: categories[0],
    author: authors[3],
    tags: [tags[5]],
    publishedAt: '2025-01-12T09:00:00Z',
    readTime: 7,
    views: 11200,
    isFeatured: true,
    status: 'published',
  },
  {
    id: '5',
    title: 'CARF publica nova súmula sobre transfer pricing',
    slug: 'carf-publica-nova-sumula-transfer-pricing',
    subtitle: 'Entendimento padroniza entendimento sobre preços de transferência em operações com países de baixa tributação.',
    excerpt: 'O Conselho Administrativo de Recursos Fiscais (CARF) publicou nova súmula sobre preços de transferência.',
    content: '<p>O CARF publicou nova súmula sobre transfer pricing...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop',
    category: categories[2],
    author: authors[4],
    tags: [tags[12]],
    publishedAt: '2025-01-11T11:00:00Z',
    readTime: 9,
    views: 7650,
    isFeatured: false,
    status: 'published',
  },
  {
    id: '6',
    title: 'Alerta: Prazo para entrega do DIRPF 2025 começa em março',
    slug: 'alerta-prazo-entrega-dirpf-2025-marco',
    subtitle: 'Receita Federal anuncia calendário de declaração do Imposto de Renda 2025. Contribuintes devem se preparar.',
    excerpt: 'A Receita Federal divulgou o calendário de entrega da Declaração do Imposto de Renda da Pessoa Física 2025.',
    content: '<p>O prazo para entrega do DIRPF 2025 começa em março...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=450&fit=crop',
    category: categories[6],
    author: authors[2],
    tags: [tags[3]],
    publishedAt: '2025-01-10T08:30:00Z',
    readTime: 5,
    views: 22100,
    isFeatured: false,
    isBreaking: true,
    status: 'published',
  },
  {
    id: '7',
    title: 'Análise: Impactos da Reforma Tributária no Setor de Tecnologia',
    slug: 'analise-impactos-reforma-tributaria-setor-tecnologia',
    subtitle: 'Empresas de software e serviços digitais devem ser grandes beneficiadas pelas novas regras.',
    excerpt: 'O setor de tecnologia deve ser um dos grandes beneficiados da Reforma Tributária, com redução significativa da carga tributária.',
    content: '<p>Análise detalhada dos impactos da Reforma Tributária...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop',
    category: categories[3],
    author: authors[1],
    tags: [tags[1], tags[2]],
    publishedAt: '2025-01-09T15:00:00Z',
    readTime: 11,
    views: 9870,
    isFeatured: true,
    status: 'published',
  },
  {
    id: '8',
    title: 'STJ define tese sobre exclusão do ICMS do PIS/COFINS',
    slug: 'stj-define-tese-exclusao-icms-pis-cofins',
    subtitle: 'Tema 1.185 é julgado com entendimento favorável aos contribuintes. Entenda os detalhes.',
    excerpt: 'O Superior Tribunal de Justiça (STJ) definiu a tese de repercussão geral sobre a exclusão do ICMS da base de cálculo do PIS e COFINS.',
    content: '<p>O STJ definiu a tese sobre exclusão do ICMS...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop',
    category: categories[2],
    author: authors[0],
    tags: [tags[0], tags[2], tags[14]],
    publishedAt: '2025-01-08T10:00:00Z',
    readTime: 8,
    views: 10500,
    isFeatured: false,
    status: 'published',
  },
  {
    id: '9',
    title: 'Novas regras para dedução de prejuízos fiscais no IRPJ',
    slug: 'novas-regras-deducao-prejuizos-fiscais-irpj',
    subtitle: 'Medida Provisória altera limites de compensação de prejuízos para empresas do Lucro Real.',
    excerpt: 'Uma nova Medida Provisória altera as regras para dedução de prejuízos fiscais no cálculo do IRPJ.',
    content: '<p>Novas regras para dedução de prejuízos fiscais...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop',
    category: categories[4],
    author: authors[3],
    tags: [tags[3], tags[7]],
    publishedAt: '2025-01-07T13:30:00Z',
    readTime: 7,
    views: 8340,
    isFeatured: false,
    status: 'published',
  },
  {
    id: '10',
    title: 'e-Social: Novos layouts versão S-1.3 entram em vigor',
    slug: 'e-social-novos-layouts-versao-s-1-3',
    subtitle: 'Alterações afetam eventos de remuneração, afastamentos e dados cadastrais.',
    excerpt: 'O e-Social passa a adotar novos layouts na versão S-1.3, com alterações em diversos eventos.',
    content: '<p>Novos layouts do e-Social versão S-1.3...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=450&fit=crop',
    category: categories[5],
    author: authors[2],
    tags: [tags[10]],
    publishedAt: '2025-01-06T09:30:00Z',
    readTime: 6,
    views: 6780,
    isFeatured: false,
    status: 'published',
  },
  {
    id: '11',
    title: 'Tributação Internacional: Novas regras para holdings no exterior',
    slug: 'tributacao-internacional-novas-regras-holdings-exterior',
    subtitle: 'Receita Federal atualiza entendimento sobre CFC e tributação de controladas no exterior.',
    excerpt: 'A Receita Federal publicou nova instrução normativa sobre tributação de holdings e controladas no exterior.',
    content: '<p>Novas regras para tributação internacional...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=450&fit=crop',
    category: categories[0],
    author: authors[4],
    tags: [tags[3], tags[4]],
    publishedAt: '2025-01-05T11:00:00Z',
    readTime: 10,
    views: 7230,
    isFeatured: false,
    status: 'published',
  },
  {
    id: '12',
    title: 'Análise: Como a Reforma Tributária afeta o comércio eletrônico',
    slug: 'analise-reforma-tributaria-afeta-comercio-eletronico',
    subtitle: 'Marketplaces e lojas virtuais precisam se adaptar às novas regras de tributação.',
    excerpt: 'O comércio eletrônico passará por significativas mudanças com a Reforma Tributária.',
    content: '<p>Análise dos impactos da Reforma no e-commerce...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop',
    category: categories[3],
    author: authors[1],
    tags: [tags[0], tags[1]],
    publishedAt: '2025-01-04T14:00:00Z',
    readTime: 9,
    views: 9450,
    isFeatured: false,
    status: 'published',
  },
];

// Colunistas
export const columnists: Columnist[] = [
  {
    id: '1',
    name: 'Dr. Ricardo Mendes',
    slug: 'ricardo-mendes',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'Advogado tributarista com 25 anos de experiência. Mestre em Direito Tributário pela USP.',
    specialty: 'Direito Tributário',
    articlesCount: 127,
  },
  {
    id: '2',
    name: 'Dra. Fernanda Costa',
    slug: 'fernanda-costa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Especialista em direito empresarial e tributário. Doutora em Direito Econômico.',
    specialty: 'Direito Empresarial',
    articlesCount: 89,
  },
  {
    id: '3',
    name: 'Dr. Roberto Campos',
    slug: 'roberto-campos',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    bio: 'Ex-auditor fiscal da Receita Federal. Especialista em procedimentos fiscais.',
    specialty: 'Procedimentos Fiscais',
    articlesCount: 64,
  },
  {
    id: '4',
    name: 'Dra. Juliana Martins',
    slug: 'juliana-martins',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Advogada especializada em contencioso tributário e defesa fiscal.',
    specialty: 'Contencioso Tributário',
    articlesCount: 52,
  },
];

// Breaking News/Urgentes
export const breakingNews: BreakingNews[] = [
  {
    id: '1',
    title: 'URGENTE: STF decide que ICMS não integra base do PIS/COFINS',
    url: '/noticias/stf-decide-icms-base-calculo-pis-cofins-inconstitucional',
    publishedAt: '2025-01-14T10:30:00Z',
  },
  {
    id: '2',
    title: 'Receita Federal prorroga prazo de entrega da EFD-Reinf',
    url: '/noticias/nova-resolucao-altera-prazos-entrega-efd-reinf',
    publishedAt: '2025-01-13T16:00:00Z',
  },
  {
    id: '3',
    title: 'Nova MP altera regras de dedução de prejuízos fiscais',
    url: '/noticias/novas-regras-deducao-prejuizos-fiscais-irpj',
    publishedAt: '2025-01-12T09:00:00Z',
  },
  {
    id: '4',
    title: 'CARF publica nova súmula sobre transfer pricing',
    url: '/noticias/carf-publica-nova-sumula-transfer-pricing',
    publishedAt: '2025-01-11T14:30:00Z',
  },
];

// Menu Principal
export const mainMenu: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tributos', href: '/categoria/tributos' },
  { label: 'Reforma Tributária', href: '/categoria/reforma-tributaria' },
  { label: 'Leis e Normas', href: '/categoria/leis-e-normas' },
  { label: 'Jurisprudência', href: '/categoria/jurisprudencia' },
  { label: 'Obrigações Acessórias', href: '/categoria/obrigacoes-acessorias' },
  { label: 'Empresarial', href: '/categoria/empresarial' },
  { label: 'Artigos', href: '/artigos' },
  { label: 'Colunistas', href: '/colunistas' },
  { label: 'Contato', href: '/contato' },
];

// Menu Institucional (Header Top)
export const institutionalMenu: MenuItem[] = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Anuncie', href: '/anuncie' },
  { label: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
  { label: 'Fale Conosco', href: '/contato' },
];

// Funções auxiliares
export const getFeaturedNews = (): NewsArticle[] => {
  return newsArticles.filter(article => article.isFeatured).slice(0, 5);
};

export const getBreakingNews = (): NewsArticle[] => {
  return newsArticles.filter(article => article.isBreaking);
};

export const getMostReadNews = (): NewsArticle[] => {
  return [...newsArticles].sort((a, b) => b.views - a.views).slice(0, 5);
};

export const getLatestNews = (limit: number = 6): NewsArticle[] => {
  return [...newsArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getNewsByCategory = (categorySlug: string): NewsArticle[] => {
  return newsArticles.filter(article => article.category.slug === categorySlug);
};

export const getNewsBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find(article => article.slug === slug);
};

export const getNewsByTag = (tagSlug: string): NewsArticle[] => {
  return newsArticles.filter(article => article.tags.some(tag => tag.slug === tagSlug));
};

export const getRelatedNews = (article: NewsArticle, limit: number = 3): NewsArticle[] => {
  return newsArticles
    .filter(a => a.id !== article.id && a.category.id === article.category.id)
    .slice(0, limit);
};

export const getNewsByAuthor = (authorSlug: string): NewsArticle[] => {
  return newsArticles.filter(article => article.author.slug === authorSlug);
};

export const getAuthorBySlug = (authorSlug: string): Author | undefined => {
  return authors.find(author => author.slug === authorSlug);
};

export const getColumnistBySlug = (columnistSlug: string): Columnist | undefined => {
  return columnists.find(columnist => columnist.slug === columnistSlug);
};

export const getTagBySlug = (tagSlug: string): Tag | undefined => {
  return tags.find(tag => tag.slug === tagSlug);
};

export const getPublishedNews = (): NewsArticle[] => {
  return [...newsArticles]
    .filter(article => article.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const searchNews = (query: string): NewsArticle[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getPublishedNews();
  }

  return getPublishedNews().filter((article) => {
    const haystack = [
      article.title,
      article.subtitle,
      article.excerpt,
      article.category.name,
      article.author.name,
      ...article.tags.map((tag) => tag.name),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
};



