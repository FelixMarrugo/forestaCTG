import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventaryController } from './controller/inventary.controller';
import { InventaryService } from './services/inventary.service';
import { TreeSchema, Tree } from './entities/tree.entity';
import { S3Provider } from './providers/s3/s3.provider';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tree.name,
        schema: TreeSchema,
      },
    ]),
  ],
  controllers: [InventaryController],
  providers: [InventaryService, S3Provider],
})
export class InventaryModule {}
