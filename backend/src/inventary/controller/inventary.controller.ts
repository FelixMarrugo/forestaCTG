import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventaryService } from '../services/inventary.service';
import { CreateTreeDto, UpdateTreeDto } from '../dtos/tree.dto';

@Controller('inventary')
export class InventaryController {
  constructor(private inventaryServices: InventaryService) {}

  @Get()
  getAll() {
    return this.inventaryServices.getAll({});
  }

  @Post('filter/')
  getTreesWithFilter(@Body() filter) {
    return this.inventaryServices.getAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventaryServices.findOne(id);
  }

  @Post()
  create(@Body() body: CreateTreeDto) {
    return this.inventaryServices.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateTreeDto) {
    return this.inventaryServices.update(id, payload);
  }

  @Put('disable/:id')
  disable(@Param('id') id: string) {
    return this.inventaryServices.disable(id);
  }
}
