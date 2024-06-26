import { Field, ObjectType } from "type-graphql";

//colocando o type
@ObjectType()
//class model
export class ToDoListModel {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    state: string;

    @Field()
    createdAt: string;
}
