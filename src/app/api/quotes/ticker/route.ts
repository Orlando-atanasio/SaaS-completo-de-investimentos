import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Simple in-memory cache
const quoteCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function GET(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const tickerUpper = ticker.toUpperCase()

    // Check cache
    const cached = quoteCache.get(tickerUpper)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data, { status: 200 })
    }

    // Get latest price history
    const latestPrice = await db.priceHistory.findFirst({
      where: { assetId: tickerUpper },
      orderBy: { date: 'desc' }
    })

    if (!latestPrice) {
      return NextResponse.json(
        { error: 'Cotação não encontrada' },
        { status: 404 }
      )
    }

    const quoteData = {
      ticker: tickerUpper,
      price: latestPrice.close,
      change: ((latestPrice.close - latestPrice.open) / latestPrice.open) * 100,
      volume: latestPrice.volume,
      date: latestPrice.date
    }

    // Cache the result
    quoteCache.set(tickerUpper, { data: quoteData, timestamp: Date.now() })

    return NextResponse.json(quoteData, { status: 200 })
  } catch (error) {
    console.error('Get quote error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar cotação' },
      { status: 500 }
    )
  }
}
