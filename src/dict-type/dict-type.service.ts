import { DictType } from '@app/db/models/dictType.model';
import { Injectable, HttpException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ObjectId } from 'mongoose';
@Injectable()
export class DictTypeService {
  constructor(
    @InjectModel(DictType)
    private DictTypeModel: ReturnModelType<typeof DictType>,
  ) {}

  /**
   * 更新状态
   *
   * @param id ID
   * @param status 状态
   */
  async upDateStatus(id: ObjectId, status: number): Promise<void> {
    await this.DictTypeModel.findByIdAndUpdate(id, { status });
  }
  /**
   * 查询分类列表
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
    const data = await this.DictTypeModel.find(
      findObj,
      '-deleteFlag',
      selectObj,
    ).lean();
    return data;
  }
  /**
   * 查询标签总数
   *
   * @query query 内容
   */
  async dictTypePage(query: any): Promise<any> {
    const { pageNo, pageSize } = query;
    const findObj = await this.ListFindObj(query);
    const count = await this.DictTypeModel.countDocuments(findObj);
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
    const { status, name } = query;
    const reg = new RegExp(name, 'i'); //不区分大小写
    const findObj: any = {
      $or: [{ name: { $regex: reg } }],
      deleteFlag: 0,
    };
    if ((Number(status) === 1 || Number(status) === 0) && status !== '') {
      findObj.status = Number(status);
    }
    return findObj;
  }
}
