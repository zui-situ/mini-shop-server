import { ApiProperty } from '@nestjs/swagger';
import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { DictType } from './dictType.model';
import { IsNotEmpty } from 'class-validator';

export type DictItemDocument = DocumentType<DictItem>;

//为模型添加创建时间createdAt和更新时间updatedAt
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class DictItem {
  @ApiProperty({ description: '字典类别', type: String, required: true })
  @IsNotEmpty({ message: '字典类别ID不能为空' })
  @prop({ ref: 'DictType' })
  public dictType: Ref<DictType>;

  @ApiProperty({
    description: '字典项标签',
    example: '显示/隐藏',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: '字典项标签不能为空' })
  @prop()
  public label: string;

  @ApiProperty({
    description: '字典项值',
    example: '0',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: '字典项值不能为空' })
  @prop()
  public value: string;

  @ApiProperty({ description: '字典项备注', example: '' })
  @prop()
  public remark?: string;

  // @ApiProperty({
  //   description: '[删除标记]: 0-未删除 | 1-删除',
  // })
  @prop()
  public deleteFlag: number;
}
