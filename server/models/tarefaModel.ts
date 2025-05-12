import type { Tarefa } from "@/types/tarefa"
import { v4 as uuidv4 } from "uuid"

// Dados mock para tarefas
let tarefas: Tarefa[] = [
  {
    id: "1",
    titulo: "Implementar autenticação",
    descricao: "Adicionar sistema de login com JWT",
    status: "pendente",
    dataCriacao: new Date().toISOString(),
  },
  {
    id: "2",
    titulo: "Criar componente de dashboard",
    descricao: "Desenvolver interface com gráficos de progresso",
    status: "pendente",
    dataCriacao: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    titulo: "Corrigir bug no formulário",
    descricao: "O formulário não está validando corretamente os campos",
    status: "concluida",
    dataCriacao: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "4",
    titulo: "Otimizar consultas ao banco",
    descricao: "Melhorar performance das consultas SQL",
    status: "pendente",
    dataCriacao: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "5",
    titulo: "Documentar API",
    descricao: "Criar documentação com Swagger",
    status: "concluida",
    dataCriacao: new Date(Date.now() - 345600000).toISOString(),
  },
]

export const tarefaModel = {
  // Listar todas as tarefas
  listar(status?: string): Tarefa[] {
    if (status) {
      return tarefas.filter((tarefa) => tarefa.status === status)
    }
    return tarefas
  },

  buscar(id: string): Tarefa | undefined {
    return tarefas.find((tarefa) => tarefa.id === id)
  },

  criar(tarefa: Omit<Tarefa, "id" | "dataCriacao">): Tarefa {
    const novaTarefa: Tarefa = {
      id: uuidv4(),
      ...tarefa,
      dataCriacao: new Date().toISOString(),
    }

    tarefas.push(novaTarefa)
    return novaTarefa
  },

  atualizar(id: string, dadosTarefa: Partial<Tarefa>): Tarefa | undefined {
    const index = tarefas.findIndex((tarefa) => tarefa.id === id)

    if (index === -1) {
      return undefined
    }

    const tarefaAtualizada = {
      ...tarefas[index],
      ...dadosTarefa,
    }

    tarefas[index] = tarefaAtualizada
    return tarefaAtualizada
  },

  excluir(id: string): boolean {
    const tamanhoAnterior = tarefas.length
    tarefas = tarefas.filter((tarefa) => tarefa.id !== id)
    return tarefas.length < tamanhoAnterior
  },
}
