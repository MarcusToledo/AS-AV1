export interface Tarefa {
  id: string
  titulo: string
  descricao?: string
  status: "pendente" | "concluida"
  dataCriacao: string
}
