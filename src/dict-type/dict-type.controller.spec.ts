import { Test, TestingModule } from '@nestjs/testing';
import { DictTypeController } from './dict-type.controller';

describe('DictTypeController', () => {
  let controller: DictTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictTypeController],
    }).compile();

    controller = module.get<DictTypeController>(DictTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
