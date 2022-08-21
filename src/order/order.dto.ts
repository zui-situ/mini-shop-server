import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createOrderDto {
  @ApiProperty({
    description: '商品ID',
    type: String,
  })
  @IsNotEmpty({ message: '商品ID不能为空' })
  readonly goods: string;

  @ApiProperty({
    description: '订单金额',
    example: 0,
    type: Number,
  })
  @IsNotEmpty({ message: '订单金额不能为空' })
  readonly amount: number;

  @ApiProperty({
    description: '商品数量',
    type: Number,
  })
  @IsNotEmpty({ message: '商品数量不能为空' })
  readonly number: number;

  @ApiProperty({
    description: '收货人姓名',
    type: String,
  })
  @IsNotEmpty({ message: '收货人姓名不能为空' })
  readonly receiver: string;

  @ApiProperty({
    description: '省市区编码',
    type: String,
  })
  @IsNotEmpty({ message: '省市区编码不能为空' })
  readonly addressCode: string;

  @ApiProperty({
    description: '收货详情地址',
    type: String,
  })
  @IsNotEmpty({ message: '收货详情地址不能为空' })
  readonly address: string;

  @ApiProperty({
    description: '收货人手机号',
    type: String,
  })
  @IsNotEmpty({ message: '收货人手机号不能为空' })
  readonly phone: string;
}

export class listDto {
  @ApiProperty({
    description:
      '订单状态, 0待支付，1已支付，2待发货，3已发货，4已收货，5待评价，6已评价，7已取消',
    minimum: 0,
    maximum: 7,
    example: 0,
    type: Number,
    required: false,
  })
  readonly status: number;

  @ApiProperty({
    description: '订单编号',
    type: String,
    required: false,
  })
  readonly orderNo: string;

  @ApiProperty({
    description: '当前页数',
    type: Number,
  })
  // @IsNotEmpty({ message: 'pageNo不能为空' })
  readonly pageNo: number;

  @ApiProperty({
    description: '单页数量',
    type: Number,
  })
  // @IsNotEmpty({ message: 'pageSize不能为空' })
  readonly pageSize: number;
}
