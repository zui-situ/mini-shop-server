import { Goods } from '@app/db/models/goods.model';
import { Order } from '@app/db/models/order.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { RCode } from 'src/utils/rcode';
import { createordernum } from '../utils/utils';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: ReturnModelType<typeof Order>,
    @InjectModel(Goods)
    private goodsModel: ReturnModelType<typeof Goods>,
  ) {}

  /**
   * 创建订单
   *
   * @query body 订单信息
   * @query userId 用户id
   */
  async createOrder(body: any, userId: ObjectId): Promise<any> {
    const { amount, number, receiver, addressCode, address, phone, goods } =
      body;
    const goodsInfo = await this.goodsModel.findById(goods);
    //判断是否有该商品
    if (goodsInfo) {
      const { stock } = goodsInfo;
      //库存足够且
      if (stock >= number) {
        const orderNo = createordernum();
        const goodsObj = {
          amount,
          number,
          receiver,
          addressCode,
          address,
          phone,
          goods,
          deleteFlag: 0,
          status: 0,
          user: userId,
          orderNo,
        };
        const order = await this.orderModel.create(goodsObj);
        const surplusStock = Math.floor(stock - number);
        await this.upDateStock(goods, surplusStock);
        return order;
      } else {
        return {
          code: RCode.FAIL,
          message: '商品库存不足',
        };
      }
    } else {
      return {
        code: RCode.FAIL,
        message: '商品存在',
      };
    }
  }
  /**
   * 更新库存
   *
   * @query id ID
   * @query number 状态
   */
  async upDateStock(id: ObjectId, number: number): Promise<void> {
    await this.goodsModel.findByIdAndUpdate(id, { stock: number });
  }
  /**
   * 更新状态
   *
   * @param id ID
   * @param status 状态
   */
  async upDateStatus(id: ObjectId, status: number): Promise<void> {
    await this.orderModel.findByIdAndUpdate(id, { status });
  }
  /**
   * 查询列表
   *
   * @query query 内容
   */
  async list(query: any): Promise<any> {
    const { pageNo, pageSize } = query;
    const skip = (pageNo - 1) * pageSize;
    const findObj = await this.ListFindObj(query);
    const selectObj = {
      sort: '-createdAt',
    };
    if (pageNo && pageSize) {
      Object.assign(selectObj, {
        limit: pageSize * 1,
        skip,
      });
    }
    const data = await this.orderModel
      .find(findObj, '-deleteFlag', selectObj)
      .populate('goods')
      .populate('user')
      .lean();
    return data;
  }
  /**
   * 查询分页
   *
   * @query query 内容
   */
  async page(query: any): Promise<any> {
    const { pageNo, pageSize } = query;
    const findObj = await this.ListFindObj(query);
    const count = await this.orderModel.countDocuments(findObj);
    return {
      count,
      currentPage: Number(pageNo),
      limit: Number(pageSize),
      total: Math.ceil(count / pageSize),
    };
  }
  /**
   * 查询obj
   *
   * @query query 内容
   */
  ListFindObj(query) {
    const { status, orderNo } = query;
    const regOrderNo = new RegExp(orderNo, 'i'); //不区分大小写
    const findObj: any = {
      $or: [{ orderNo: { $regex: regOrderNo } }],
      deleteFlag: 0,
    };
    console.log(status);
    if (status !== '' && status !== undefined) {
      findObj.status = Number(status);
    }
    return findObj;
  }
}
