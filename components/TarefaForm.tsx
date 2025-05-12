"use client"

import type React from "react"

import type { Tarefa } from "@/types/tarefa"
import { useEffect, useState } from "react"

interface TarefaFormProps {
  tarefaParaEditar: Tarefa | null
  onSubmit: (tarefa: Omit<Tarefa, "id" | "dataCriacao">) => void
  onCancelar: () => void
}

export default function TarefaForm({ tarefaParaEditar, onSubmit, onCancelar }: TarefaFormProps) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState<string | null>(null)

  // Preencher o formulário quando uma tarefa for selecionada para edição
  useEffect(() => {
    if (tarefaParaEditar) {
      setTitulo(tarefaParaEditar.titulo)
      setDescricao(tarefaParaEditar.descricao || "")
    } else {
      setTitulo("")
      setDescricao("")
    }
  }, [tarefaParaEditar])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!titulo.trim()) {
      setErro("O título da tarefa é obrigatório")
      return
    }

    setErro(null)

    onSubmit({
      titulo,
      descricao,
      status: "pendente", // Novas tarefas sempre começam como pendentes
    })

    if (!tarefaParaEditar) {
      setTitulo("")
      setDescricao("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {erro && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{erro}</div>}

      <div className="mb-4">
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título *
        </label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o título da tarefa"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite a descrição da tarefa (opcional)"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        {tarefaParaEditar && (
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {tarefaParaEditar ? "Atualizar" : "Adicionar"}
        </button>
      </div>
    </form>
  )
}
