import { tarefaController } from "@/server/controllers/tarefaController"
import { NextResponse } from "next/server"

// GET /api/tarefas/[id] - Buscar uma tarefa específica
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const tarefa = tarefaController.buscarTarefa(params.id)
    if (!tarefa) {
      return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 })
    }
    return NextResponse.json(tarefa)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar tarefa" }, { status: 500 })
  }
}

// PUT /api/tarefas/[id] - Atualizar uma tarefa
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const tarefaAtualizada = tarefaController.atualizarTarefa(params.id, body)
    if (!tarefaAtualizada) {
      return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 })
    }
    return NextResponse.json(tarefaAtualizada)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar tarefa" }, { status: 400 })
  }
}

// DELETE /api/tarefas/[id] - Excluir uma tarefa
export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    const { params } = context
    const sucesso = await tarefaController.excluirTarefa(params.id)
    if (!sucesso) {
      return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 })
    }
    return NextResponse.json({ message: "Tarefa excluída com sucesso" })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir tarefa" }, { status: 500 })
  }
}

