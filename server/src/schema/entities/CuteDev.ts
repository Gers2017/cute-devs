import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity()
@ObjectType()
export class CuteDev extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Column("varchar", { default: "" })
  sessionId!: string;

  @Field()
  @Column("varchar", {
    length: 120,
    unique: true,
  })
  username: string;

  @Column("varchar", {
    nullable: false,
  })
  password: string;

  @Field()
  @Column("text", {
    default: "",
  })
  bio: string;

  @Field((type) => [String])
  @Column("text", { array: true })
  languages: string[];

  @Field(() => String)
  @Column("date")
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn({ nullable: true, type: "date" })
  updatedAt = new Date();

  @Field({ description: "Url of the image used by this cute dev" })
  @Column("text")
  imageUrl: string;

  @Field((type) => [String])
  @Column("text", { array: true })
  projects: string[];

  @Field((type) => [Post], { defaultValue: [] })
  @OneToMany(() => Post, (post) => post.creator, {
    cascade: true,
    onDelete: "CASCADE",
  })
  posts: Post[];
}
