import { ObjectType, Field, Int } from "type-graphql";
import { CuteDev } from "../../entities/CuteDev";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class ErrorMessage {
  @Field()
  message: string;
}

@ObjectType()
export class CuteDevResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CuteDev, { nullable: true })
  cuteDev?: CuteDev;
}

@ObjectType()
export class DeleteResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean)
  deleted: boolean;
}

@ObjectType()
export class StarPostResponse {
  @Field(() => Int, { nullable: true })
  stars?: number;

  @Field(() => ErrorMessage, { nullable: true })
  error?: ErrorMessage;
}