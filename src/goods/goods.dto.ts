import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { createSkuDto, editSkuDto } from 'src/sku/sku.dto';

export class goodsDto {
  @ApiProperty({ description: '商品名', example: '蔬菜' })
  @IsNotEmpty({ message: '商品名不能为空' })
  readonly name: string;
}

export class editStatusDto {
  @ApiProperty({
    description: '商品上下架状态, 0是下架，1是上架',
    enum: [0, 1],
    example: 0,
    type: Number,
  })
  @IsNotEmpty({ message: '商品上下架状态不能为空' })
  readonly status: number;
}

export class goodsListDto {
  @ApiProperty({
    description: '商品分类ID',
    example: '',
    type: String,
    required: false,
  })
  readonly categoryId: string;

  @ApiProperty({
    description: '商品上下架状态, 0是下架，1是上架',
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

const skuExample = [
  {
    skuName: '规格名',
    skuContent: '规格内容',
    skuPrice: 100,
    skuStock: 100,
  },
];

const editSkuExample = [
  {
    skuName: '规格名',
    skuContent: '规格内容',
    skuPrice: 100,
    skuStock: 100,
    skuId: '',
  },
];
export class createGoodsDto {
  @ApiProperty({ description: '商品名称', example: '蔬菜' })
  @IsNotEmpty({ message: '商品名称不能为空' })
  readonly name: string;

  @ApiProperty({ description: '商品主图', example: '' })
  @IsNotEmpty({ message: '商品主图不能为空' })
  readonly img: string;

  @ApiProperty({
    description: '商品价格',
  })
  readonly price: number;

  @ApiProperty({
    description: '商品库存',
  })
  readonly stock: number;

  @ApiProperty({
    description: '商品分类',
  })
  @IsNotEmpty({ message: '商品分类不能为空' })
  readonly category: string;

  @ApiProperty({
    description: '商品详情',
    required: false,
  })
  readonly details?: string;

  @ApiProperty({
    description: '套餐内容',
    required: false,
  })
  readonly mealContont?: string;

  @ApiProperty({
    description: '购买须知',
    required: false,
  })
  readonly purchaseNotes?: string;
}

export class createSkuArrayDto {
  @ApiProperty({ description: '商品规格', example: skuExample })
  @IsArray()
  @IsNotEmpty({ message: '商品规格不能为空' })
  readonly sku: Array<createSkuDto>;
}

export class editSkuArrayDto {
  @ApiProperty({ description: '商品规格', example: editSkuExample })
  @IsArray()
  @IsNotEmpty({ message: '商品规格不能为空' })
  readonly sku: Array<editSkuDto>;
}

export class createGoodsAndSkuDto extends IntersectionType(
  createSkuArrayDto,
  createGoodsDto,
) {}

export class editGoodsAndSkuDto extends IntersectionType(
  editSkuArrayDto,
  createGoodsDto,
) {}
