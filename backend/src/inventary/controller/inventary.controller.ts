import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InventaryService } from '../services/inventary.service';
import { CreateTreeDto, UpdateTreeDto } from '../dtos/tree.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('inventary')
export class InventaryController {
  constructor(private inventaryServices: InventaryService) {}

  @Get()
  getAll() {
    return this.inventaryServices.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventaryServices.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() body: CreateTreeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('File received: ', file);
    return this.inventaryServices.create(body, file);
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
