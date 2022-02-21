import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class PostsInput {
  @Field((type) => Int, { nullable: true })
  take: number = 10;

  @Field((type) => Int, { nullable: true })
  skip: number = 0;

  @Field((type) => ID, { nullable: true })
  creatorId?: string;

  @Field((type) => Boolean, { nullable: true })
  reverse: boolean = false;
}

@InputType()
export class CreatePostInput {
  @Field()
  text!: string;
}
