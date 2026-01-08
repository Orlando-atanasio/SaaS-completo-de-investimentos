import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const type = searchParams.get('type')

    let assets

    if (query) {
      // Search assets by ticker, name or type
      assets = await db.asset.findMany({
        where: {
          OR: [
            { ticker: { contains: query.toUpperCase() } },
            { name: { contains: query, mode: 'insensitive' } },
            { type: { contains: query, mode: 'insensitive' } }
          ]
        },
        orderBy: { ticker: 'asc' }
      })
    } else if (type) {
      // Filter by type
      assets = await db.asset.findMany({
        where: { type },
        orderBy: { ticker: 'asc' }
      })
    } else {
      // Get all assets
      assets = await db.asset.findMany({
        orderBy: { ticker: 'asc' }
      })
    }

    return NextResponse.json({ assets }, { status: 200 })
  } catch (error) {
    console.error('Search assets error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar ativos' },
      { status: 500 }
    )
  }
}
