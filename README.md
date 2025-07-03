# Controle de Tarefas

## Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

## Instruções de Instalação e Execução

### Clonando o Repositório

```bash
git clone https://github.com/MarcusToledo/AS-AV1.git
cd AS-AV1
```

### Instalando Dependências

```shellscript
npm install
```

### Executando o Projeto

```shellscript
npm run dev
```

Após executar o comando acima, o sistema estará disponível em:

- [http://localhost:3000](http://localhost:3000)

## Gerando Relatório de Tarefas

Um microserviço está disponível em `/api/relatorio` para gerar um relatório em
PDF contendo todas as tarefas cadastradas. Basta acessar o endpoint em seu
navegador ou via ferramenta de requisições HTTP e o download do arquivo
`relatorio_tarefas.pdf` será iniciado automaticamente.
