import type { Tarefa } from "@/types/tarefa"

const API_URL = "/api"

export async function getTarefas(status?: string): Promise<Tarefa[]> {
  let url = `${API_URL}/tarefas`
  if (status) {
    url += `?status=${status}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Erro ao buscar tarefas")
  }

  return response.json()
}

export async function createTarefa(tarefa: Omit<Tarefa, "id" | "dataCriacao">): Promise<Tarefa> {
  const response = await fetch(`${API_URL}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar tarefa")
  }

  return response.json()
}

export async function updateTarefa(id: string, tarefa: Partial<Tarefa>): Promise<Tarefa> {
  const response = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa")
  }

  return response.json()
}

export async function completeTarefa(id: string): Promise<Tarefa> {
  const response = await fetch(`${API_URL}/tarefas/${id}/concluir`, {
    method: "PATCH",
  })

  if (!response.ok) {
    throw new Error("Erro ao concluir tarefa")
  }

  return response.json()
}

export async function deleteTarefa(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Erro ao excluir tarefa")
  }
}
