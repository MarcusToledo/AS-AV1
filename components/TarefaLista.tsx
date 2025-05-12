"use client"

import type { Tarefa } from "@/types/tarefa"
import { CheckCircle, Edit, Trash2 } from "lucide-react"

interface TarefaListaProps {
  tarefas: Tarefa[]
  onEditar: (tarefa: Tarefa) => void
  onConcluir: (id: string) => void
  onExcluir: (id: string) => void
}

export default function TarefaLista({ tarefas, onEditar, onConcluir, onExcluir }: TarefaListaProps) {
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (tarefas.length === 0) {
    return <div className="text-center py-8 text-gray-500">Nenhuma tarefa encontrada.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 border-b">Título</th>
            <th className="text-left p-3 border-b">Descrição</th>
            <th className="text-left p-3 border-b">Status</th>
            <th className="text-left p-3 border-b">Data de Criação</th>
            <th className="text-center p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{tarefa.titulo}</td>
              <td className="p-3">{tarefa.descricao}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    tarefa.status === "concluida" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {tarefa.status === "concluida" ? "Concluída" : "Pendente"}
                </span>
              </td>
              <td className="p-3">{formatarData(tarefa.dataCriacao)}</td>
              <td className="p-3">
                <div className="flex justify-center gap-2">
                  {tarefa.status !== "concluida" && (
                    <>
                      <button
                        onClick={() => onEditar(tarefa)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onConcluir(tarefa.id)}
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Marcar como concluída"
                      >
                        <CheckCircle size={18} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onExcluir(tarefa.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
