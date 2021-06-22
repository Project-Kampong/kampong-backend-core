import { Test, TestingModule } from '@nestjs/testing';
import { OrganizedEventsResolver } from './organized-events.resolver';
import { OrganizedEventsService } from './organized-events.service';

describe('OrganizedEventsResolver', () => {
  let resolver: OrganizedEventsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizedEventsResolver, OrganizedEventsService],
    }).compile();

    resolver = module.get<OrganizedEventsResolver>(OrganizedEventsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
