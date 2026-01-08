import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params

    const asset = await db.asset.findUnique({
      where: { ticker: ticker.toUpperCase() },
      include: {
        priceHistories: {
          orderBy: { date: 'desc' },
          take: 30 // Last 30 days
        }
      }
    })

    if (!asset) {
      return NextResponse.json(
        { error: 'Ativo não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ asset }, { status: 200 })
  } catch (error) {
    console.error('Get asset error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar ativo' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const body = await request.json()
    const { name, type, sector, description } = body

    const asset = await db.asset.update({
      where: { ticker: ticker.toUpperCase() },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(sector && { sector }),
        ...(description && { description })
      }
    })

    return NextResponse.json(
      { asset, message: 'Ativo atualizado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update asset error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar ativo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params

    await db.asset.delete({
      where: { ticker: ticker.toUpperCase() }
    })

    return NextResponse.json(
      { message: 'Ativo removido com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete asset error:', error)
    return NextResponse.json(
      { error: 'Erro ao remover ativo' },
      { status: 500 }
    )
  }
}
