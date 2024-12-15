import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledMaintenanceService } from './scheduled-maintenance.service';

describe('ScheduledMaintenanceService', () => {
  let service: ScheduledMaintenanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduledMaintenanceService],
    }).compile();

    service = module.get<ScheduledMaintenanceService>(ScheduledMaintenanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
