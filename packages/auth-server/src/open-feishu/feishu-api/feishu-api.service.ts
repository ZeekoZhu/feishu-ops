import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { chain } from 'lodash';
import { firstValueFrom, map } from 'rxjs';
import { URL } from 'url';

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

export const getSheetToken = (urlStr: string) => {
  const url = new URL(urlStr);
  const sheetId = url.searchParams.get('sheet');
  const sheetToken = chain(url.pathname).split('/').last().value();
  return { sheetToken, sheetId };
};

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

  // async getSheetContent(docUrl: string): Promise<string[][]> {
  //   const { sheetToken, sheetId } = getSheetToken(docUrl);
  //   const accessToken = await this.getTenantToken();
  //   const url = `https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/${sheetToken}/values/${sheetId}`;
  //   return firstValueFrom(this.http.get(url, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     }
  //   })
  //     .pipe(
  //       map(it => (it.data as ISingleRangeResp).data.valueRange.values),
  //       catchError(err => {
  //         console.log(err);
  //         return []
  //       } )
  //     ));
  // }
}

interface ISingleRangeResp {
  code: number;
  data: {
    spreadsheetToken: string;
    valueRange: {
      majorDimension: string;
      values: string[][];
      range: string;
      revision: number
    };
    revision: number
  };
  msg: string;
}

