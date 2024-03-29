README - Projeto To-Do List

Este é um guia passo a passo para configurar e executar o projeto To-Do List, uma aplicação em Node.js utilizando TypeScript, GraphQL e AWS DynamoDB+lambda.

Requisitos
Node.js instalado na sua máquina. Você pode baixá-lo em nodejs.org.
Conta na AWS com permissões para criar e gerenciar serviços como DynamoDB.
Configuração do AWS CLI na sua máquina, caso deseje fazer a configuração manualmente. Você pode instalá-lo seguindo as instruções em AWS CLI Installation.
Um editor de código, como VSCode, para modificar e executar o código.
Configuração
Clonar o repositório:

bash

git clone <url_do_repositório>
Instalar as dependências:
Navegue até o diretório raiz do projeto e execute o seguinte comando no terminal:

npm install
Configurar o arquivo .env:

Crie um arquivo chamado .env no diretório raiz do projeto.
Adicione as seguintes variáveis de ambiente ao arquivo .env:
makefile

AWS_REGION=<sua_região_da_AWS>
AWS_ENDPOINT=<endpoint_do_DynamoDB>
AWS_ACCESS_KEY_ID=<seu_access_key_id>
AWS_SECRET_ACCESS_KEY=<seu_secret_access_key>
Certifique-se de substituir os valores entre <...> pelos seus próprios valores da AWS.

Criar a tabela DynamoDB:

Faça login no Console da AWS e navegue até o serviço DynamoDB.
Crie uma nova tabela chamada Todolist.
Defina a chave primária como id, do tipo String.
O restante das configurações pode ser deixado como padrão.
Execução do Projeto
Compilar o TypeScript:

comand

npm run build
Executar o projeto localmente:

comand

npm run dev
Isso iniciará um servidor local para o projeto.

Testar as operações GraphQL:

Abra um navegador e acesse http://localhost:4000/graphql.
Você pode utilizar a interface GraphiQL para testar as queries e mutations.
Alguns exemplos de operações:

Listar todas as tarefas:
graphql

query {
allToDoList {
id
title
description
status
createdAt
}
}

Criar uma nova tarefa:
graphql

mutation {
createToDo(data: {
title: "Tarefa 1",
description: "Descrição da tarefa 1",
status: "pending",
createdAt: "2024-03-29T10:00:00.000Z"
}) {
id
title
description
status
createdAt
}
}
Implantação na AWS
Configurar o Serverless Framework:

Instale o Serverless Framework globalmente:
command
npm install -g serverless
Configure as credenciais da AWS com o Serverless Framework:
css
command
serverless config credentials --provider aws --key <seu_access_key_id> --secret <seu_secret_access_key>
Implantar o projeto na AWS:

Execute o comando abaixo no diretório raiz do projeto:
command
serverless deploy
Isso implantará o projeto na AWS e fornecerá as URLs de endpoint para acessar a aplicação.
