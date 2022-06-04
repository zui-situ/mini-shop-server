import { Module } from '@nestjs/common';
import { FreeController } from './free.controller';
import { FreeService } from './free.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [FreeController],
  providers: [FreeService],
  exports: [FreeService],
})
export class FreeModule {}
