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
  @Prop({ default: 0 })
  voteCount: number;
  @Field(() => [Answer])
  @Prop({ type: [AnswerSchema], default: () => ({}) })
  answers: Answer[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@ObjectType()
@Schema()
class QnaSession {
  @Field(() => ID)
  _id: string;
  @Field(() => [Question])
  @Prop({ type: [QuestionSchema], default: () => ({}) })
  questions: Question[];
}
export const QnaSessionSchema = SchemaFactory.createForClass(QnaSession);
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
  @Field({ nullable: true })
  @Prop()
  endDate?: Date;
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
  @Prop({ default: '' })
  eventPassword: string;
  @Field()
  @Prop({ type: Boolean, default: false })
  qnaSessionOpen: boolean;
  @Field(() => QnaSession)
  // Apply QnaSessionSchema subdocument default values. See: https://mongoosejs.com/docs/subdocs.html
  @Prop({ type: QnaSessionSchema, default: () => ({}) })
  qnaSession: QnaSession;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

export const OrganizedEventSchema =
  SchemaFactory.createForClass(OrganizedEvent);
