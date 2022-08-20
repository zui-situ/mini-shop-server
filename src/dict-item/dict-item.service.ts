import { DictItem } from '@app/db/models/dictItem.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ObjectId } from 'mongodb';
@Injectable()
export class DictItemService {
  constructor(
    @InjectModel(DictItem)
    private DictItemModel: ReturnModelType<typeof DictItem>,
  ) {}
  /**
   * 查询字典项列表
   *
   * @query query 内容
   */
  async dictTypeList(query: any): Promise<any> {
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
    const data = await this.DictItemModel.find(
      findObj,
      '-deleteFlag',
      selectObj,
    )
      .populate('dictType')
      .lean();
    return data;
  }
  /**
   * 查询字典项总数
   *
   * @query query 内容
   */
  async dictTypePage(query: any): Promise<any> {
    const { pageNo, pageSize } = query;
    const findObj = await this.ListFindObj(query);
    const count = await this.DictItemModel.countDocuments(findObj);
    return {
      count,
      currentPage: Number(pageNo),
      limit: Number(pageSize),
      total: Math.ceil(count / pageSize),
    };
  }
  /**
   * 查询字典项obj
   *
   * @query query 内容
   */
  ListFindObj(query) {
    const { dictType } = query;
    const findObj: any = {
      deleteFlag: 0,
    };
    if (dictType) findObj.dictType = new ObjectId(dictType);
    return findObj;
  }
}
