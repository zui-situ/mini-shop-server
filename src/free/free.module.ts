import { Module } from '@nestjs/common';
import { FreeController } from './free.controller';
import { FreeService } from './free.service';
import { CategoryModule } from 'src/category/category.module';
import { GoodsModule } from 'src/goods/goods.module';

@Module({
  imports: [CategoryModule, GoodsModule],
  controllers: [FreeController],
  providers: [FreeService],
  exports: [FreeService],
})
export class FreeModule {}
