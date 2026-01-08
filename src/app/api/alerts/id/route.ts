import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// TODO: Implement user authentication and check ownership

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await db.priceAlert.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Alerta removido com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete alert error:', error)
    return NextResponse.json(
      { error: 'Erro ao remover alerta' },
      { status: 500 }
    )
  }
}
