import { NextResponse } from 'next/server'
import { MarketDataService } from '@/lib/services/market-data.service'

/**
 * Initialize assets from market data service
 * POST /api/market/initialize
 */
export async function POST() {
  try {
    await MarketDataService.initializeAssets()

    return NextResponse.json(
      { message: 'Ativos inicializados com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Initialize assets error:', error)
    return NextResponse.json(
      { error: 'Erro ao inicializar ativos' },
      { status: 500 }
    )
  }
}
