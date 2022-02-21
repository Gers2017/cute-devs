import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class PostsInput {
  @Field(() => Int, { nullable: true })
  take: number = 10;

  @Field(() => Int, { nullable: true })
  skip: number = 0;

  @Field(() => ID, { nullable: true })
  creatorId?: string;

  @Field(() => Boolean, { nullable: true })
  reverse: boolean = false;
}
