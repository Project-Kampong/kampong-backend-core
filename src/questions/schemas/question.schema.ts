import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type QuestionDocument = Question & mongoose.Document;

@ObjectType()
@Schema({ timestamps: true })
class Answer {
  @Field(() => ID)
  _id: string;
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false })
  userId?: string;
  @Field()
  @Prop()
  displayName: string;
  @Field()
  @Prop()
  answerText: string;
  @Field(() => Int)
  @Prop({ default: 0 })
  voteCount: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

@ObjectType()
@Schema({ timestamps: true })
export class Question {
  @Field(() => ID)
  _id: string;
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false })
  userId?: string;
  @Field()
  @Prop()
  displayName: string;
  @Field()
  @Prop()
  questionText: string;
  @Field(() => Int)
  @Prop({ default: 0 })
  voteCount: number;
  @Field(() => [Answer])
  @Prop({ type: [AnswerSchema] })
  answers: Answer[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
