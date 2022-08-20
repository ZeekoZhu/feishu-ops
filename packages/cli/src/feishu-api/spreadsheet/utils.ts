import _ from 'lodash';

export interface ISpreadsheetUrlParseResult {
  sheetToken: string;
  sheetId: string;
}

export const getSheetToken = (urlStr: string): ISpreadsheetUrlParseResult | null => {
  try {
    const url = new URL(urlStr);
    const sheetId = url.searchParams.get('sheet');
    const sheetToken = _.chain(url.pathname).split('/').last().value();
    return <ISpreadsheetUrlParseResult>{ sheetToken, sheetId };
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const spreadsheetToJson = (sheet: string[][]): any[] => {
  if (_.isEmpty(sheet)) {
    return [];
  }
  const headers = sheet[0];
  const rows = _.drop(sheet, 1);
  return rows.map(row => {
    const obj = {} as Record<string, any>;
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i];
    }
    return obj;
  });
};

