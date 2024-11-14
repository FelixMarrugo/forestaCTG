import { Test, TestingModule } from '@nestjs/testing';
import { InventaryController } from './inventary.controller';

describe('InventaryController', () => {
  let controller: InventaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventaryController],
    }).compile();

    controller = module.get<InventaryController>(InventaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
