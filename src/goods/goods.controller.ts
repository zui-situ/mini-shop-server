import { Goods } from '@app/db/models/goods.model';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'libs/common/decorator/crud/crud.decorator';
import { ObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { editStatusDto, listDto } from './goods.dto';
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
    const list = await this.goodsService.goodsList(query);
    const pagination = await this.goodsService.goodsPage(query);
    return {
      data: {
        list,
        pagination,
      },
    };
  }

  @Post('editStatus/:id')
  @ApiOperation({ summary: '修改分类状态' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async editStatus(
    @Param('id') id: ObjectId,
    @Body() body: editStatusDto,
  ): Promise<any> {
    const { status } = body;
    await this.goodsService.upDateGoodsStatus(id, status);
    return { message: '修改成功' };
  }
}
