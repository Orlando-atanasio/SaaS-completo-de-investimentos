import { NextRequest, NextResponse } from 'next/server'
import { NewsAnalysisService, NewsArticle } from '@/lib/services/news-analysis.service'

/**
 * Analyze a news article with AI
 * POST /api/news/analyze
 * Body: { title: string, content: string, source: string, publishedAt: string, url?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, source, publishedAt, url } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }

    const article: NewsArticle = {
      title,
      content,
      source: source || 'Desconhecido',
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      url
    }

    const service = new NewsAnalysisService()
    const analysis = await service.analyzeNews(article)

    return NextResponse.json(
      { article, analysis },
      { status: 200 }
    )
  } catch (error) {
    console.error('News analyze error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao analisar notícia' },
      { status: 500 }
    )
  }
}
