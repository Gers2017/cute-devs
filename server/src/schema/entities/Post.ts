import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CuteDev } from "./CuteDev";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  text: string;

  @Field(() => String)
  @Column("date")
  date = new Date();

  @Field()
  @Column("int")
  stars: number;

  @Field((type) => CuteDev)
  @ManyToOne(() => CuteDev, (cutedev) => cutedev.posts, {
    onDelete: "CASCADE",
  })
  creator: CuteDev;
}
