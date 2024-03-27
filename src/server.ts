import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ToDoListResolver } from "./resolvers/toDoList-resolver";

// A função 'main' é declarada como 'async', o que permite o uso de 'await' dentro dela.
async function main() {
    // 'buildSchema' é uma função assíncrona que constrói um esquema GraphQL a partir dos resolvers fornecidos.
    // 'await' é usado para esperar a promessa ser resolvida antes de atribuir o resultado à variável 'schema'.
    const schema = await buildSchema({
        resolvers: [ToDoListResolver],
    });

    // 'ApolloServer' é uma classe que encapsula a configuração de um servidor GraphQL.
    // O esquema é passado para o construtor do 'ApolloServer'.
    const server = new ApolloServer({ schema });

    // 'server.listen' inicia o servidor e retorna uma promessa que resolve para um objeto com a URL do servidor.
    // 'await' é usado para esperar a promessa ser resolvida antes de atribuir o resultado à variável 'url'.
    const { url } = await server.listen();

    // A URL do servidor é registrada no console.
    console.log(`Servidor HTTP rodando em ${url}`);
}

// A função 'main' é chamada para iniciar o servidor.
main();
