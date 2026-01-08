import { NextRequest, NextResponse } from 'next/server'
import { InvestmentAssistant } from '@/lib/services/investment-ai.service'

/**
 * Analyze an asset with AI
 * POST /api/ai/analyze
 * Body: { ticker: string, assetData: any }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticker, assetData } = body

    if (!ticker || !assetData) {
      return NextResponse.json(
        { error: 'Ticker e dados do ativo são obrigatórios' },
        { status: 400 }
      )
    }

    const assistant = new InvestmentAssistant()
    await assistant.initialize()

    const analysis = await assistant.analyzeAsset(ticker, assetData)

    return NextResponse.json(
      { ticker, analysis },
      { status: 200 }
    )
  } catch (error) {
    console.error('AI Analyze error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao analisar ativo' },
      { status: 500 }
    )
  }
}
