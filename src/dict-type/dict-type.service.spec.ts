import { Test, TestingModule } from '@nestjs/testing';
import { DictTypeService } from './dict-type.service';

describe('DictTypeService', () => {
  let service: DictTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictTypeService],
    }).compile();

    service = module.get<DictTypeService>(DictTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
