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

Um microserviço dedicado para geração de relatórios em PDF pode ser executado
em `microservices/pdf-service`. Após instalar as dependências e iniciar o
serviço, acesse `http://localhost:4000/relatorio` para baixar o arquivo
`relatorio_tarefas.pdf` contendo todas as tarefas cadastradas.

```bash
cd microservices/pdf-service
npm install
npm start
```
