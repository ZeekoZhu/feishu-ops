import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { defaults, omit } from 'lodash';
import * as path from 'path';
import { catchError, firstValueFrom, of } from 'rxjs';
import { FeishuApiService } from '../feishu-api/feishu-api.service';

@Injectable()
export class FeishuApiMiddleware implements NestMiddleware {
  constructor(private feishuApi: FeishuApiService, private http: HttpService) {
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = await this.feishuApi.getTenantToken();
    const url = new URL(path.join('/open-apis', req.path), 'https://open.feishu.cn');
    const headers = defaults({ Authorization: `Bearer ${accessToken}` }, omit(req.headers, 'host'));
    const method = req.method;
    const resp$ = this.http.request({
      method,
      url: url.toString(),
      headers: (headers as any),
      params: req.query,
      data: req.body,
    }).pipe(
      catchError((error: AxiosError) => {
        return of(error.response);
      }),
    );
    const resp = await firstValueFrom(resp$);
    res.status(resp.status).send(resp.data);
  }
}
