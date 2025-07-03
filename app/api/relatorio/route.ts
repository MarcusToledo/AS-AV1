import { NextResponse } from "next/server";
import { tarefaController } from "@/server/controllers/tarefaController";
import PDFDocument from "pdfkit";

export async function GET() {
  const tarefas = tarefaController.listarTarefas();
  const doc = new PDFDocument();
  const chunks: Buffer[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {});

  doc.fontSize(18).text("Relatório de Tarefas", { align: "center" });
  doc.moveDown();

  tarefas.forEach((tarefa) => {
    doc
      .fontSize(12)
      .text(
        `• ${tarefa.titulo} - ${tarefa.status} - ${new Date(
          tarefa.dataCriacao
        ).toLocaleDateString()}`
      );
    if (tarefa.descricao) {
      doc.text(`  ${tarefa.descricao}`);
    }
    doc.moveDown();
  });

  doc.end();

  const pdfBuffer = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=relatorio_tarefas.pdf",
    },
  });
}
