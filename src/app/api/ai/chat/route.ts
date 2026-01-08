import { NextRequest, NextResponse } from 'next/server'
import { InvestmentAssistant } from '@/lib/services/investment-ai.service'

// Store conversations in memory (in production, use Redis or database)
const conversations = new Map<string, InvestmentAssistant>()

/**
 * Chat with AI investment assistant
 * POST /api/ai/chat
 * Body: { message: string, conversationId?: string, portfolioContext?: any }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationId, portfolioContext } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      )
    }

    // Get or create conversation
    let assistant = conversations.get(conversationId || 'default')

    if (!assistant) {
      assistant = new InvestmentAssistant()
      await assistant.initialize()
      conversations.set(conversationId || 'default', assistant)
    }

    // Get AI response
    const response = await assistant.chat(message, portfolioContext)

    return NextResponse.json(
      {
        response,
        conversationId: conversationId || 'default',
        messageCount: assistant.getMessageCount()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}

/**
 * Clear conversation history
 * DELETE /api/ai/chat
 * Query: { conversationId?: string }
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const conversationId = searchParams.get('conversationId') || 'default'

    const assistant = conversations.get(conversationId)

    if (assistant) {
      assistant.clearHistory()
    }

    return NextResponse.json(
      { message: 'Histórico limpo com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Clear chat error:', error)
    return NextResponse.json(
      { error: 'Erro ao limpar histórico' },
      { status: 500 }
    )
  }
}
