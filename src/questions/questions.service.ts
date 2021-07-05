import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OrganizedEvent,
  OrganizedEventDocument,
} from '../organized-events/schemas/organized-event.schema';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(OrganizedEvent.name)
    private readonly organizedEventModel: Model<OrganizedEventDocument>,
  ) {}

  async create(
    organizedEventId: string,
    createQuestionInput: CreateQuestionInput,
  ) {
    const newQuestion = await this.questionModel.create(createQuestionInput);
    const newOrganizedEvent = await this.organizedEventModel.findByIdAndUpdate(
      organizedEventId,
      {
        $push: {
          'qnaSession.questions': { $each: [newQuestion], $position: 0 },
        },
      },
      { new: true, lean: true },
    );

    return newOrganizedEvent.qnaSession?.questions[0];
  }

  update(id: string, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  async remove(questionId: string) {
    const organizedEvent = await this.organizedEventModel.findOneAndUpdate(
      {
        'qnaSession.questions._id': questionId,
      },
      {
        $pull: { 'qnaSession.questions': { _id: questionId } },
      },
    );
    const questionRemoved = organizedEvent.qnaSession?.questions.find(
      (qn) => qn.id === questionId,
    );
    return questionRemoved;
  }
}
