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
import { listDto as categoryListDto } from '../category/category.dto';
import { CategoryService } from '../category/category.service';

@Controller('free')
@ApiTags('免权')
export class FreeController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 查询分类列表
   *
   * @param id ID
   */
  @Get('category/list')
  @ApiOperation({ summary: '标签列表' })
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
}
