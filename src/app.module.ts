import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from 'libs/common/src';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { FreeModule } from './free/free.module';
import { FileModule } from './file/file.module';
import { DictTypeModule } from './dict-type/dict-type.module';
import { DictItemModule } from './dict-item/dict-item.module';
import { GoodsModule } from './goods/goods.module';
import { OrderModule } from './order/order.module';
import { SkuModule } from './sku/sku.module';
const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    //异步加载OSS配置
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET,
            },
          }),
        };
      },
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    FreeModule,
    FileModule,
    DictTypeModule,
    DictItemModule,
    GoodsModule,
    OrderModule,
    SkuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
