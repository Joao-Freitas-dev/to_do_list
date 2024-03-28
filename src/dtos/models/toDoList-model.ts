import { Field, ObjectType } from "type-graphql";

//colocando o type dela
@ObjectType()
//class model
export class ToDoListModel {
    //field Userid que vamos usar para fazer o relacionamento com user
    @Field()
    Id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    status: string;

    @Field()
    createdAt: Date;
}
