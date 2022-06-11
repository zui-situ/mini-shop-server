import { Module } from '@nestjs/common';
import { DictItemController } from './dict-item.controller';
import { DictItemService } from './dict-item.service';

@Module({
  controllers: [DictItemController],
  providers: [DictItemService]
})
export class DictItemModule {}
