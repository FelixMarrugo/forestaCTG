import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MaintenanceService } from '../services/maintenance.service';
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from '../dtos/maintenance.dto';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private maintenanceService: MaintenanceService) {}

  @Get()
  getAll() {
    return this.maintenanceService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateMaintenanceDto) {
    return this.maintenanceService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateMaintenanceDto) {
    return this.maintenanceService.update(id, payload);
  }

  @Put('disable/:id')
  disable(@Param('id') id: string) {
    return this.maintenanceService.disable(id);
  }
}
