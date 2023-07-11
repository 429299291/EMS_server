import { Test, TestingModule } from '@nestjs/testing';
import { EmsController } from './ems.controller';
import { EmsService } from './ems.service';

describe('EmsController', () => {
  let controller: EmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmsController],
      providers: [EmsService],
    }).compile();

    controller = module.get<EmsController>(EmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
