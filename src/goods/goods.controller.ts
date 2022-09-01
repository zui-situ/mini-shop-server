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
import {
  createGoodsAndSkuDto,
  editStatusDto,
  goodsListDto,
  editGoodsAndSkuDto,
} from './goods.dto';
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
  @ApiOperation({ summary: '商品列表' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async labelList(@Query() query: goodsListDto): Promise<any> {
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
  @ApiOperation({ summary: '修改商品状态' })
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

  @Post('createGoods')
  @ApiOperation({ summary: '新增商品' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async createGoods(@Body() body: createGoodsAndSkuDto) {
    await this.goodsService.createdGoods(body);
    return { message: '新增成功' };
  }

  @Post('updateGoods/:id')
  @ApiOperation({ summary: '修改商品' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async updateGoods(
    @Param('id') id: ObjectId,
    @Body() body: editGoodsAndSkuDto,
  ) {
    await this.goodsService.updateGoods(id, body);
    return { message: '修改成功' };
  }

  @Post('removeGoods/:id')
  @ApiOperation({ summary: '删除商品' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async removeGoods(@Param('id') id: ObjectId) {
    await this.goodsService.removeGoods(id);
    return { message: '删除成功' };
  }

  @Get('findGoods/:id')
  @ApiOperation({ summary: '查询商品详情' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async findGoods(@Param('id') id: ObjectId) {
    const goodsInfo = await this.goodsService.findGoods(id);
    return { data: goodsInfo };
  }
}
