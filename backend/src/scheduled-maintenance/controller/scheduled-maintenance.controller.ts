import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ScheduledMaintenanceService } from '../services/scheduled-maintenance.service';
import { CreateScheduledMaintenanceDto } from '../dtos/scheduled-maintenance.dto';

@Controller('scheduled-maintenance')
export class ScheduledMaintenanceController {
  constructor(
    private scheduledMaintenanceService: ScheduledMaintenanceService,
  ) {}

  @Get()
  getAll() {
    return this.scheduledMaintenanceService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduledMaintenanceService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateScheduledMaintenanceDto) {
    return this.scheduledMaintenanceService.create(body);
  }
}