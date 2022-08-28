import { Goods } from '@app/db/models/goods.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class GoodsService {
  constructor(
    @InjectModel(Goods)
    private goodsModel: ReturnModelType<typeof Goods>,
  ) {}

  /**
   * 更新状态
   *
   * @param id ID
   * @param status 状态
   */
  async upDateGoodsStatus(id: ObjectId, status: number): Promise<void> {
    await this.goodsModel.findByIdAndUpdate(id, { status });
  }
  /**
   * 查询商品列表
   *
   * @query query 内容
   */
  async goodsList(query: any): Promise<any> {
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
    const data = await this.goodsModel
      .find(findObj, '-deleteFlag', selectObj)
      .populate('category')
      .lean();
    return data;
  }
  /**
   * 查询标签总数
   *
   * @query query 内容
   */
  async goodsPage(query: any): Promise<any> {
    const { pageNo, pageSize } = query;
    const findObj = await this.ListFindObj(query);
    const count = await this.goodsModel.countDocuments(findObj);
    return {
      count,
      currentPage: Number(pageNo),
      limit: Number(pageSize),
      total: Math.ceil(count / pageSize),
    };
  }
  /**
   * 查询标签查询obj
   *
   * @query query 内容
   */
  ListFindObj(query) {
    const { status, name, categoryId } = query;
    const reg = new RegExp(name, 'i'); //不区分大小写
    const findObj: any = {
      $or: [{ name: { $regex: reg } }],
      deleteFlag: 0,
    };
    if ((Number(status) === 1 || Number(status) === 0) && status !== '') {
      findObj.status = Number(status);
    }
    if (categoryId) {
      findObj.category = categoryId;
    }
    return findObj;
  }

  /**
   * 通过ID查询商品
   *
   * @query id 内容
   */
  async findById(id) {
    const goodsInfo = await this.goodsModel.findById(id);
    return goodsInfo;
  }
}
