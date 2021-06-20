import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
class Question {
  @Field(() => ID)
  _id: string;
  @Field(() => ID)
  userId: string;
  @Field()
  username: string;
  @Field()
  questionText: string;
  @Field(() => Int)
  voteCount: number;
  @Field(() => [Answer])
  answers: Answer[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
class Answer {
  @Field(() => ID)
  _id: string;
  @Field(() => ID)
  userId: string;
  @Field()
  username: string;
  @Field()
  answerText: string;
  @Field(() => Int)
  voteCount: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
@ObjectType()
class QnaSession {
  @Field(() => [Question])
  questions: Question[];
}
@ObjectType()
export class OrganizedEvent {
  @Field(() => ID)
  _id: string;
  @Field(() => String)
  eventName: string;
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
  @Field()
  description: string;
  @Field(() => ID, { description: `Organizer's user ID` })
  organizerId: string;
  @Field()
  category: string;
  @Field()
  eventPassword: string;
  @Field()
  qnaSessionOpen: boolean;
  @Field(() => QnaSession)
  qnaSession: QnaSession;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
