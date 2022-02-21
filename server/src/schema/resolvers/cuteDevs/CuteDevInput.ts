import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class CuteDevsInput {
  @Field(() => Int, { nullable: true })
  limit: number = 5;
}

@InputType()
export class EditCuteDevInput {
  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  imageUrl: string;

  @Field(() => [String], { nullable: true })
  projects: string[];

  @Field(() => [String], { nullable: true })
  languages: string[];
}
