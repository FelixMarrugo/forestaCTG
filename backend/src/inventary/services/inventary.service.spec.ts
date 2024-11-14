import { Test, TestingModule } from '@nestjs/testing';
import { InventaryService } from './inventary.service';

describe('InventaryService', () => {
  let service: InventaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventaryService],
    }).compile();

    service = module.get<InventaryService>(InventaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
