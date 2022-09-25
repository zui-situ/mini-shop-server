import { ApiProperty } from '@nestjs/swagger';
import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { IsNotEmpty } from 'class-validator';
import { Goods } from './goods.model';
export type SkuDocument = DocumentType<Sku>;

//为模型添加创建时间createdAt和更新时间updatedAt
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Sku {
  @ApiProperty({
    description: '商品ID',
  })
  @IsNotEmpty({ message: '商品ID不能为空' })
  @prop({ type: String, ref: 'Goods' })
  public goods: Ref<Goods>;

  @ApiProperty({
    description: '规格名称',
  })
  @IsNotEmpty({ message: '规格名称不能为空' })
  @prop({ type: String })
  public skuName: string;

  @ApiProperty({
    description: '规格内容',
  })
  @IsNotEmpty({ message: '规格内容不能为空' })
  @prop({ type: String })
  public skuContent: string;

  @ApiProperty({
    description: '规格价格',
  })
  @IsNotEmpty({ message: '规格价格不能为空' })
  @prop()
  public skuPrice: number;

  @ApiProperty({
    description: '规格库存',
  })
  @IsNotEmpty({ message: '规格库存不能为空' })
  @prop()
  public skuStock: number;

  // @ApiProperty({
  //   description: '[删除标记]: 0-未删除 | 1-删除',
  // })
  @prop()
  public deleteFlag: number;
}
