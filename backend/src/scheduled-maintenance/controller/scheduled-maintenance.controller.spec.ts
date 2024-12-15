import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledMaintenanceController } from './scheduled-maintenance.controller';

describe('ScheduledMaintenanceController', () => {
  let controller: ScheduledMaintenanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduledMaintenanceController],
    }).compile();

    controller = module.get<ScheduledMaintenanceController>(ScheduledMaintenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
