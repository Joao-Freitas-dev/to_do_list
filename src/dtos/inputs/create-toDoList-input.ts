import { IsDate, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

//por ser um input temos que definir isso com @inputType
@InputType()
//classe que estamos exportando
export class CreateToDoList {
    @IsString()
    @Field()
    title: string;

    @IsString()
    @Field()
    description: string;

    //data de criação//precisamos colocar o type deles (nesse caso field)
    @IsDate()
    @Field()
    createdAt: Date;
}
