import "reflect-metadata";
import path from "node:path";
import { ApolloServer } from "apollo-server";
// import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { buildSchema } from "type-graphql";
import { ToDoListResolver } from "./resolvers/toDoList-resolver";

// export const handler = async function main(
//     event: APIGatewayProxyEventV2,
//     context: Context
// ) {
//     const schema = await buildSchema({
//         resolvers: [ToDoListResolver],
//     });

//     const server = new ApolloServer({ schema });

//     const handler = server.createHandler();

//     // Cria um novo callback que resolve quando a promessa é resolvida
//     const callback = (error: any, result: any) => {
//         if (error) {
//             return Promise.reject(error);
//         } else {
//             return Promise.resolve(result);
//         }
//     };

//     return handler(event, context, callback);
// };

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
