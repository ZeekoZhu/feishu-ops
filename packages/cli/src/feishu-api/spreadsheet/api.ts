import axios from 'axios';
import { getSheetToken } from './utils';

const apiBaseUrl = process.env.AUTH_SERVER || `http://localhost:3333`;

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

const http = axios.create({
  baseURL: apiBaseUrl,
});

export const getSheetContent = async (docUrl: string): Promise<string[][]> => {
  const parseResult = getSheetToken(docUrl);
  if (parseResult === null) {
    throw new Error(`Invalid spreadsheet url: ${docUrl}`);
  }
  const result = await http.get(`/open-apis/sheets/v2/spreadsheets/${parseResult.sheetToken}/values/${parseResult.sheetId}`);
  return (result.data as ISingleRangeResp).data.valueRange.values;
};
