import { NextRequest, NextResponse } from 'next/server'
import { InvestmentAssistant } from '@/lib/services/investment-ai.service'

/**
 * Get AI portfolio recommendations
 * POST /api/ai/portfolio
 * Body: { portfolio: any[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { portfolio } = body

    if (!portfolio || !Array.isArray(portfolio)) {
      return NextResponse.json(
        { error: 'Carteira é obrigatória e deve ser um array' },
        { status: 400 }
      )
    }

    const assistant = new InvestmentAssistant()
    await assistant.initialize()

    const recommendations = await assistant.getPortfolioRecommendations(portfolio)

    return NextResponse.json(
      { recommendations },
      { status: 200 }
    )
  } catch (error) {
    console.error('AI Portfolio error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao analisar carteira' },
      { status: 500 }
    )
  }
}
