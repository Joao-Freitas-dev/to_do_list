import { ApolloServer } from "apollo-server";
import "reflect-metadata";

//criação de função (pode ser qualquer nome) serve apenas para podermos executar async e await
async function main() {
    //criando servidor com apollo server
    const server = new ApolloServer({});

    const { url } = await server.listen();

    console.log(`Http server running ${url}`);
}

main();
