import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeishuApiService } from './feishu-api/feishu-api.service';
import { FeishuApiMiddleware } from './middleware/feishu-api.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
    HttpModule],
  providers: [FeishuApiService],
  exports: [FeishuApiService],
})
export class OpenFeishuModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FeishuApiMiddleware).forRoutes('open-apis');
  }
}
