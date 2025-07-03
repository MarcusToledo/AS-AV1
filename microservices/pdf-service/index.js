import express from 'express';
import fetch from 'node-fetch';
import PDFDocument from 'pdfkit';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

const app = express();
app.use(cors());

app.get('/relatorio', async (req, res) => {
  try {
    const response = await fetch(`${APP_URL}/api/tarefas`);
    if (!response.ok) {
      throw new Error('Erro ao buscar tarefas');
    }
    const tarefas = await response.json();

    const doc = new PDFDocument();
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=relatorio_tarefas.pdf');
      res.send(pdfBuffer);
    });

    doc.fontSize(18).text('Rel\u00e1torio de Tarefas', { align: 'center' });
    doc.moveDown();

    tarefas.forEach((tarefa) => {
      doc.fontSize(12).text(`\u2022 ${tarefa.titulo} - ${tarefa.status} - ${new Date(tarefa.dataCriacao).toLocaleDateString()}`);
      if (tarefa.descricao) {
        doc.text(`  ${tarefa.descricao}`);
      }
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar relat\u00f3rio');
  }
});

app.listen(PORT, () => {
  console.log(`PDF service running on port ${PORT}`);
});
