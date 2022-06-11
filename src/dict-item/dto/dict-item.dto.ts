import { ApiProperty } from '@nestjs/swagger';

export class listDto {
  @ApiProperty({
    description: '字典类型ID',
    type: String,
    required: false,
  })
  readonly dictType: string;

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
