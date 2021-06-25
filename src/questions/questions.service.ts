import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OrganizedEvent,
  OrganizedEventDocument,
} from 'src/organized-events/schemas/organized-event.schema';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(OrganizedEvent.name)
    private readonly organizedEventModel: Model<OrganizedEventDocument>,
  ) {}

  async create(
    organizedEventId: string,
    createQuestionInput: CreateQuestionInput,
  ) {
    const updatedOrganizedEvent = await this.organizedEventModel
      .findByIdAndUpdate(
        organizedEventId,
        {
          $push: { 'qnaSession.questions': createQuestionInput },
        },
        {
          new: true,
          lean: true,
        },
      )
      .exec();
    const {
      qnaSession: { questions },
    } = updatedOrganizedEvent;
    return questions;
  }

  update(id: string, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: string) {
    return `This action removes a #${id} question`;
  }
}
