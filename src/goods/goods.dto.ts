import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class goodsDto {
  @ApiProperty({ description: '商品名', example: '蔬菜' })
  @IsNotEmpty({ message: '商品名不能为空' })
  readonly name: string;
}

export class editStatusDto {
  @ApiProperty({
    description: '[禁用标记]: 0-关闭 | 1-开启',
    enum: [0, 1],
    example: 0,
    type: Number,
  })
  @IsNotEmpty({ message: '商品上下架状态不能为空' })
  readonly status: number;
}

export class listDto {
  @ApiProperty({
    description: '[禁用标记]: 0-关闭 | 1-开启',
    example: 0,
    type: Number,
    required: false,
  })
  readonly status: number;

  @ApiProperty({
    description: '商品名称',
    type: String,
    required: false,
  })
  readonly name: string;

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
