import { Injectable } from '@nestjs/common';
import { CreateOrganizedEventInput } from './dto/create-organized-event.input';
import { UpdateOrganizedEventInput } from './dto/update-organized-event.input';

@Injectable()
export class OrganizedEventsService {
  create(createOrganizedEventInput: CreateOrganizedEventInput) {
    return 'This action adds a new organizedEvent';
  }

  findAll() {
    return `This action returns all organizedEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizedEvent`;
  }

  update(id: number, updateOrganizedEventInput: UpdateOrganizedEventInput) {
    return `This action updates a #${id} organizedEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizedEvent`;
  }
}
