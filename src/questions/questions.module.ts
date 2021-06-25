import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { Question, QuestionSchema } from './schemas/question.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizedEventsModule } from 'src/organized-events/organized-events.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    OrganizedEventsModule,
  ],
  providers: [QuestionsResolver, QuestionsService],
})
export class QuestionsModule {}
