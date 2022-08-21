import { ApiProperty } from '@nestjs/swagger';
import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { IsNotEmpty } from 'class-validator';
import { Category } from './category.model';
import { Goods } from './goods.model';
import { User } from './user.model';
export type CategoryDocument = DocumentType<Order>;

//为模型添加创建时间createdAt和更新时间updatedAt
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Order {
  @ApiProperty({ description: '订单编号' })
  @prop({
    required: false,
  })
  public orderNo: string;

  @ApiProperty({ description: '商品Id', type: String })
  @IsNotEmpty({ message: '商品ID不能为空' })
  @prop({ type: () => String, ref: 'Goods' })
  public goods: string;

  @ApiProperty({
    description: '订单金额',
  })
  @IsNotEmpty({ message: '订单金额不能为空' })
  @prop()
  public amount: number;

  @ApiProperty({
    description: '商品数量',
  })
  @IsNotEmpty({ message: '商品数量不能为空' })
  @prop()
  public number: number;

  @ApiProperty({
    description: '下单用户ID',
  })
  // @IsNotEmpty({ message: '下单用户信息不能为空' })
  @prop({ type: String, ref: 'User' })
  public user: string;

  @ApiProperty({
    description:
      '订单状态, 0待支付，1已支付，2待发货，3已发货，4已收货，5待评价，6已评价，7已取消',
    minimum: 0,
    maximum: 7,
  })
  @prop({ type: Number })
  public status: number;

  @ApiProperty({
    description: '收货人姓名',
  })
  @IsNotEmpty({ message: '收货人姓名不能为空' })
  @prop()
  public receiver: string;

  @ApiProperty({
    description: '省市区编码',
  })
  @IsNotEmpty({ message: '省市区编码不能为空' })
  @prop()
  public addressCode: string;

  @ApiProperty({
    description: '收货详情地址',
  })
  @IsNotEmpty({ message: '收货详情地址不能为空' })
  @prop()
  public address: string;

  @ApiProperty({
    description: '收货人手机号',
  })
  @IsNotEmpty({ message: '收货人手机号不能为空' })
  @prop()
  public phone: number;

  // @ApiProperty({
  //   description: '[删除标记]: 0-未删除 | 1-删除',
  // })
  @prop()
  public deleteFlag: number;
}
