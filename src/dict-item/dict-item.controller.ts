import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Crud } from 'libs/common/decorator/crud/crud.decorator';
import { DictItem } from '@app/db/models/dictItem.model';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { DictItemService } from './dict-item.service';
import { listDto } from './dto/dict-item.dto';
import { AuthGuard } from '@nestjs/passport';
//添加增删改查方法
@Crud({
  model: DictItem,
  findKey: 'name',
  createDefaultValue: {
    status: 1,
    deleteFlag: 0,
  },
})
@Controller('dictItem')
@ApiTags('数据字典项类型')
export class DictItemController {
  constructor(
    private readonly dictItemService: DictItemService,
    @InjectModel(DictItem)
    private model: ReturnModelType<typeof DictItem>,
  ) {}

  @Get('list')
  @ApiOperation({ summary: '字典项列表' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async labelList(@Query() query: listDto): Promise<any> {
    const list = await this.dictItemService.dictTypeList(query);
    const pagination = await this.dictItemService.dictTypePage(query);
    return {
      data: {
        list,
        pagination,
      },
    };
  }
}
