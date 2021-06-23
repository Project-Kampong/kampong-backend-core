import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrganizedEventInput } from './dto/create-organized-event.input';
import { UpdateOrganizedEventInput } from './dto/update-organized-event.input';
import {
  OrganizedEvent,
  OrganizedEventDocument,
} from './schemas/organized-event.schema';

@Injectable()
export class OrganizedEventsService {
  constructor(
    @InjectModel(OrganizedEvent.name)
    private readonly organizedEventModel: Model<OrganizedEventDocument>,
  ) {}
  create(createOrganizedEventInput: CreateOrganizedEventInput) {
    return this.organizedEventModel.create(createOrganizedEventInput);
  }

  findAll() {
    return this.organizedEventModel.find().lean().exec();
  }

  findEventsByUserId(userId: string) {
    return this.organizedEventModel.find({ organizerId: userId }).lean().exec();
  }

  findOne(organizedEventId: string) {
    return this.organizedEventModel.findById(organizedEventId).lean().exec();
  }

  update(
    organizedEventId: string,
    updateOrganizedEventInput: UpdateOrganizedEventInput,
  ) {
    return this.organizedEventModel
      .findByIdAndUpdate(organizedEventId, updateOrganizedEventInput, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  remove(organizedEventId: string) {
    return this.organizedEventModel
      .findByIdAndDelete(organizedEventId)
      .lean()
      .exec();
  }
}
