import { Test, TestingModule } from '@nestjs/testing';
import { EmsService } from './ems.service';

describe('EmsService', () => {
  let service: EmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmsService],
    }).compile();

    service = module.get<EmsService>(EmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
