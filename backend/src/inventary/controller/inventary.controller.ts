import { Controller, Get } from '@nestjs/common';
import { InventaryService } from '../services/inventary.service';

@Controller('inventary')
export class InventaryController {
  constructor(private inventaryServices: InventaryService) {}

  @Get()
  getAll() {
    return {
      arboles: this.inventaryServices.getAll(),
    };
  }
}
