import { describe, expect, it } from 'vitest'
import { normalizeStrapiArticle } from './strapi.adapter'

const sampleStrapiArticle = {
    id: 1,
    attributes: {
        title: 'Reforma Tributária Simplificada',
        slug: 'reforma-tributaria-simplificada',
        subtitle: 'Guia rápido das novas regras',
        excerpt: 'Resumo das principais mudanças da reforma tributária.',
        content: '<p>Conteúdo da matéria</p>',
        featuredImage: {
            data: {
                attributes: {
                    url: '/uploads/reforma.jpg',
                },
            },
        },
        category: {
            data: {
                id: 2,
                attributes: {
                    name: 'Reforma Tributária',
                    slug: 'reforma-tributaria',
                    description: 'Mudanças na legislação',
                    color: 'reforma',
                },
            },
        },
        author: {
            data: {
                id: 3,
                attributes: {
                    name: 'Dra. Fernanda Costa',
                    slug: 'fernanda-costa',
                    avatar: {
                        data: {
                            attributes: {
                                url: '/uploads/fernanda.jpg',
                            },
                        },
                    },
                    bio: 'Especialista em direito tributário',
                    role: 'Colunista Senior',
                    social: {
                        twitter: '@fernandacosta',
                    },
                },
            },
        },
        tags: {
            data: [
                {
                    id: 5,
                    attributes: {
                        name: 'IBS',
                        slug: 'ibs',
                    },
                },
            ],
        },
        publishedAt: '2025-01-15T08:00:00Z',
        updatedAt: '2025-01-15T14:30:00Z',
        readTime: 12,
        views: 15420,
        isFeatured: true,
        isBreaking: false,
        status: 'published',
        metaTitle: 'Reforma Tributária 2025',
        metaDescription: 'Guia completo sobre IBS e CBS',
    },
} satisfies NonNullable<Parameters<typeof normalizeStrapiArticle>[0]>

describe('Strapi adapter', () => {
    it('normaliza artigo Strapi corretamente', () => {
        const article = normalizeStrapiArticle(sampleStrapiArticle)

        expect(article.id).toBe('1')
        expect(article.title).toBe('Reforma Tributária Simplificada')
        expect(article.slug).toBe('reforma-tributaria-simplificada')
        expect(article.category.slug).toBe('reforma-tributaria')
        expect(article.author.slug).toBe('fernanda-costa')
        expect(article.tags).toHaveLength(1)
        expect(article.tags[0].slug).toBe('ibs')
        expect(article.publishedAt).toBe('2025-01-15T08:00:00Z')
        expect(article.isFeatured).toBe(true)
    })
})
