import "reflect-metadata";
import path from "node:path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ToDoListResolver } from "./resolvers/toDoList-resolver";
import AWS from "aws-sdk";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do DynamoDB com base nas variáveis de ambiente
const dynamoDBConfig = {
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

// Configura o SDK da AWS com as informações do DynamoDB local
AWS.config.update(dynamoDBConfig);

// Crie uma instância do DocumentClient do DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient();

async function main() {
    // Constrói o esquema GraphQL
    const schema = await buildSchema({
        resolvers: [ToDoListResolver],
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    });

    // Inicia o servidor Apollo GraphQL
    const server = new ApolloServer({ schema });

    const { url } = await server.listen();
    console.log(`Servidor GraphQL rodando em ${url}`);
}

// Chama a função 'main' para iniciar o servidor
main();
