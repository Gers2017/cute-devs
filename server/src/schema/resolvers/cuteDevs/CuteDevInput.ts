import { CuteDev } from "src/schema/entities/CuteDev";
import { Field, ID, InputType } from "type-graphql";

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
  // editInput: Partial<
  //   Pick<CuteDev, "username" | "bio" | "imageUrl" | "projects" | "languages">
  // >;
}
