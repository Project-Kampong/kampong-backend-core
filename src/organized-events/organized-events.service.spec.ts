import { Test, TestingModule } from '@nestjs/testing';
import { OrganizedEventsService } from './organized-events.service';

describe('OrganizedEventsService', () => {
  let service: OrganizedEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizedEventsService],
    }).compile();

    service = module.get<OrganizedEventsService>(OrganizedEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
