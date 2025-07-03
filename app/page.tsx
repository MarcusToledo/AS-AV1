"use client"

import FiltroStatus from "@/components/FiltroStatus"
import TarefaForm from "@/components/TarefaForm"
import TarefaLista from "@/components/TarefaLista"
import { completeTarefa, createTarefa, deleteTarefa, gerarRelatorio, getTarefas, updateTarefa } from "@/services/tarefaService"
import type { Tarefa } from "@/types/tarefa"
import { useEffect, useState } from "react"

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [tarefaParaEditar, setTarefaParaEditar] = useState<Tarefa | null>(null)
  const [filtroStatus, setFiltroStatus] = useState<string>("todas")
  const [carregando, setCarregando] = useState<boolean>(true)
  const [erro, setErro] = useState<string | null>(null)
  const [gerandoRelatorio, setGerandoRelatorio] = useState<boolean>(false)

  const buscarTarefas = async (status?: string) => {
    setCarregando(true)
    try {
      const dados = await getTarefas(status !== "todas" ? status : undefined)
      setTarefas(dados)
      setErro(null)
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error)
      setErro("Não foi possível carregar as tarefas.")
    } finally {
      setCarregando(false)
    }
  }

  // Carregar tarefas quando o componente montar ou o filtro mudar
  useEffect(() => {
    buscarTarefas(filtroStatus)
  }, [filtroStatus])

  const adicionarTarefa = async (tarefa: Omit<Tarefa, "id" | "dataCriacao">) => {
    try {
      await createTarefa(tarefa)
      await buscarTarefas(filtroStatus)
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error)
      setErro("Não foi possível adicionar a tarefa.")
    }
  }

  const atualizarTarefa = async (id: string, tarefa: Partial<Tarefa>) => {
    try {
      await updateTarefa(id, tarefa)
      await buscarTarefas(filtroStatus)
      setTarefaParaEditar(null)
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error)
      setErro("Não foi possível atualizar a tarefa.")
    }
  }

  const concluirTarefa = async (id: string) => {
    try {
      await completeTarefa(id)
      await buscarTarefas(filtroStatus)
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error)
      setErro("Não foi possível concluir a tarefa.")
    }
  }

  const excluirTarefa = async (id: string) => {
    try {
      await deleteTarefa(id)
      await buscarTarefas(filtroStatus)
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error)
      setErro("Não foi possível excluir a tarefa.")
    }
  }

  const handleGerarRelatorio = async () => {
    setGerandoRelatorio(true)
    try {
      const blob = await gerarRelatorio()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "relatorio_tarefas.pdf"
      a.click()
      a.remove()
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
      setErro("Não foi possível gerar o relatório.")
    } finally {
      setGerandoRelatorio(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Controle de Tarefas</h1>

      {erro && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{erro}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{tarefaParaEditar ? "Editar Tarefa" : "Nova Tarefa"}</h2>
        <TarefaForm
          tarefaParaEditar={tarefaParaEditar}
          onSubmit={tarefaParaEditar ? (tarefa) => atualizarTarefa(tarefaParaEditar.id, tarefa) : adicionarTarefa}
          onCancelar={() => setTarefaParaEditar(null)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lista de Tarefas</h2>
          <div className="flex items-center gap-2">
            <FiltroStatus filtroAtual={filtroStatus} onFiltroChange={setFiltroStatus} />
            <button
              type="button"
              onClick={handleGerarRelatorio}
              disabled={gerandoRelatorio}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {gerandoRelatorio ? "Gerando..." : "Gerar Relatório"}
            </button>
          </div>
        </div>

        {carregando ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <TarefaLista
            tarefas={tarefas}
            onEditar={setTarefaParaEditar}
            onConcluir={concluirTarefa}
            onExcluir={excluirTarefa}
          />
        )}
      </div>
    </div>
  )
}
