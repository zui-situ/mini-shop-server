import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createOrderDto, listDto, payOrderDto } from './order.dto';
import { OrderService } from './order.service';
import { CurrentUser } from 'libs/common/decorator/current.user.decorator';
import { UserDocument } from '@app/db/models/user.model';
import { ObjectId } from 'mongoose';
@Controller('order')
@ApiTags('订单')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('createOrder')
  @ApiOperation({ summary: '创建订单' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async createOrder(
    @Body() body: createOrderDto,
    @CurrentUser() user: UserDocument,
  ): Promise<any> {
    const order = await this.orderService.createOrder(body, user._id);
    return {
      message: '修改成功',
      data: order,
    };
  }

  @Get('list')
  @ApiOperation({ summary: '订单列表' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async orderList(@Query() query: listDto): Promise<any> {
    const list = await this.orderService.list(query);
    const pagination = await this.orderService.page(query);
    return {
      data: {
        list,
        pagination,
      },
    };
  }

  @Post('payOrder/:orderId')
  @ApiOperation({ summary: '支付接口' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async payOrder(@Param('orderId') id: ObjectId): Promise<any> {
    await this.orderService.upDateStatus(id, 2);
    return { message: '支付成功' };
  }

  @Post('deliverGoods/:orderId')
  @ApiOperation({ summary: '确认发货' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async deliverGoods(@Param('orderId') id: ObjectId): Promise<any> {
    await this.orderService.upDateStatus(id, 3);
    return { message: '确认发货成功' };
  }

  @Post('takeDelivery/:orderId')
  @ApiOperation({ summary: '确认收货' })
  @ApiBearerAuth() //标签这个接口需要传递token
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async takeDelivery(@Param('orderId') id: ObjectId): Promise<any> {
    await this.orderService.upDateStatus(id, 5);
    return { message: '确认收货成功' };
  }
}
