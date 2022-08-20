import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';

interface IAppAuthInfo {
  app_id: string;
  app_secret: string;
}

export interface IAccessTokenResp {
  code: number;
  msg: string;
  tenant_access_token: string;
  expire: number;
}

@Injectable()
export class FeishuApiService {
  constructor(private configSvc: ConfigService, private http: HttpService) {
  }

  getAppAuthInfo(): IAppAuthInfo {
    const appId = this.configSvc.get<string>('FEISHU_APP_ID');
    const appSecret = this.configSvc.get<string>('FEISHU_APP_SECRET');
    return { app_id: appId, app_secret: appSecret };
  }

  async getTenantToken(): Promise<string> {
    const url = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal';
    const resp$ = this.http.post(url, this.getAppAuthInfo())
      .pipe(
        map(it => (it.data as IAccessTokenResp).tenant_access_token),
      );
    return firstValueFrom(resp$);
  }
}
