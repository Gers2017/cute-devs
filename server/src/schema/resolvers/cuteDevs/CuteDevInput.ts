import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class CuteDevsInput {
  @Field((type) => Int, { nullable: true })
  limit: number = 5;
}

@InputType()
export class PartialCuteDevInput {
  @Field((type) => String, { nullable: true })
  username: string;

  @Field((type) => String, { nullable: true })
  bio: string;

  @Field((type) => String, { nullable: true })
  imageUrl: string;

  @Field((type) => [String], { nullable: true })
  projects: string[];

  @Field((type) => [String], { nullable: true })
  languages: string[];
}

@InputType()
export class EditCuteDevInput {
  @Field(() => ID)
  id!: string;

  @Field()
  editInput: PartialCuteDevInput;
}
