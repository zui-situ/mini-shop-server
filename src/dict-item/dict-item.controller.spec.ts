import { Test, TestingModule } from '@nestjs/testing';
import { DictItemController } from './dict-item.controller';

describe('DictItemController', () => {
  let controller: DictItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictItemController],
    }).compile();

    controller = module.get<DictItemController>(DictItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
