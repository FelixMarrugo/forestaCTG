import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { InventaryService } from '../services/inventary.service';
import { CreateTreeDto, UpdateTreeDto } from '../dtos/arbol.dto';

@Controller('inventary')
export class InventaryController {
  constructor(private inventaryServices: InventaryService) {}

  @Get()
  getAll() {
    return {
      arboles: this.inventaryServices.getAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventaryServices.findOne(id);
  }

  @Post()
  create(@Body() body: CreateTreeDto) {
    return this.inventaryServices.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTreeDto,
  ) {
    return this.inventaryServices.update(id, payload);
  }

  @Put('disable/:id')
  disable(@Param('id', ParseIntPipe) id: number) {
    return this.inventaryServices.disable(id);
  }
}