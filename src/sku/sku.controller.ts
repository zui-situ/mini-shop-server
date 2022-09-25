import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkuService } from './sku.service';
import { Sku } from '@app/db/models/sku.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';

//添加增删改查方法
@Crud({
  model: Sku,
})
@Controller('sku')
@ApiTags('商品规格')
export class SkuController {
  constructor(
    private readonly skuService: SkuService,
    @InjectModel(Sku)
    private model: ReturnModelType<typeof Sku>,
  ) {}
}
