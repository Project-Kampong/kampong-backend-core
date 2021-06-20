import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
class Answer {
  @Field(() => ID)
  _id: string;
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userId: string;
  @Field()
  @Prop()
  answerText: string;
  @Field(() => Int)
  @Prop()
  voteCount: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
@Schema({ timestamps: true })
class Question {
  @Field(() => ID)
  _id: string;
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userId: string;
  @Field()
  @Prop()
  questionText: string;
  @Field(() => Int)
  @Prop()
  voteCount: number;
  @Field(() => [Answer])
  @Prop([Answer])
  answers: Answer[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
@Schema()
class QnaSession {
  @Field(() => [Question])
  @Prop([Question])
  questions: Question[];
}

@ObjectType()
@Schema({ timestamps: true })
export class OrganizedEvent {
  @Field(() => ID)
  _id: string;
  @Field(() => String)
  @Prop()
  eventName: string;
  @Field()
  @Prop()
  startDate: Date;
  @Field()
  @Prop()
  endDate: Date;
  @Field()
  @Prop()
  description: string;
  @Field(() => ID, { description: `Organizer's user ID` })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  organizerId: string;
  @Field()
  @Prop()
  category: string;
  @Field()
  @Prop()
  eventPassword: string;
  @Field()
  @Prop()
  qnaSessionOpen: boolean;
  @Field(() => QnaSession)
  @Prop()
  qnaSession: QnaSession;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const AnswerSchema = SchemaFactory.createForClass(Answer);
export const QnaSessionSchema = SchemaFactory.createForClass(QnaSession);
export const OrganizedEventSchema =
  SchemaFactory.createForClass(OrganizedEvent);
