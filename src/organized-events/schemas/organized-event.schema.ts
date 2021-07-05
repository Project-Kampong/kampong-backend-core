import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {
  Question,
  QuestionSchema,
} from '../../questions/schemas/question.schema';

export type OrganizedEventDocument = OrganizedEvent & mongoose.Document;

@ObjectType()
@Schema()
class QnaSession {
  @Field(() => ID)
  _id: string;
  @Field(() => [Question])
  @Prop({ type: [QuestionSchema] })
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
