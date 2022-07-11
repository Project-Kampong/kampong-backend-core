import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsGateway } from './questions.gateway';

describe('QuestionsGateway', () => {
  let gateway: QuestionsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsGateway],
    }).compile();

    gateway = module.get<QuestionsGateway>(QuestionsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
