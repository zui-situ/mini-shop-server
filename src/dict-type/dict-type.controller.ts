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
import { Crud } from 'libs/common/decorator/crud/crud.decorator';
import { DictType } from '@app/db/models/dictType.model';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { DictTypeService } from './dict-type.service';
import { editStatusDto, listDto } from './dto/dict-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
//添加增删改查方法
@Crud({
  model: DictType,
  findKey: 'name',
  createDefaultValue: {
    status: 1,
    deleteFlag: 0,
  },
})
@Controller('dictType')
@ApiTags('数据字典类型')
export class DictTypeController {
  constructor(
    private readonly dictTypeService: DictTypeService,
    @InjectModel(DictType)
    private model: ReturnModelType<typeof DictType>,
  ) {}

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
    await this.dictTypeService.upDateStatus(id, status);
    return { message: '修改成功' };
  }

  @Get('list')
  @ApiOperation({ summary: '分类列表' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async labelList(@Query() query: listDto): Promise<any> {
    const list = await this.dictTypeService.dictTypeList(query);
    const pagination = await this.dictTypeService.dictTypePage(query);
    return {
      data: {
        list,
        pagination,
      },
    };
  }
}
