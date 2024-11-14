import { Module } from '@nestjs/common';
import { InventaryController } from './controller/inventary.controller';
import { InventaryService } from './services/inventary.service';

@Module({
  controllers: [InventaryController],
  providers: [InventaryService]
})
export class InventaryModule {}
