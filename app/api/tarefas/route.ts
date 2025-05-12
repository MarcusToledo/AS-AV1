import { tarefaController } from "@/server/controllers/tarefaController"
import { NextResponse } from "next/server"

// GET /api/tarefas - Listar todas as tarefas
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  try {
    const tarefas = tarefaController.listarTarefas(status || undefined)
    return NextResponse.json(tarefas)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar tarefas" }, { status: 500 })
  }
}

// POST /api/tarefas - Criar uma nova tarefa
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const novaTarefa = tarefaController.criarTarefa(body)
    return NextResponse.json(novaTarefa, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar tarefa" }, { status: 400 })
  }
}
