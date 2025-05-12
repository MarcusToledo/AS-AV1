import { NextResponse } from "next/server"
import { tarefaController } from "@/server/controllers/tarefaController"

// PATCH /api/tarefas/[id]/concluir - Marcar tarefa como concluída
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const tarefaAtualizada = tarefaController.concluirTarefa(params.id)
    if (!tarefaAtualizada) {
      return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 })
    }
    return NextResponse.json(tarefaAtualizada)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao concluir tarefa" }, { status: 500 })
  }
}
