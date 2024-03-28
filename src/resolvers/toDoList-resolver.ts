import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { CreateToDoList } from "../dtos/inputs/create-toDoList-input";
import { ToDoListModel } from "../dtos/models/toDoList-model";
import { v4 as uuidv4 } from "uuid";

//chamando resolver
@Resolver()
//Declarando o resolver (ele é como qualquer outra classe)
export class ToDoListResolver {
    //Para transformar esse código em query vamos utilizar o @Query e precisamos definir o type
    @Query(() => [ToDoListModel])
    async allToDoList() {
        return [{ createdAt: new Date() }];
    }

    //por se tratar de uma mutation, colocaremos @mutation e o retorno (type) estamos utilizando boolean por enquanto para poder usar o true
    @Mutation(() => ToDoListModel)
    //criando mutation to do list
    async createToDo(@Arg("data") data: CreateToDoList) {
        const createToDoList = {
            title: data.title,
            description: data.description,
            createdAt: data.createdAt,
            status: "pending",
            Id: uuidv4(),
        };

        return createToDoList;
    }
}
