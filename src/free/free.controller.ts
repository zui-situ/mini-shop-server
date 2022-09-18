import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { GoodsService } from 'src/goods/goods.service';
import { listDto as categoryListDto } from '../category/category.dto';
import { CategoryService } from 'src/category/category.service';
import { goodsListDto } from 'src/goods/goods.dto';

@Controller('free')
@ApiTags('免权')
export class FreeController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly goodsService: GoodsService,
  ) {}

  /**
   * 查询分类列表
   *
   * @param id ID
   */
  @Get('category/list')
  @ApiOperation({ summary: '商品分了列表' })
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async categoryList(@Query() query: categoryListDto): Promise<any> {
    const list = await this.categoryService.categoryList(query);
    const pagination = await this.categoryService.categoryPage(query);
    return {
      data: {
        list,
        pagination,
      },
    };
  }

  /**
   * 查询分类列表
   *
   * @param id ID
   */
  @Get('goods/list')
  @ApiOperation({ summary: '商品列表' })
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async goodsList(@Query() query: goodsListDto): Promise<any> {
    const list = await this.goodsService.goodsList(query);
    const pagination = await this.goodsService.goodsPage(query);
    return {
      data: {
        list,
        pagination,
      },
    };
  }

  /**
   * 查询分类列表
   *
   * @param id ID
   */
  @Get('goods/:id')
  @ApiOperation({ summary: '商品详情' })
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async findGoods(@Param('id') id: ObjectId): Promise<any> {
    const data = await this.goodsService.findGoods(id);
    return {
      data,
    };
  }
}
