import { Post } from "../../../schema/entities/Post";
import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType()
export class OperationError {
  constructor(type: string, details: string) {
    this.type = type;
    this.details = details;
  }
  @Field()
  type: string;
  @Field()
  details: string;
}

@ObjectType()
export class AuthUserResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => OperationError, { nullable: true })
  error?: OperationError;
}

@ObjectType()
export class TokenResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => OperationError, { nullable: true })
  error?: OperationError;
}

@ObjectType()
export class LogoutResponse {
  @Field(() => Boolean)
  success?: boolean;
  @Field(() => OperationError, { nullable: true })
  error?: OperationError;
}

@ObjectType()
export class DeleteResponse {
  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => OperationError, { nullable: true })
  error?: OperationError;
}

@ObjectType()
export class StarPostResponse {
  @Field(() => Int, { nullable: true })
  stars?: number;

  @Field(() => OperationError, { nullable: true })
  error?: OperationError;
}

@ObjectType()
export class CreatePostdevResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => OperationError, { nullable: true })
  error?: OperationError;
}

@ObjectType()
class EditedCutedev {
  @Field(() => ID)
  id!: string;

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

@ObjectType()
export class EditCutedevResponse {
  @Field(() => EditedCutedev, { nullable: true })
  edited?: EditedCutedev;

  @Field(() => OperationError, { nullable: true })
  error?: OperationError;
}
