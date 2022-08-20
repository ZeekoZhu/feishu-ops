import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FeishuApiService } from './feishu-api.service';

describe('FeishuApiService', () => {
  let service: FeishuApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: ['.env.local'],
        }),
      ],
      providers: [FeishuApiService],
    }).compile();

    service = module.get<FeishuApiService>(FeishuApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTenantToken', () => {
    test('get tenant token', async () => {
      const token = await service.getTenantToken();
      expect(token).toBeDefined();
    });
    test('cache tenant token', async () => {
      const token = await service.getTenantToken();
      const token2 = await service.getTenantToken();
      expect(token).toBe(token2);
    });
  });

});
