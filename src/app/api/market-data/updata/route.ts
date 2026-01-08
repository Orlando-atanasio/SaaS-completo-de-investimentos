import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getTimeSeries, generateBrazilianStockData } from '@/lib/market-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticker, useMock = false } = body

    if (!ticker) {
      return NextResponse.json(
        { error: 'Ticker é obrigatório' },
        { status: 400 }
      )
    }

    const tickerUpper = ticker.toUpperCase()

    // Check if asset exists
    const asset = await db.asset.findUnique({
      where: { ticker: tickerUpper }
    })

    if (!asset) {
      return NextResponse.json(
        { error: 'Ativo não encontrado' },
        { status: 404 }
      )
    }

    let timeSeriesData

    if (useMock) {
      // Use mock data for Brazilian stocks
      const mockData = generateBrazilianStockData(tickerUpper)
      timeSeriesData = mockData.timeSeries
    } else {
      // Try Alpha Vantage API
      timeSeriesData = await getTimeSeries(tickerUpper)

      if (!timeSeriesData) {
        // Fallback to mock data
        const mockData = generateBrazilianStockData(tickerUpper)
        timeSeriesData = mockData.timeSeries
      }
    }

    if (!timeSeriesData || timeSeriesData.length === 0) {
      return NextResponse.json(
        { error: 'Não foi possível obter dados de mercado' },
        { status: 500 }
      )
    }

    // Store price history in database
    const priceHistories = await Promise.all(
      timeSeriesData.map(async (data) => {
        return db.priceHistory.upsert({
          where: {
            assetId_date: {
              assetId: asset.id,
              date: new Date(data.date)
            }
          },
          create: {
            assetId: asset.id,
            date: new Date(data.date),
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            volume: data.volume
          },
          update: {
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            volume: data.volume
          }
        })
      })
    )

    return NextResponse.json(
      {
        message: 'Dados de mercado atualizados com sucesso',
        recordsUpdated: priceHistories.length,
        latestPrice: timeSeriesData[timeSeriesData.length - 1].close
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update market data error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar dados de mercado' },
      { status: 500 }
    )
  }
}
