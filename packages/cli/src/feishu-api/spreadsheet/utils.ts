import { chain } from 'lodash';

export const getSheetToken = (urlStr: string) => {
  const url = new URL(urlStr);
  const sheetId = url.searchParams.get('sheet');
  const sheetToken = chain(url.pathname).split('/').last().value();
  return { sheetToken, sheetId };
};

