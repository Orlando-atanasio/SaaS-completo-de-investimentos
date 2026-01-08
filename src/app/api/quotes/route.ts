import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Simple in-memory cache
const historyCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const ticker = searchParams.get('ticker')
    const days = parseInt(searchParams.get('days') || '30')

    if (!ticker) {
      return NextResponse.json(
        { error: 'Ticker é obrigatório' },
        { status: 400 }
      )
    }

    const cacheKey = `${ticker}-${days}`

    // Check cache
    const cached = historyCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data, { status: 200 })
    }

    // Get price history
    const history = await db.priceHistory.findMany({
      where: { assetId: ticker.toUpperCase() },
      orderBy: { date: 'asc' },
      take: days
    })

    if (!history || history.length === 0) {
      return NextResponse.json(
        { error: 'Histórico não encontrado' },
        { status: 404 }
      )
    }

    const data = {
      ticker: ticker.toUpperCase(),
      history: history.map(h => ({
        date: h.date.toISOString().split('T')[0],
        open: h.open,
        high: h.high,
        low: h.low,
        close: h.close,
        volume: h.volume
      }))
    }

    // Cache the result
    historyCache.set(cacheKey, { data, timestamp: Date.now() })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Get price history error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar histórico de preços' },
      { status: 500 }
    )
  }
}
