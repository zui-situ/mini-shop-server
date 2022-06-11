import { ApiProperty } from '@nestjs/swagger';
import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';

export type DictTypeDocument = DocumentType<DictType>;

//为模型添加创建时间createdAt和更新时间updatedAt
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class DictType {
  @ApiProperty({ description: '类型名称', example: '状态' })
  @prop()
  public name: string;

  @ApiProperty({ description: '类别字段', example: 'sys_admin_show' })
  @prop()
  public code: string;

  @ApiProperty({
    description: '[状态标记]: 0-关闭 | 1-开启',
  })
  @prop()
  public status: number;

  @ApiProperty({ description: '类别备注', example: '' })
  @prop()
  public remark?: string;

  @ApiProperty({
    description: '[删除标记]: 0-未删除 | 1-删除',
  })
  @prop()
  public deleteFlag: number;
}
