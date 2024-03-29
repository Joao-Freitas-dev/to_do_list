import "reflect-metadata";
import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { CreateToDoList } from "../dtos/inputs/create-toDoList-input";
import { ToDoListModel } from "../dtos/models/toDoList-model";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const dynamoDBConfig = {
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(dynamoDBConfig);

//instância do DocumentClient do DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient();

// Define o resolver para manipular operações relacionadas à lista de tarefas (ToDoList)
@Resolver()
export class ToDoListResolver {
    // Define uma consulta (query) chamada allToDoList que retorna uma lista de ToDoListItems
    @Query(() => [ToDoListModel])
    async allToDoList() {
        // Define os parâmetros de consulta para escanear (scan) todos os itens na tabela "Todolist"
        const params = {
            TableName: "Todolist",
        };
        // Executa a operação de escaneamento na tabela e espera pela resposta
        const data = await docClient.scan(params).promise();

        // Mapeia os itens retornados pelo DynamoDB para o formato de modelo de objeto (ToDoListModel)
        const todoListItems = data.Items?.map((item) => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                state: item.state,
                createdAt: new Date(item.createdAt),
            } as unknown as ToDoListModel; // Converte os itens para o tipo ToDoListModel
        });

        // Retorna a lista de itens da lista de tarefas
        return todoListItems || []; // Retorna uma lista vazia se não houver itens
    }

    // criar uma nova entrada na lista de tarefas
    @Mutation(() => ToDoListModel)
    async createToDo(@Arg("data") data: CreateToDoList) {
        // Gera um ID único para a nova entrada
        const id = uuidv4();
        // Define a data de criação como a data atual caso não tenhamos entrada
        const createdAt = data.createdAt || new Date();
        // Define o status como "pending" se não for fornecido na entrada
        const status = data.state || "pending";

        // Define os parâmetros para adicionar um novo item na tabela "Todolist"
        const params = {
            TableName: "Todolist",
            Item: {
                id: id,
                title: data.title,
                description: data.description,
                state: status,
                createdAt: createdAt.toString(), // Converte a data para string
            },
        };

        try {
            // Salva o novo item no DynamoDB e aguarda a conclusão
            await docClient.put(params).promise();

            // Retorna o novo item criado
            return { ...params.Item } as unknown as ToDoListModel;
        } catch (err) {
            // Registra e relança um erro se ocorrer algum problema ao salvar o item
            if (err instanceof Error) {
                throw new Error(
                    "Erro ao salvar item no DynamoDB: " + err.toString()
                );
            } else {
                throw new Error("Erro ao salvar item no DynamoDB");
            }
        }
    }

    // atualiza uma entrada existente na lista de tarefas
    @Mutation(() => ToDoListModel)
    async updateToDo(@Arg("id") id: string, @Arg("data") data: CreateToDoList) {
        try {
            const expressionAttributeNames = {
                "#s": "state",
            };

            const updateExpression =
                "set title = :t, description = :d, #s = :s";

            // Define the attribute values
            const expressionAttributeValues = {
                ":t": data.title,
                ":d": data.description,
                ":s": data.state,
            };

            const params = {
                TableName: "Todolist",
                Key: {
                    id: id,
                },
                UpdateExpression: updateExpression,
                ExpressionAttributeNames: expressionAttributeNames,
                ExpressionAttributeValues: expressionAttributeValues,
                ReturnValues: "ALL_NEW",
            };

            const updatedItem = await docClient.update(params).promise();

            return updatedItem.Attributes as ToDoListModel;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(
                    "Erro ao atualizar item no DynamoDB: " + err.toString()
                );
            } else {
                throw new Error("Erro ao atualizar item no DynamoDB");
            }
        }
    }

    //deleteToDo para excluir uma entrada existente na lista de tarefas
    @Mutation(() => Boolean)
    async deleteToDo(@Arg("id") id: string) {
        // Define os parâmetros para excluir um item na tabela "Todolist"
        const params = {
            TableName: "Todolist",
            Key: {
                id: id,
            },
        };

        // Exclui o item na tabela e aguarda a conclusão
        await docClient.delete(params).promise();

        // Retorna true se a exclusão for bem-sucedida
        return true;
    }
}
