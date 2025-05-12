import { tarefaModel } from "@/server/models/tarefaModel"
import type { Tarefa } from "@/types/tarefa"

export const tarefaController = {

  listarTarefas(status?: string): Tarefa[] {
    return tarefaModel.listar(status)
  },

  buscarTarefa(id: string): Tarefa | undefined {
    return tarefaModel.buscar(id)
  },

  criarTarefa(tarefa: Omit<Tarefa, "id" | "dataCriacao">): Tarefa {
    
    if (!tarefa.titulo || tarefa.titulo.trim() === "") {
      throw new Error("O título da tarefa é obrigatório")
    }

    const novaTarefa = {
      ...tarefa,
      status: "pendente" as const,
    }

    return tarefaModel.criar(novaTarefa)
  },

  atualizarTarefa(id: string, tarefa: Partial<Tarefa>): Tarefa | undefined {

    if (tarefa.titulo && tarefa.titulo.trim() === "") {
      throw new Error("O título da tarefa não pode ser vazio")
    }

    return tarefaModel.atualizar(id, tarefa)
  },
  concluirTarefa(id: string): Tarefa | undefined {
    return tarefaModel.atualizar(id, { status: "concluida" })
  },

  excluirTarefa(id: string): boolean {
    return tarefaModel.excluir(id)
  },
}
