import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @ApiProperty({ description: '密码', example: 'admin123' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @ApiPropertyOptional({
    description:
      '[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）',
  })
  readonly role?: number | string;
}

export class updateUserInfoDTO {
  @ApiProperty({ description: '用户头像', example: 'admin', required: false })
  readonly avatarUrl: string;

  @ApiProperty({
    description: '手机号',
    example: '13800000000',
    required: false,
  })
  readonly phone: string;

  @ApiProperty({ description: '个性签名', example: '开心', required: false })
  readonly utograph: string;
}

export class listDto {
  @ApiProperty({
    description: '用户名',
    type: String,
    required: false,
  })
  readonly username: string;

  @ApiProperty({
    description: '手机号',
    type: String,
    required: false,
  })
  readonly phone: string;

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
