import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

class skuIdDto {
  @ApiProperty({ description: '规格ID' })
  @IsNotEmpty({ message: '规格ID不能为空' })
  readonly skuId: string;
}

export class createSkuDto {
  @ApiProperty({ description: '规格名称' })
  @IsNotEmpty({ message: '规格名称不能为空' })
  readonly skuName: string;

  @ApiProperty({ description: '规格内容' })
  @IsNotEmpty({ message: '规格内容不能为空' })
  readonly skuContent: string;

  @ApiProperty({ description: '规格价格' })
  @IsNotEmpty({ message: '规格价格不能为空' })
  readonly skuPrice: number;

  @ApiProperty({ description: '规格库存' })
  @IsNotEmpty({ message: '规格库存不能为空' })
  readonly skuStock: number;
}

export class editSkuDto extends IntersectionType(createSkuDto, skuIdDto) {}
