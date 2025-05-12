import type { Metadata } from "next"
import type React from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Controle de Tarefas",
  description: "Aplicação para gerenciamento de tarefas"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
