import { Order } from '@app/db/models/order.model';
import { Controller } from '@nestjs/common';
import { Crud } from 'libs/common/decorator/crud/crud.decorator';

@Crud({
  model: Order,
  findKey: 'name',
  createDefaultValue: {
    deleteFlag: 0,
  },
})
@Controller('order')
export class OrderController {}
