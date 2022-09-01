import { ApiProperty } from '@nestjs/swagger';
import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { IsNotEmpty } from 'class-validator';
import { Category } from './category.model';
export type CategoryDocument = DocumentType<Goods>;

//为模型添加创建时间createdAt和更新时间updatedAt
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Goods {
  @ApiProperty({ description: '商品名称', example: '蔬菜' })
  @IsNotEmpty({ message: '商品名称不能为空' })
  @prop()
  public name: string;

  @ApiProperty({ description: '商品主图', example: '' })
  @IsNotEmpty({ message: '商品主图不能为空' })
  @prop()
  public img: string;

  @ApiProperty({
    description: '商品价格',
  })
  @IsNotEmpty({ message: '商品价格不能为空' })
  @prop()
  public price: number;

  @ApiProperty({
    description: '商品库存',
  })
  @prop()
  public stock: number;

  @ApiProperty({
    description: '商品分类',
  })
  @IsNotEmpty({ message: '商品分类不能为空' })
  @prop({ type: String, ref: 'Category' })
  public category: Ref<Category>;

  @ApiProperty({
    description: '商品详情',
    required: false,
  })
  @prop()
  public details?: string;

  @ApiProperty({
    description: '套餐内容',
    required: false,
  })
  @prop()
  public mealContont?: string;

  @ApiProperty({
    description: '购买须知',
    required: false,
  })
  @prop()
  public purchaseNotes?: string;

  // @ApiProperty({
  //   description: '商品上下架状态, 0是下架，1是上架',
  // })
  @prop()
  public status: number;

  // @ApiProperty({
  //   description: '[删除标记]: 0-未删除 | 1-删除',
  // })
  @prop()
  public deleteFlag: number;
}
