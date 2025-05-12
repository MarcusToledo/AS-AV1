"use client"

interface FiltroStatusProps {
  filtroAtual: string
  onFiltroChange: (filtro: string) => void
}

export default function FiltroStatus({ filtroAtual, onFiltroChange }: FiltroStatusProps) {
  return (
    <div className="flex items-center">
      <span className="text-sm text-gray-600 mr-2">Filtrar por:</span>
      <select
        value={filtroAtual}
        onChange={(e) => onFiltroChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="todas">Todas</option>
        <option value="pendente">Pendentes</option>
        <option value="concluida">Concluídas</option>
      </select>
    </div>
  )
}
