import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { OpenFeishuModule } from '../open-feishu.module';

describe('/open-apis/', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OpenFeishuModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET /sheets/v2/spreadsheets/shtcnUQqsyPEuWze47yNQs0sQ6d/values/699fea`, () => {
    return request(app.getHttpServer())
      .get('/open-apis/sheets/v2/spreadsheets/shtcnUQqsyPEuWze47yNQs0sQ6d/values/699fea')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
