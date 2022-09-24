import { Goods } from '@app/db/models/goods.model';
import { Sku } from '@app/db/models/sku.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class GoodsService {
  constructor(
    @InjectModel(Goods)
    private goodsModel: ReturnModelType<typeof Goods>,
    @InjectModel(Sku)
    private skuModel: ReturnModelType<typeof Sku>,
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
   * 查询商品总数
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
   * 查询商品obj
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

  /**
   * 新建商品
   *
   * @query query 内容
   */
  async createdGoods(query) {
    const createData = {
      ...query,
      ...{
        deleteFlag: 0,
        status: 0,
      },
    };
    const gooodsInfo = await this.goodsModel.create(createData);
    const { sku } = query;
    const { _id: goodsId } = gooodsInfo;
    for (let i = 0; i < sku.length; i++) {
      const item = sku[i];
      const createSkuItem = { ...item, ...{ goods: goodsId, deleteFlag: 0 } };
      await this.skuModel.create(createSkuItem);
    }
  }

  /**
   * 修改商品
   *
   * @query query 内容
   */
  async updateGoods(id, query) {
    const editData = {
      ...query,
    };
    await this.goodsModel.findByIdAndUpdate(id, editData);
    const { sku } = query;
    const skuList = await this.skuModel.find({ goods: id });
    const skuIdList = skuList.map((item) => {
      return item._id.toString();
    });
    const updateSkuId = [];
    for (let i = 0; i < sku.length; i++) {
      const item = sku[i];
      const { skuId } = item;
      if (skuId && skuIdList.includes(skuId)) {
        updateSkuId.push(skuId);
        await this.skuModel.findByIdAndUpdate(skuId, item);
      } else {
        delete item.skuId;
        item.goods = id;
        item.deleteFlag = 0;
        await this.skuModel.create(item);
      }
    }
    for (let i = 0; i < skuIdList.length; i++) {
      const item = skuIdList[i];
      if (!updateSkuId.includes(item)) {
        await this.skuModel.findByIdAndUpdate(item, { deleteFlag: 1 });
      }
    }
  }

  /**
   * 删除商品
   *
   * @query id 商品ID
   */
  async removeGoods(id) {
    await this.goodsModel.findByIdAndUpdate(id, { deleteFlag: 1 });
    const skuList = await this.skuModel.find({ goods: id, deleteFlag: 0 });
    for (let i = 0; i < skuList.length; i++) {
      const item = skuList[i];
      await this.skuModel.findByIdAndUpdate(item._id, { deleteFlag: 1 });
    }
  }

  /**
   * 查询商品
   *
   * @query id 商品ID
   */
  async findGoods(id) {
    const goodsInfo: any = await this.goodsModel
      .findById(id)
      .populate('category');
    const skuList = await this.skuModel.find({ goods: id, deleteFlag: 0 });
    const doc = goodsInfo._doc;
    doc['sku'] = skuList;
    return doc;
  }
}
