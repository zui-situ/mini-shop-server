import { Goods } from '@app/db/models/goods.model';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'libs/common/decorator/crud/crud.decorator';
import { InjectModel } from 'nestjs-typegoose';
import { listDto } from './goods.dto';
import { GoodsService } from './goods.service';

@Crud({
  model: Goods,
  findKey: 'name',
  createDefaultValue: {
    status: 1,
    deleteFlag: 0,
  },
})
@Controller('goods')
@ApiTags('商品')
export class GoodsController {
  constructor(
    private readonly goodsService: GoodsService,
    @InjectModel(Goods)
    private model: ReturnModelType<typeof Goods>,
  ) {}

  @Get('list')
  @ApiOperation({ summary: '分类列表' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async labelList(@Query() query: listDto): Promise<any> {
    const list = await this.goodsService.categoryList(query);
    const pagination = await this.goodsService.categoryPage(query);
    return {
      data: {
        list,
        pagination,
      },
    };
  }
}
