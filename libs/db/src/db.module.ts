import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Category } from './models/category.model';

const models = TypegooseModule.forFeature([User, Category]);

//标记为全局引用模块
@Global()
@Module({
  imports: [
    //ConfigModule加载完成后才允许加载，避免找不到配置项报错
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          // useUnifiedTopology:true,
          // useCreateIndex:true,
          // useFindAndModify:false
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
