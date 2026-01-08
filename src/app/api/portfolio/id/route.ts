import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// TODO: Implement user authentication and check ownership

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { quantity, avgPrice } = body

    const totalInvested = quantity * avgPrice

    const portfolioItem = await db.portfolioItem.update({
      where: { id },
      data: {
        quantity,
        avgPrice,
        totalInvested
      },
      include: {
        asset: true
      }
    })

    return NextResponse.json(
      { portfolioItem, message: 'Item da carteira atualizado' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update portfolio item error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar item da carteira' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await db.portfolioItem.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Item removido da carteira' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete portfolio item error:', error)
    return NextResponse.json(
      { error: 'Erro ao remover item da carteira' },
      { status: 500 }
    )
  }
}
