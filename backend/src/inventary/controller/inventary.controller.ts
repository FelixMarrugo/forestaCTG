import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventaryService } from '../services/inventary.service';
import { CreateTreeDto, UpdateTreeDto } from '../dtos/tree.dto';

@Controller('inventary')
export class InventaryController {
  constructor(private inventaryServices: InventaryService) {}

  @Get()
  async getAll(filter: object) {
    return await this.inventaryServices.getAll(filter);
  }

  @Post('filter/')
  async getTreesWithFilter(@Body() filter: object) {
    return await this.getAll(filter);
  }

  @Post('filter/trees')
  async getTreesFilter(@Body() filter: { id: [string] }) {
    return await this.inventaryServices.getFilterTrees(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.inventaryServices.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateTreeDto) {
    return await this.inventaryServices.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateTreeDto) {
    return await this.inventaryServices.update(id, payload);
  }

  @Put('disable/:id')
  async disable(@Param('id') id: string) {
    return await this.inventaryServices.disable(id);
  }

  @Put('enable/:id')
  async enable(@Param('id') id: string) {
    return await this.inventaryServices.enable(id);
  }
}
