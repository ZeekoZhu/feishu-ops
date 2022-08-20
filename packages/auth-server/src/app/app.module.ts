import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  FeishuApiMiddleware
} from '../open-feishu/middleware/feishu-api.middleware';
import { OpenFeishuModule } from '../open-feishu/open-feishu.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OpenFeishuModule, ConfigModule.forRoot({
    envFilePath: ['.env', '.env.local'],
  }),
    HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FeishuApiMiddleware).forRoutes('open-apis');
  }
}
