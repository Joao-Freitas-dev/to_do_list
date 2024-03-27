import { Query, Resolver } from "type-graphql";

//chamando resolver
@Resolver()
//Declarando o resolver (ele é como qualquer outra classe)
export class ToDoListResolver {
    //Para transformar esse código em query vamos utilizar o @Query e precisamos definir o type
    @Query(() => String)
    async helloWorld() {
        return "Hello World";
    }
}
