import { chain, drop, isEmpty } from 'lodash';

export interface ISpreadsheetUrlParseResult {
  sheetToken: string;
  sheetId: string;
}

export const getSheetToken = (urlStr: string): ISpreadsheetUrlParseResult | null => {
  try {
    const url = new URL(urlStr);
    const sheetId = url.searchParams.get('sheet');
    const sheetToken = chain(url.pathname).split('/').last().value();
    return <ISpreadsheetUrlParseResult>{ sheetToken, sheetId };
  } catch (e) {
    return null;
  }
};

export const spreadsheetToJson = (sheet: string[][]): any[] => {
  if (isEmpty(sheet)) {
    return [];
  }
  const headers = sheet[0];
  const rows = drop(sheet, 1);
  return rows.map(row => {
    const obj = {} as Record<string, any>;
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i];
    }
    return obj;
  });
};

